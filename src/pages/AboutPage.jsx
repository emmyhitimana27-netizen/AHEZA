import { motion } from 'framer-motion'
import {
  Heart, Target, Eye, Award,
  Users, MapPin, Clock, Leaf,
  ArrowRight, CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '@components/common/SEOHead'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { CONTACT_INFO } from '@utils/constants'

const TIMELINE = [
  { year: '2018', title: 'Founded in Musanze',     desc: 'AHEZA started as a small family business with a vision to improve sleep quality across Rwanda.' },
  { year: '2020', title: 'Expanded Collection',     desc: 'Introduced memory foam and hybrid mattress lines, becoming Rwanda\'s fastest-growing sleep brand.' },
  { year: '2022', title: 'Nationwide Delivery',     desc: 'Launched island-wide delivery network serving all 30 districts of Rwanda.' },
  { year: '2024', title: '5,000+ Happy Customers',  desc: 'Crossed the milestone of 5,000 satisfied customers with a 4.9-star average rating.' },
  { year: '2050', title: 'The Vision',              desc: 'Leading Rwanda into the future of sleep technology — AHEZA 2050.' },
]

const TEAM = [
  { name: 'Jean Pierre Habimana', role: 'Founder & CEO',          initials: 'JH' },
  { name: 'Aline Uwimana',        role: 'Head of Customer Care',  initials: 'AU' },
  { name: 'Eric Nkurunziza',      role: 'Delivery Operations',    initials: 'EN' },
  { name: 'Grace Mukamana',       role: 'Product Specialist',     initials: 'GM' },
]

function SectionHeader({ eyebrow, heading, description, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className={`flex items-center gap-2 mb-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-6 bg-primary-500" />
        <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase">{eyebrow}</span>
      </div>
      <h2 className="font-display font-black text-white heading-lg mb-4">{heading}</h2>
      {description && (
        <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  )
}

export default function AboutPage() {
  const { ref: missionRef,  isVisible: missionVisible  } = useIntersectionObserver()
  const { ref: timelineRef, isVisible: timelineVisible } = useIntersectionObserver()
  const { ref: teamRef,     isVisible: teamVisible     } = useIntersectionObserver()
  const { ref: valuesRef,   isVisible: valuesVisible   } = useIntersectionObserver()

  return (
    <>
      <SEOHead
        title="About Us"
        description="Learn about AHEZA 2050 — Rwanda's premium mattress company based in Musanze. Our story, mission, team, and commitment to better sleep."
        keywords="about AHEZA 2050, mattress company Rwanda, Musanze, sleep brand Rwanda"
        url="https://aheza2050.rw/about"
      />

      <div className="bg-dark" style={{ paddingTop: 'var(--navbar-height)' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-surface" />
          <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-700/8 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/15 border border-primary-500/25 text-primary-300 text-xs font-semibold mb-6">
                <Heart className="w-3.5 h-3.5 fill-current" />
                Our Story
              </div>
              <h1 className="font-display font-black text-white heading-xl mb-6">
                Built on the Belief That{' '}
                <span className="text-gradient">Sleep Changes Lives</span>
              </h1>
              <p className="text-neutral-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                AHEZA 2050 was born in Musanze, Rwanda — a place of extraordinary beauty — with a simple mission: help every Rwandan wake up feeling their best, every single day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Mission / Vision / Values ──────────────────────── */}
        <section ref={missionRef} className="section-padding bg-dark">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target, title: 'Our Mission',
                  text: 'Make premium, science-backed mattresses accessible to every Rwandan household, delivered with care from Musanze to your door.',
                  color: '#2d55ff',
                },
                {
                  icon: Eye, title: 'Our Vision',
                  text: 'To be Rwanda\'s most trusted sleep brand by 2050 — pioneering sleep technology that improves the health and productivity of our nation.',
                  color: '#ff7d08',
                },
                {
                  icon: Leaf, title: 'Our Values',
                  text: 'Quality without compromise. Sustainability in every layer. Honesty in every interaction. Community in every delivery.',
                  color: '#22c55e',
                },
              ].map(({ icon: Icon, title, text, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={missionVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="glass border border-white/5 hover:border-white/10 rounded-2xl p-7 transition-all duration-400"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">{title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────── */}
        <section ref={timelineRef} className="section-padding bg-surface">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={timelineVisible ? { opacity: 1, y: 0 } : {}}
              className="mb-14"
            >
              <SectionHeader
                eyebrow="Our Journey"
                heading={<>From Musanze to <span className="text-gradient-primary">The Future</span></>}
              />
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-600/50 via-primary-600/20 to-transparent hidden md:block" />

              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={timelineVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="flex gap-6 md:gap-10"
                  >
                    {/* Year Bubble */}
                    <div className="relative flex-shrink-0 hidden md:flex items-start">
                      <div className="w-16 h-16 rounded-2xl bg-primary-600/15 border border-primary-500/25 flex items-center justify-center z-10">
                        <span className="text-primary-300 font-black text-sm font-mono">{item.year}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="glass border border-white/5 hover:border-primary-500/20 rounded-2xl p-6 flex-1 transition-colors duration-300 group">
                      <div className="flex items-start gap-3">
                        <span className="md:hidden px-2 py-0.5 bg-primary-600/20 text-primary-300 text-xs font-bold rounded font-mono flex-shrink-0">
                          {item.year}
                        </span>
                        <div>
                          <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ──────────────────────────────────────────── */}
        <section ref={teamRef} className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamVisible ? { opacity: 1, y: 0 } : {}}
              className="mb-14 text-center"
            >
              <SectionHeader
                eyebrow="Our Team"
                heading={<>The People Behind <span className="text-gradient">AHEZA 2050</span></>}
                description="A passionate team dedicated to transforming sleep across Rwanda."
                center
              />
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass border border-white/5 hover:border-primary-500/20 rounded-2xl p-6 text-center group transition-all duration-400"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/25 flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-sm transition-all duration-400">
                    <span className="text-primary-300 font-black text-xl">{member.initials}</span>
                  </div>
                  <p className="font-semibold text-white text-sm mb-1">{member.name}</p>
                  <p className="text-neutral-500 text-xs">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Rwanda Trusts Us ──────────────────────────── */}
        <section ref={valuesRef} className="section-padding bg-surface">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={valuesVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <SectionHeader
                  eyebrow="Why Choose Us"
                  heading={<>Rwanda's Most <span className="text-gradient-primary">Trusted Mattress Brand</span></>}
                  description="Since 2018, we've been on a mission to improve the quality of sleep for every Rwandan — one mattress at a time."
                />
                <div className="mt-8 space-y-4">
                  {[
                    'Free setup and old mattress removal',
                    'Flexible payment via MoMo, cash, or card',
                    'ISO-certified quality testing on all products',
                    'Rwanda-wide delivery network',
                    'Sleep consultants available 24/7',
                    'Up to 15-year manufacturer warranty',
                  ].map((point, i) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      animate={valuesVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span className="text-neutral-300 text-sm">{point}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <Link
                    to="/products"
                    className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl text-sm transition-all shadow-glow-sm"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-6 py-3 glass border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-semibold rounded-xl text-sm transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={valuesVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Users,  value: '5,000+', label: 'Happy Customers' },
                  { icon: Award,  value: '#1',      label: 'In Musanze' },
                  { icon: MapPin, value: '30',      label: 'Districts Served' },
                  { icon: Clock,  value: '6+',      label: 'Years of Excellence' },
                ].map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className="glass border border-white/5 rounded-2xl p-6 text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-600/15 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-4.5 h-4.5 text-primary-400" />
                    </div>
                    <p className="font-display font-black text-white text-2xl mb-1">{value}</p>
                    <p className="text-neutral-500 text-xs">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Location CTA ──────────────────────────────────── */}
        <section className="section-padding bg-dark border-t border-white/5">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/15 border border-primary-500/20 text-primary-300 text-xs font-semibold mb-6">
                <MapPin className="w-3.5 h-3.5" />
                Visit Our Showroom
              </div>
              <h2 className="font-display font-black text-white text-3xl mb-4">
                Come See Us in Musanze
              </h2>
              <p className="text-neutral-400 mb-2">{CONTACT_INFO.address}</p>
              <p className="text-neutral-500 text-sm mb-8">{CONTACT_INFO.hours}</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-2xl text-sm transition-all shadow-glow-sm hover:shadow-glow-md"
              >
                Get Directions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}