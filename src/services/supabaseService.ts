import { getSupabase } from '../lib/supabase';
import { Event, Team, Stadium, City } from '../types';

export const supabaseService = {
  async getEvents() {
    const supabase = getSupabase();
    if (!supabase) {
      console.warn('Supabase not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return null;
    }

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Supabase getEvents Error:', error);
      throw error;
    }

    // Map to camelCase if needed to match interface
    const events = (data || []).map(item => ({
      ...item,
      startingPrice: item.starting_price
    }));

    console.log('Processed Events:', events);
    return events as Event[];
  },

  async getEventById(id: string) {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Supabase getEventById Error:', error);
      throw error;
    }

    if (!data) return null;

    return {
      ...data,
      startingPrice: data.starting_price
    } as Event;
  },

  async getTeams() {
    const supabase = getSupabase();
    if (!supabase) {
      console.warn('Supabase not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return null;
    }

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Supabase getTeams Error:', error);
      throw error;
    }

    const teams = (data || []).map(item => ({
      ...item,
      flagCode: item.flag_code
    }));

    return teams as Team[];
  },

  async getStadiums() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('stadiums')
      .select('*');
    
    if (error) throw error;
    return data as Stadium[];
  },

  async getCities() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('host_cities')
      .select('*');
    
    if (error) throw error;
    return data as City[];
  },

  async getTicketCategories() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('ticket_categories')
      .select('*')
      .order('base_price', { ascending: false });
    
    if (error) throw error;
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      basePrice: item.base_price
    }));
  },

  async uploadPaymentProof(bookingId: string, userId: string, file: File) {
    const supabase = getSupabase();
    if (!supabase) {
      throw new Error('Supabase client not initialized. Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }

    // 1. Upload to Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${bookingId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      throw new Error(`Storage Error: ${uploadError.message}`);
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(filePath);

    // 3. Save to Database
    const { data, error: dbError } = await supabase
      .from('payment_proofs')
      .insert([
        {
          booking_id: bookingId,
          user_id: userId,
          image_url: publicUrl,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      throw new Error(`Database Error: ${dbError.message}`);
    }
    return data;
  }
};
