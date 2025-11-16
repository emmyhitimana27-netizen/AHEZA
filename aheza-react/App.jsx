import React from 'react';
import { AppProvider } from './src/contexts/AppContext';
import { ProductProvider } from './src/contexts/ProductContext';
import { useScrollAnimation } from './src/hooks/useScrollAnimation';
import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';
import HeroSlideshow from './src/components/HeroSlideshow';
import FeaturesGrid from './src/components/FeaturesGrid';
import MattressShowcase from './src/MattressShowcase';
import CartModal from './src/components/CartModal';
import SleepStats from './src/SleepStats';
import SleepCalculator from './src/SleepCalculator';
import MattressCategories from './src/MattressCategories';
import SleepBenefits from './src/SleepBenefits';
import TechnologySection from './src/TechnologySection';
import DeliverySection from './src/DeliverySection';
import TestimonialsSection from './src/TestimonialsSection';
import FAQSection from './src/FAQSection';
import SleepTips from './src/SleepTips';
import CTASection from './src/CTASection';
import Footer from './src/Footer';
import ProductModal from './src/ProductModal';
import SubscriptionModal from './src/SubscriptionModal';
import HelpDeskWidget from './src/HelpDeskWidget';
import FloatingElements from './src/FloatingElements';
import Toast from './src/Toast';
import { useApp } from './src/contexts/AppContext';

// Main App Content Component
const AppContent = () => {
  const { isLoading } = useApp();
  useScrollAnimation();

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      
      {!isLoading && (
        <>
          <Header />
          <main>
            <HeroSlideshow />
            <FeaturesGrid />
            <SleepStats />
            <MattressShowcase />
            <SleepCalculator />
            <MattressCategories />
            <SleepBenefits />
            <TechnologySection />
            <DeliverySection />
            <TestimonialsSection />
            <FAQSection />
            <SleepTips />
            <CTASection />
          </main>
          <Footer />
          
          {/* Modals and Widgets */}
          <CartModal />
          <ProductModal />
          <SubscriptionModal />
          <HelpDeskWidget />
          <FloatingElements />
          <Toast />
        </>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AppProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AppProvider>
  );
};

export default App;