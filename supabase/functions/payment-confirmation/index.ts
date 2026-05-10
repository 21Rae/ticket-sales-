import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { record } = await req.json()

  // 1. Get user details for the email
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data: user } = await supabase.auth.admin.getUserById(record.user_id)

  if (!user || !user.user?.email) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 })
  }

  // 2. Send email via Resend (or another provider)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Tickets <onboarding@resend.dev>',
      to: [user.user.email],
      subject: 'Payment Proof Received - Pending Verification',
      html: `
        <h1>Payment Proof Received!</h1>
        <p>Hello,</p>
        <p>We have received your proof of payment for booking <strong>#${record.booking_id}</strong>.</p>
        <p>Our team is currently verifying your transaction. This usually takes 5-15 minutes.</p>
        <p>Once verified, you will receive another email with your tickets, and they will be available in your dashboard.</p>
        <p>Thank you for your patience!</p>
      `,
    }),
  })

  const resData = await res.json()

  return new Response(JSON.stringify(resData), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
