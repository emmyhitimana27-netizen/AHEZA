import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock,
  Facebook, Instagram, Twitter, MessageCircle,
  ArrowRight, Send
} from 'lucide-react'
import { useState } from 'react'
import { CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS } from '@utils/constants'
import { contactService } from '@services/contactService'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import toast from 'react-hot-toast'

const FOOTER_LINKS = {
  Company:  [
    { label: 'About Us',    path: '/about' },
    { label: 'Products',    path: '/products' },
    { label: 'Contact',     path: '/contact' },
    { label: 'Track Order', path: '/track-order' },
  ],
  Support: [
    { label: 'Delivery Info',  path: '/about#delivery' },
    { label: 'Return Policy',  path: '/about#returns' },
    { label: 'Warranty',       path: '/about#warranty' },
    { label: 'FAQ',            path: '/about#faq' },
  ],
}

const ICON_MAP = { Facebook, Instagram, Twitter, MessageCircle }

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subLoading, setSubLoading] = useState(false)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      setSubLoading(true)
      await contactService.subscribe(email)
      toast.success('Subscribed! Welcome to AHEZA 2050.')
      setEmail('')
    } catch {
      toast.error('Could not subscribe. Please try again.')
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <footer ref={ref} className="relative bg-surface border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-700/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* ── Newsletter Bar ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="border-b border-white/5 py-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-1">
                Stay updated on new arrivals
              </h3>
              <p className="text-neutral-400 text-sm">
                Subscribe to get exclusive offers and sleep tips.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={subLoading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                {subLoading ? 'Subscribing…' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* ── Main Footer Grid ───────────────────────────────── */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-primary-600 rounded-xl rotate-45 group-hover:rotate-[60deg] transition-transform duration-500" />
                <div className="absolute inset-1 bg-surface rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-primary-400 font-display font-bold text-sm">A</span>
              </div>
              <span className="font-display font-bold text-lg text-white">
                AHEZA <span className="text-gradient-primary">2050</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Premium mattresses built for the future. Experience unparalleled comfort in Musanze, Rwanda.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ platform, url, icon }) => {
                const Icon = ICON_MAP[icon]
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary-500/40 transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links], si) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + si * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-primary-400" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin,  text: CONTACT_INFO.address },
                { icon: Phone,   text: CONTACT_INFO.phone },
                { icon: Mail,    text: CONTACT_INFO.email },
                { icon: Clock,   text: CONTACT_INFO.hours },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary-600/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <span className="text-sm text-neutral-400 leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────── */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} AHEZA 2050. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
          </div>
          <p>Made with ❤️ in Musanze, Rwanda</p>
        </div>
      </div>
    </footer>
  )
}