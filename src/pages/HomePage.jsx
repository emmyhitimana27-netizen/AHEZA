import SEOHead from '@components/common/SEOHead'
import HeroSection from '@components/home/HeroSection'
import StatsSection from '@components/home/StatsSection'
import FeaturedProducts from '@components/home/FeaturedProducts'
import WhyChooseUs from '@components/home/WhyChooseUs'
import Testimonials from '@components/home/Testimonials'
import DeliverySection from '@components/home/DeliverySection'
import CTASection from '@components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="AHEZA 2050 – Sleep Into The Future"
        description="Premium mattresses in Musanze, Rwanda. Memory foam, hybrid, orthopedic & latex mattresses with free delivery and 100-night trial."
        keywords="mattress Rwanda, premium mattress Musanze, AHEZA 2050, memory foam, hybrid mattress, orthopedic mattress, free delivery Rwanda"
        url="https://aheza2050.rw"
      />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProducts />
        <WhyChooseUs />
        <Testimonials />
        <DeliverySection />
        <CTASection />
      </main>
    </>
  )
}