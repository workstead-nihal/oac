import { useState, useEffect, type FormEvent } from 'react';
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Heart,
  Handshake,
  ShoppingCart,
  PenTool,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormType = 'member' | 'partner' | 'stall' | 'collab';

const formOptions: {
  type: FormType;
  title: string;
  desc: string;
  icon: typeof User;
  color: string;
}[] = [
  { type: 'member', title: 'Become a Member', desc: 'Join the family as an anime fan', icon: Heart, color: '#D91515' },
  { type: 'partner', title: 'Partner / Sponsor', desc: 'Collaborate with OAC as a brand', icon: Handshake, color: '#F3B334' },
  { type: 'stall', title: 'Setup a Stall', desc: 'Showcase at our events', icon: ShoppingCart, color: '#D91515' },
  { type: 'collab', title: 'Creator Collab', desc: 'Artists, cosplayers & content creators', icon: PenTool, color: '#F3B334' },
];

const stallTypes = ['Food & Beverage', 'Merchandise', 'Anime Goods', 'Art Prints', 'Gaming', 'Other'];

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [organization, setOrganization] = useState('');
  const [stallType, setStallType] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedForm) {
          setSelectedForm(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, selectedForm, onClose]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setMessage('');
    setPortfolioUrl('');
    setOrganization('');
    setStallType('');
    setError(null);
  };

  const handleClose = () => {
    setSelectedForm(null);
    setSuccess(false);
    resetForm();
    onClose();
  };

  const handleBack = () => {
    setSelectedForm(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedForm || submitting) return;
    if (!supabase) {
      setError('Submissions are currently unavailable. Please email us directly.');
      return;
    }
    setSubmitting(true);
    setError(null);

    const payload: Record<string, string> = {
      form_type: selectedForm,
      name,
      email,
    };
    if (phone) payload.phone = phone;
    if (city) payload.city = city;
    if (message) payload.message = message;
    if (selectedForm === 'collab' && portfolioUrl) payload.portfolio_url = portfolioUrl;
    if (selectedForm === 'partner' && organization) payload.organization = organization;
    if (selectedForm === 'stall') {
      if (organization) payload.organization = organization;
      if (stallType) payload.stall_type = stallType;
    }

    try {
      const { error: insertError } = await supabase
        .from('join_requests')
        .insert(payload);
      if (insertError) throw insertError;
      setSuccess(true);
      resetForm();
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentOption = formOptions.find((o) => o.type === selectedForm);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#D91515] via-[#F3B334] to-[#D91515]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-[#D91515] flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Success state */}
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-[#F3B334]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-[#F3B334]" />
              </div>
              <h3 className="font-display text-3xl text-white mb-3">You're In!</h3>
              <p className="text-gray-400 max-w-sm mx-auto">
                Thank you for reaching out to the Odisha Anime Community. We'll get back
                to you soon. Welcome to the family!
              </p>
              <button
                onClick={handleClose}
                className="mt-8 px-8 py-3 rounded-full bg-[#D91515] text-white font-semibold hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-all"
              >
                Done
              </button>
            </div>
          ) : !selectedForm ? (
            <>
              {/* Form selection */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3B334]/10 border border-[#F3B334]/20 mb-4">
                  <Heart size={14} className="text-[#F3B334]" />
                  <span className="text-xs text-[#F3B334] font-medium tracking-wide">Join OAC</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">
                  Join the Community
                </h2>
                <p className="text-sm text-gray-400">
                  Choose how you'd like to be part of OAC. We can't wait to meet you.
                </p>
              </div>

              <div className="space-y-3">
                {formOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.type}
                      onClick={() => setSelectedForm(option.type)}
                      className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 text-left"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${option.color}15` }}
                      >
                        <Icon size={24} style={{ color: option.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-base">{option.title}</p>
                        <p className="text-sm text-gray-500 truncate">{option.desc}</p>
                      </div>
                      <ArrowLeft size={18} className="text-gray-600 group-hover:text-[#F3B334] rotate-180 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Form view */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F3B334] transition-colors mb-5"
              >
                <ArrowLeft size={16} />
                Back to options
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentOption?.color}15` }}
                >
                  {(() => {
                    const Icon = currentOption?.icon ?? User;
                    return <Icon size={24} style={{ color: currentOption?.color }} />;
                  })()}
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-white leading-none">
                    {currentOption?.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{currentOption?.desc}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <Field icon={User} label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                  />
                </Field>

                {/* Email */}
                <Field icon={Mail} label="Email" required>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                  />
                </Field>

                {/* Phone */}
                <Field icon={Phone} label="Phone (optional)">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                  />
                </Field>

                {/* City */}
                <Field icon={MapPin} label="City (optional)">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bhubaneswar"
                    className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                  />
                </Field>

                {/* Organization (partner / stall) */}
                {(selectedForm === 'partner' || selectedForm === 'stall') && (
                  <Field icon={Building2} label={selectedForm === 'partner' ? 'Organization / Brand' : 'Stall Name'} required>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={selectedForm === 'partner' ? 'Your company or brand' : 'Your stall name'}
                      className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                    />
                  </Field>
                )}

                {/* Stall type */}
                {selectedForm === 'stall' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                      Stall Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {stallTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setStallType(type)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            stallType === type
                              ? 'bg-[#D91515] text-white'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio URL (collab) */}
                {selectedForm === 'collab' && (
                  <Field icon={LinkIcon} label="Portfolio / Social Link (optional)">
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://instagram.com/yourart"
                      className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                    />
                  </Field>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder={
                      selectedForm === 'member'
                        ? 'Tell us about yourself — your favorite anime, what you love...'
                        : selectedForm === 'partner'
                        ? 'Tell us about your brand and how you\'d like to collaborate...'
                        : selectedForm === 'stall'
                        ? 'What would you like to showcase at our events?'
                        : 'Tell us about your work and what kind of collaboration you\'re looking for...'
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-[#F3B334]/50 text-sm resize-none transition-colors"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#D91515]/10 border border-[#D91515]/30 text-sm text-[#D91515]">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-[#D91515] text-white font-semibold text-base hover:bg-[#F3B334] hover:text-[#0C0C0C] transition-all duration-300 glow-red disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  required,
  children,
}: {
  icon: typeof User;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-[#D91515]">*</span>}
      </label>
      <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#F3B334]/50 transition-colors">
        <Icon size={18} className="text-gray-600 flex-shrink-0" />
        {children}
      </div>
    </div>
  );
}
