import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function ProductImageGallery({ images = [], productName = '' }) {
  const [active,   setActive]   = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [direction, setDirection] = useState(1)

  const safeImages = images.length ? images : [null]

  const goTo = (index, dir = 1) => {
    setDirection(dir)
    setActive(index)
  }

  const goNext = () => goTo((active + 1) % safeImages.length, 1)
  const goPrev = () => goTo((active - 1 + safeImages.length) % safeImages.length, -1)

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative aspect-[4/3] bg-surface border border-white/5 rounded-3xl overflow-hidden group">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {safeImages[active] ? (
                <img
                  src={safeImages[active]}
                  alt={`${productName} - Image ${active + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🛏</div>
                    <p className="text-sm text-neutral-600">{productName}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Zoom Button */}
          {safeImages[active] && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute top-4 right-4 w-9 h-9 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Zoom image"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          )}

          {/* Navigation (multi-image) */}
          {safeImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Counter */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 glass border border-white/10 rounded-full text-2xs text-neutral-400 font-mono">
              {active + 1} / {safeImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {safeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 1 : -1)}
                className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i === active
                    ? 'border-primary-500 shadow-glow-sm'
                    : 'border-white/5 hover:border-white/20 opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                {img ? (
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-lg">🛏</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/96 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={safeImages[active]}
                alt={`${productName} - Full view`}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-4 right-4 w-9 h-9 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass border border-white/15 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}