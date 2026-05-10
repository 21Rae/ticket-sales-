import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Upload, CheckCircle, AlertCircle, FileText, 
  X, ArrowRight, ShieldCheck, Mail, Clock
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { supabaseService } from '../services/supabaseService';

export const PaymentVerificationView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { bookingId, amount } = location.state || { bookingId: 'BK-UNKNOWN', amount: 0 };
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setError('Please upload an image file (PNG, JPG, JPEG)');
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    setIsUploading(true);
    setError(null);
    
    try {
      await supabaseService.uploadPaymentProof(bookingId, user.id, file);
      setShowSuccess(true);
    } catch (err: any) {
      console.error('Error uploading proof:', err);
      setError(err.message || 'Connection error: Failed to upload proof. Please check your configuration.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDone = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm"
        >
          <header className="mb-12 text-center">
            <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4 italic">Verification Required</p>
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
              Finalize Your Payment
            </h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-md mx-auto">
              To complete your booking <span className="text-white">#{bookingId}</span>, please upload a screenshot or receipt of your transaction.
            </p>
          </header>

          <div className="space-y-8">
            {/* Amount Summary */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm flex justify-between items-center">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total to Verify</span>
              <span className="text-2xl font-black text-white italic tracking-tighter">${amount.toFixed(2)}</span>
            </div>

            {/* Upload Area */}
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square md:aspect-video border-2 border-dashed border-white/10 bg-white/5 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.08] hover:border-accent/40 transition-all group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="text-accent" size={32} />
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Upload Proof of Payment</p>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">PNG, JPG or JPEG up to 10MB</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="relative aspect-square md:aspect-video bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
                <img src={preview} alt="Receipt Preview" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center gap-3">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-8">
              <button 
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Uploading Proof...</span>
                  </>
                ) : (
                  <>
                    <span>Send Proof for Verification</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-sm">
              <ShieldCheck className="text-accent" size={20} />
              <p className="text-[8px] font-bold text-white/40 uppercase leading-relaxed tracking-wider">
                Secure 256-bit SSL encrypted verification process.
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-sm">
              <Clock className="text-accent" size={20} />
              <p className="text-[8px] font-bold text-white/40 uppercase leading-relaxed tracking-wider">
                Typical verification time is between 5-15 minutes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full bg-[#111] border border-white/10 p-12 text-center rounded-sm"
            >
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-accent" size={48} />
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                Payment Pending Verification
              </h2>
              <div className="space-y-4 mb-10">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                  Your proof of payment has been successfully received by our team.
                </p>
                <div className="flex items-center justify-center gap-2 py-4 border-y border-white/5">
                  <Mail className="text-accent" size={14} />
                  <p className="text-[10px] font-black text-white uppercase tracking-widest italic">
                    Tickets will be sent to your email
                  </p>
                </div>
                <p className="text-[8px] font-medium text-white/20 uppercase tracking-[0.2em]">
                  Once confirmed, your tickets will also appear in your member dashboard.
                </p>
              </div>
              <button 
                onClick={handleDone}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-accent transition-all duration-300"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
