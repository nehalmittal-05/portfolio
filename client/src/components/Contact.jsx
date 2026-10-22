import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  User,
  MessageSquare,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { sendContactMessage } from '../services/api';

export const Contact = ({ profile }) => {
  const { isDark } = useTheme();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for bot detection
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(null);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent accidental duplicate submissions while processing
    if (loading) return;

    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      const result = await sendContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        website: formData.website, // Invisible honeypot
      });

      if (result.success) {
        setSubmittedResponse(result);
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setServerError(result.message || 'Failed to submit message.');
        if (result.errors && typeof result.errors === 'object') {
          setErrors((prev) => ({ ...prev, ...result.errors }));
        }
      }
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 transition-colors duration-300 relative ${
        isDark ? 'bg-[#111411] text-[#f4f5f2]' : 'bg-[#f8f9f6] text-[#1c221c]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/25">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contact{' '}
            <span className="text-[#a5c9af]">
              Me
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isDark ? 'text-[#a3aba1]' : 'text-[#525f50]'
            }`}
          >
            Have a placement opportunity, internship inquiry, or project discussion? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Column: Direct Info Card (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-2 p-8 rounded-3xl border flex flex-col justify-between backdrop-blur-md ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] shadow-xl'
                : 'bg-white border-[#e2e6df] shadow-md'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#a5c9af]">
                Direct Channels
              </span>
              <h3 className="text-2xl font-bold tracking-tight mt-1 mb-4">
                Let's discuss opportunities
              </h3>
              <p
                className={`text-sm leading-relaxed mb-8 ${
                  isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                }`}
              >
                I am actively seeking entry-level software engineer roles and MERN stack developer internships.
                My inbox is always open.
              </p>

              {/* Contact List */}
              <div className="space-y-4">
                <a
                  href={`mailto:${profile?.email || 'nehalmittal5251218@gmail.com'}`}
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-[#111411]/80 border-[#262f26] hover:border-[#a5c9af]/40 text-[#f4f5f2]'
                      : 'bg-[#f4f5f2] border-[#e2e6df] hover:border-[#a5c9af] text-[#1c221c]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#a5c9af]/10 text-[#a5c9af] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#8a9687] uppercase">Email</p>
                    <p className="text-xs sm:text-sm font-bold truncate">
                      {profile?.email || 'nehalmittal5251218@gmail.com'}
                    </p>
                  </div>
                </a>

                <div
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#111411]/80 border-[#262f26] text-[#f4f5f2]'
                      : 'bg-[#f4f5f2] border-[#e2e6df] text-[#1c221c]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#a5c9af]/10 text-[#a5c9af] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#8a9687] uppercase">Phone</p>
                    <p className="text-xs sm:text-sm font-bold">
                      {profile?.phone || '+91 9829939993'}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#111411]/80 border-[#262f26] text-[#f4f5f2]'
                      : 'bg-[#f4f5f2] border-[#e2e6df] text-[#1c221c]'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#a5c9af]/10 text-[#a5c9af] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#8a9687] uppercase">Location</p>
                    <p className="text-xs sm:text-sm font-bold">
                      {profile?.location || 'Jaipur, Rajasthan, India'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links (Only renders valid configured profiles) */}
            <div className={`mt-8 pt-6 border-t ${isDark ? 'border-[#262f26]' : 'border-[#eef2ec]'}`}>
              <p className="text-xs font-semibold text-[#8a9687] mb-3 uppercase tracking-wider">
                Connect on Professional Profiles
              </p>
              <div className="flex items-center gap-3">
                {profile?.github && profile.github.trim() !== '' && profile.github !== '#' && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all btn-tactile ${
                      isDark
                        ? 'bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]'
                        : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                    }`}
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}

                {profile?.linkedin && profile.linkedin.trim() !== '' && profile.linkedin !== '#' && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all btn-tactile ${
                      isDark
                        ? 'bg-[#1f261f] hover:bg-[#283228] text-[#c6ccc3] hover:text-[#f4f5f2] border border-[#2b352b]'
                        : 'bg-[#eef2ec] hover:bg-[#e2e8df] text-[#2c362a] border border-[#d8ded4]'
                    }`}
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-3 p-8 rounded-3xl border backdrop-blur-md relative ${
              isDark
                ? 'bg-[#161a16]/90 border-[#262f26] shadow-xl'
                : 'bg-white border-[#e2e6df] shadow-md'
            }`}
          >
            {/* Success Feedback state */}
            <AnimatePresence>
              {submittedResponse ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 px-4 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#a5c9af]/10 text-[#a5c9af] border border-[#a5c9af]/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Message Sent Successfully!</h3>
                  <p
                    className={`max-w-md text-sm ${
                      isDark ? 'text-[#c6ccc3]' : 'text-[#3e483b]'
                    }`}
                  >
                    {submittedResponse.message}
                  </p>
                  <p className="text-xs text-[#8a9687]">
                    Submission reference ID: <span className="font-mono text-[#a5c9af]">{submittedResponse.data?.id}</span>
                  </p>
                  {submittedResponse.notice && (
                    <p className="text-[11px] text-amber-400/90 max-w-sm bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                      {submittedResponse.notice}
                    </p>
                  )}
                  <button
                    onClick={() => setSubmittedResponse(null)}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#111411] bg-[#a5c9af] hover:bg-[#b8d6c0] transition-colors cursor-pointer btn-tactile font-bold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Invisible Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold tracking-tight">Send a Direct Message</h3>
                    <span className="text-[11px] text-[#a5c9af] font-medium">Real Express & Mongo API</span>
                  </div>

                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="contact-name" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}`}>
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#768273] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          disabled={loading}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#a5c9af] focus:border-[#a5c9af] ${
                            errors.name
                              ? 'border-rose-500 bg-rose-500/5'
                              : isDark
                              ? 'bg-[#111411] border border-[#262f26] text-[#f4f5f2] placeholder-[#768273]'
                              : 'bg-white border border-[#d8ded4] text-[#1c221c] placeholder-[#8a9687]'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p id="name-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="contact-email" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}`}>
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#768273] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. sarah@company.com"
                          disabled={loading}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#a5c9af] focus:border-[#a5c9af] ${
                            errors.email
                              ? 'border-rose-500 bg-rose-500/5'
                              : isDark
                              ? 'bg-[#111411] border border-[#262f26] text-[#f4f5f2] placeholder-[#768273]'
                              : 'bg-white border border-[#d8ded4] text-[#1c221c] placeholder-[#8a9687]'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="contact-subject" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}`}>
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Software Engineer Opportunity / Internship Inquiry"
                      disabled={loading}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#a5c9af] focus:border-[#a5c9af] ${
                        isDark
                          ? 'bg-[#111411] border border-[#262f26] text-[#f4f5f2] placeholder-[#768273]'
                          : 'bg-white border border-[#d8ded4] text-[#1c221c] placeholder-[#8a9687]'
                      }`}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className={`block text-xs font-semibold ${isDark ? 'text-[#c6ccc3]' : 'text-[#2c362a]'}`}>
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] text-[#8a9687]">
                        {formData.message.length}/3000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      disabled={loading}
                      maxLength={3000}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full p-4 rounded-xl text-xs sm:text-sm transition-all resize-none focus:outline-none focus:ring-1 focus:ring-[#a5c9af] focus:border-[#a5c9af] ${
                        errors.message
                          ? 'border-rose-500 bg-rose-500/5'
                          : isDark
                          ? 'bg-[#111411] border border-[#262f26] text-[#f4f5f2] placeholder-[#768273]'
                          : 'bg-white border border-[#d8ded4] text-[#1c221c] placeholder-[#8a9687]'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button with Loading State */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-[#111411] transition-all duration-200 cursor-pointer btn-tactile ${
                      loading
                        ? 'bg-[#a5c9af]/60 cursor-not-allowed'
                        : 'bg-[#a5c9af] hover:bg-[#b8d6c0] shadow-md shadow-[#a5c9af]/20'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#111411]" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 text-[#111411]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
