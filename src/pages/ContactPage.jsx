import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Mail, Phone, MapPin, Clock,
  Send, MessageCircle, Facebook,
  Instagram, Twitter, CheckCircle2,
  AlertCircle
} from 'lucide-react'
import SEOHead from '@components/common/SEOHead'
import { contactService } from '@services/contactService'
import { contactSchema } from '@utils/validators'
import { CONTACT_INFO, SOCIAL_LINKS } from '@utils/constants'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const ICON_MAP = { Facebook, Instagram, Twitter, MessageCircle }

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: 'Call Us',
    value: CONTACT_INFO.phone,
    sub: 'Mon–Sat, 8am–7pm',
    href: `tel:${CONTACT_INFO.phone}`,
    color: '#2d55ff',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: CONTACT_INFO.email,
    sub: 'We reply within 2 hours',
    href: `mailto:${CONTACT_INFO.email}`,
    color: '#ff7d08',
  },
  {
    icon: MapPin,
    title: 'Visit Showroom',
    value: CONTACT_INFO.address,
    sub: 'Open 7 days a week',
    href: 'https://maps.google.com/?q=Musanze+Rwanda',
    color: '#22c55e',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon–Sat: 8am–7pm',
    sub: 'Sunday: 10am–5pm',
    href: null,
    color: '#a855f7',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await contactService.send(data)
      setSubmitted(true)
      reset()
      toast.success('Message sent! We\'ll reply within 2 hours.')
    } catch {
      toast.error('Failed to send message. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError) => clsx(
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-200',
    hasError
      ? 'border-red-500/40 focus:border-red-400/60'
      : 'border-white/10 focus:border-primary-500/50 hover:border-white/20'
  )

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with AHEZA 2050. Call, email, or visit our showroom in Musanze, Rwanda. We're available 7 days a week."
        keywords="contact AHEZA 2050, mattress store Musanze, Rwanda mattress contact"
        url="https://aheza2050.rw/contact"
      />

      <div className="bg-dark" style={{ paddingTop: 'var(--navbar-height)' }}>

        {/* Page Header */}
        <section className="relative py-16 lg:py-24 bg-surface overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-700/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-6 bg-primary-500" />
                <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">Get In Touch</span>
              </div>
              <h1 className="font-display font-black text-white heading-lg mb-4">
                We're Here to <span className="text-gradient">Help You Sleep Better</span>
              </h1>
              <p className="text-neutral-400 text-base max-w-xl mx-auto">
                Whether you have a question about our mattresses, need help choosing, or want to check your order — our team is ready.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-12 bg-dark">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_CARDS.map((card, i) => {
                const Icon = card.icon
                const Wrapper = card.href ? 'a' : 'div'
                const wrapperProps = card.href
                  ? { href: card.href, target: card.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {}

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Wrapper
                      {...wrapperProps}
                      className={clsx(
                        'group glass border border-white/5 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-400',
                        card.href && 'hover:border-white/10 hover:bg-white/[0.02] cursor-pointer'
                      )}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: card.color }} />
                      </div>
                      <div>
                        <p className="text-neutral-500 text-xs mb-1">{card.title}</p>
                        <p className="text-white font-semibold text-sm">{card.value}</p>
                        <p className="text-neutral-600 text-xs mt-0.5">{card.sub}</p>
                      </div>
                    </Wrapper>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Form + Map */}
        <section ref={ref} className="section-padding bg-surface">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-8">
                  <h2 className="font-display font-black text-white text-2xl mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    Fill out the form below and we'll get back to you within 2 hours.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass border border-green-500/20 rounded-2xl p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                    <p className="text-neutral-400 text-sm mb-6">
                      Thank you! We'll respond to your inquiry within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
                          Full Name *
                        </label>
                        <input
                          {...register('name')}
                          placeholder="Jean Uwimana"
                          className={inputClass(!!errors.name)}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
                          Phone (Optional)
                        </label>
                        <input
                          {...register('phone')}
                          placeholder="+250 788 000 000"
                          className={inputClass(!!errors.phone)}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
                        Subject *
                      </label>
                      <input
                        {...register('subject')}
                        placeholder="e.g. Mattress inquiry, delivery question…"
                        className={inputClass(!!errors.subject)}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1.5 block">
                        Message *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Tell us how we can help you…"
                        className={clsx(inputClass(!!errors.message), 'resize-none')}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="flex items-center gap-2.5 px-7 py-3.5 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
                    >
                      {loading ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>

              {/* Map + Socials */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex flex-col gap-6"
              >
                {/* Map placeholder */}
                <div className="flex-1 min-h-[280px] glass border border-white/5 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-dark flex flex-col items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/25 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-sm mb-1">AHEZA 2050 Showroom</p>
                      <p className="text-neutral-400 text-xs">{CONTACT_INFO.address}</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Musanze+Rwanda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-500/25 text-primary-300 rounded-xl text-xs font-semibold transition-all"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="glass border border-white/5 rounded-2xl p-5">
                  <p className="text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    Follow Us
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {SOCIAL_LINKS.map(({ platform, url, icon }) => {
                      const Icon = ICON_MAP[icon]
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 glass border border-white/5 hover:border-white/15 rounded-xl text-neutral-400 hover:text-white transition-all duration-300 group"
                        >
                          {Icon && (
                            <div className="w-8 h-8 rounded-lg bg-primary-600/15 flex items-center justify-center group-hover:bg-primary-600/25 transition-colors">
                              <Icon className="w-4 h-4 text-primary-400" />
                            </div>
                          )}
                          <span className="text-xs font-medium">{platform}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}