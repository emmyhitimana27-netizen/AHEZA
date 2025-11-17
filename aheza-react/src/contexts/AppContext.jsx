import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Mock product data
const mockProducts = [
  {
    id: 'premium-hybrid',
    name: 'Premium Hybrid Elite',
    description: 'Experience the perfect balance of foam comfort and spring support. Our Premium Hybrid Elite combines multiple layers of cooling gel memory foam with individually wrapped coils for targeted support and pressure relief.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1565034947-1a1c7b08b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Cooling Gel Memory Foam', 'Individually Wrapped Coils', 'Zoned Support System', 'Eco-Friendly Materials'],
    specifications: {
      'Type': 'Hybrid',
      'Firmness': 'Medium (5-7)',
      'Height': '12 inches',
      'Trial': '100 Nights',
      'Warranty': '10 Years'
    },
    images: ['https://images.unsplash.com/photo-1565034947-1a1c7b08b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595398572534-79c5288254d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1615634344166-0f66a842b317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    badge: 'BEST SELLER',
    rating: 4.8,
    reviewCount: 128
  },
  {
    id: 'luxury-memory',
    name: 'Luxury Memory Foam',
    description: 'Sink into cloud-like comfort with our advanced memory foam technology. The Luxury Memory Foam mattress adapts to your body shape, providing exceptional pressure relief and motion isolation for undisturbed sleep.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1595398572534-79c5288254d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Advanced Memory Foam', 'Motion Isolation', 'Pressure Relief', 'Hypoallergenic'],
    specifications: {
      'Type': 'Memory Foam',
      'Firmness': 'Medium-Soft (4-6)',
      'Height': '10 inches',
      'Trial': '100 Nights',
      'Warranty': '15 Years'
    },
    images: ['https://images.unsplash.com/photo-1595398572534-79c5288254d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1565034947-1a1c7b08b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1615634344166-0f66a842b317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    badge: 'MOST COMFORTABLE',
    rating: 4.7,
    reviewCount: 95
  },
  {
    id: 'natural-latex',
    name: 'Natural Latex Supreme',
    description: 'Sleep naturally with our eco-friendly latex mattress. Made from sustainably sourced natural latex, this mattress offers responsive support, excellent durability, and natural cooling properties for a healthier sleep environment.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1615634344166-0f66a842b317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['100% Natural Latex', 'Responsive Support', 'Cooling Properties', 'Eco-Certified'],
    specifications: {
      'Type': 'Natural Latex',
      'Firmness': 'Medium-Firm (6-8)',
      'Height': '9 inches',
      'Trial': '100 Nights',
      'Warranty': '20 Years'
    },
    images: ['https://images.unsplash.com/photo-1615634344166-0f66a842b317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1565034947-1a1c7b08b4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595398572534-79c5288254d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    badge: 'ECO FRIENDLY',
    rating: 4.9,
    reviewCount: 87
  }
];

// Translations
const translations = {
  en: {
    welcome: "Welcome to AHEZA 2050",
    featuresTitle: "Why Choose AHEZA 2050",
    featuresDesc: "Experience the difference with our innovative sleep solutions",
    temperature: "Temperature Regulation",
    temperatureDesc: "Advanced cooling technology maintains perfect sleep temperature all night long",
    support: "Orthopedic Support",
    supportDesc: "Perfect spinal alignment and pressure relief for restorative sleep",
    eco: "Eco-Friendly Materials",
    ecoDesc: "Sustainable, hypoallergenic materials for healthier sleep environment",
    warranty: "10-Year Warranty",
    warrantyDesc: "Complete peace of mind with our comprehensive warranty coverage",
    sleepScience: "The Science of Better Sleep",
    sleepScienceDesc: "Our mattresses are designed based on extensive research into sleep patterns and comfort preferences",
    customerSatisfaction: "Customer Satisfaction",
    fallAsleep: "Minutes to Fall Asleep",
    betterSleep: "Report Better Sleep",
    yearWarranty: "Year Warranty",
    collectionTitle: "Premium Mattress Collection",
    collectionDesc: "Discover our handcrafted mattresses designed for ultimate comfort",
    viewAll: "View All Mattresses",
    sleepCalculator: "Find Your Perfect Mattress",
    sleepCalculatorDesc: "Answer a few questions and our smart calculator will recommend the ideal mattress for your sleep style",
    sleepPosition: "Primary Sleep Position",
    backSleeper: "Back Sleeper",
    sideSleeper: "Side Sleeper",
    stomachSleeper: "Stomach Sleeper",
    combinationSleeper: "Combination",
    firmnessPreference: "Firmness Preference",
    soft: "Soft",
    medium: "Medium",
    firm: "Firm",
    findMattress: "Find My Mattress",
    yourPerfectMatch: "Your Perfect Match",
    completeForm: "Complete the form to see your personalized mattress recommendation",
    categoriesTitle: "Our Mattress Categories",
    categoriesDesc: "Find the perfect mattress type for your sleep needs",
    memoryFoam: "Memory Foam",
    memoryFoamDesc: "Contouring support that adapts to your body shape for pressure relief",
    pressureRelief: "Pressure point relief",
    motionIsolation: "Motion isolation",
    bodyContouring: "Body contouring",
    hybrid: "Hybrid",
    hybridDesc: "Combining foam comfort with spring support for the best of both worlds",
    balancedSupport: "Balanced support",
    enhancedAirflow: "Enhanced airflow",
    responsiveFeel: "Responsive feel",
    naturalLatex: "Natural Latex",
    naturalLatexDesc: "Eco-friendly responsive support with natural cooling properties",
    naturalMaterials: "Natural materials",
    coolSleeping: "Cool sleeping surface",
    durableConstruction: "Durable construction",
    benefitsTitle: "Benefits of Quality Sleep",
    benefitsDesc: "Investing in a quality mattress improves more than just your sleep",
    cognitive: "Enhanced Cognitive Function",
    cognitiveDesc: "Better sleep improves memory, focus, and problem-solving abilities",
    heart: "Improved Heart Health",
    heartDesc: "Quality sleep reduces stress on your cardiovascular system",
    recovery: "Better Physical Recovery",
    recoveryDesc: "Your body repairs itself more effectively during deep sleep",
    mood: "Enhanced Mood",
    moodDesc: "Well-rested people experience less stress and better emotional regulation",
    technologyTitle: "Advanced Sleep Technology",
    technologyDesc: "Our mattresses incorporate cutting-edge technology to provide the most comfortable and supportive sleep surface available.",
    multiLayer: "Multi-layer memory foam construction",
    coolingGel: "Active cooling gel infusion",
    zonedSupport: "Zoned support system",
    naturalLatexLayer: "Natural latex comfort layers",
    deliveryTitle: "Easy Delivery & Setup",
    deliveryDesc: "We make getting your new mattress simple and stress-free",
    order: "Order Online",
    orderDesc: "Choose your perfect mattress with our sleep quiz",
    freeDelivery: "Free Delivery",
    freeDeliveryDesc: "We deliver to your door in 3-5 business days",
    easySetup: "Easy Setup",
    easySetupDesc: "Your mattress expands to full size in hours",
    testimonialsTitle: "What Our Customers Say",
    testimonialsDesc: "Join thousands of satisfied sleepers",
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Get answers to common questions about our mattresses",
    adjustment: "How long does it take to adjust to a new mattress?",
    adjustmentAnswer: "Most people adjust within 2-3 weeks. Your body needs time to adapt to the new support system, especially if you're transitioning from an old mattress.",
    trial: "Do you offer a trial period?",
    trialAnswer: "Yes, we offer a 100-night risk-free trial. If you're not completely satisfied, we'll arrange pickup and provide a full refund.",
    difference: "What's the difference between memory foam and hybrid?",
    differenceAnswer: "Memory foam provides contouring support and motion isolation, while hybrid combines foam with springs for both comfort and responsive support.",
    sleepTipsTitle: "Sleep Health Tips",
    sleepTipsDesc: "Expert advice for better sleep every night",
    consistentSchedule: "Consistent Schedule",
    consistentScheduleDesc: "Go to bed and wake up at the same time every day, even on weekends",
    idealTemperature: "Ideal Temperature",
    idealTemperatureDesc: "Keep your bedroom between 60-67°F (15-19°C) for optimal sleep",
    digitalDetox: "Digital Detox",
    digitalDetoxDesc: "Avoid screens at least 30 minutes before bedtime for better sleep quality",
    relaxationRoutine: "Relaxation Routine",
    relaxationRoutineDesc: "Develop a pre-sleep routine to signal your body it's time to wind down",
    ctaTitle: "Ready to Transform Your Sleep?",
    ctaDesc: "Experience the AHEZA 2050 difference with our 100-night risk-free trial",
    shopMattresses: "Shop Mattresses",
    expertAdvice: "Get Expert Advice",
    footerDesc: "Transforming sleep experiences with premium mattresses and innovative technology.",
    quickLinks: "Quick Links",
    supportLinks: "Support",
    shippingInfo: "Shipping Info",
    returns: "Returns",
    warranty: "Warranty",
    contactUs: "Contact Us",
    contact: "Contact",
    rights: "All rights reserved.",
    readMore: "Read More",
    keyFeatures: "Key Features",
    specifications: "Specifications",
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    shoppingCart: "Shopping Cart",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Start adding some comfortable mattresses to your cart!",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "FREE",
    total: "Total",
    continueShopping: "Continue Shopping",
    proceedCheckout: "Proceed to Checkout",
    secureCheckout: "Secure Checkout",
    sslEncrypted: "SSL Encrypted",
    paymentOptions: "Multiple Payment Options",
    sleepExpertSupport: "Sleep Expert Support",
    helpDeskWelcome: "Hello! I'm your sleep expert. How can I help you find the perfect mattress?",
    justNow: "Just now",
    memoryVsHybrid: "Memory Foam vs Hybrid",
    bestForBackPain: "Best for Back Pain",
    deliveryOptions: "Delivery Options",
    financingOptions: "Financing Options",
    typeQuestion: "Type your question...",
    joinRevolution: "Join Our Sleep Revolution",
    getExclusiveDeals: "Get exclusive deals and sleep tips delivered to your inbox",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    noSpam: "No spam, just better sleep"
  },
  fr: {
    welcome: "Bienvenue chez AHEZA 2050",
    featuresTitle: "Pourquoi choisir AHEZA 2050",
    featuresDesc: "Découvrez la différence avec nos solutions de sommeil innovantes",
    temperature: "Régulation de température",
    temperatureDesc: "Technologie de refroidissement avancée pour une température de sommeil parfaite toute la nuit",
    support: "Support orthopédique",
    supportDesc: "Alignement parfait de la colonne vertébrale et soulagement de la pression pour un sommeil réparateur",
    eco: "Matériaux écologiques",
    ecoDesc: "Matériaux durables et hypoallergéniques pour un environnement de sommeil plus sain",
    warranty: "Garantie de 10 ans",
    warrantyDesc: "Une tranquillité d'esprit complète avec notre garantie complète",
    sleepScience: "La science du meilleur sommeil",
    sleepScienceDesc: "Nos matelas sont conçus sur la base de recherches approfondies sur les habitudes de sommeil et les préférences de confort",
    customerSatisfaction: "Satisfaction client",
    fallAsleep: "Minutes pour s'endormir",
    betterSleep: "Déclarent un meilleur sommeil",
    yearWarranty: "Ans de garantie",
    collectionTitle: "Collection de matelas premium",
    collectionDesc: "Découvrez nos matelas artisanaux conçus pour un confort ultime",
    viewAll: "Voir tous les matelas",
    sleepCalculator: "Trouvez votre matelas parfait",
    sleepCalculatorDesc: "Répondez à quelques questions et notre calculateur intelligent recommandera le matelas idéal pour votre style de sommeil",
    sleepPosition: "Position de sommeil principale",
    backSleeper: "Dormeur sur le dos",
    sideSleeper: "Dormeur sur le côté",
    stomachSleeper: "Dormeur sur le ventre",
    combinationSleeper: "Combinaison",
    firmnessPreference: "Préférence de fermeté",
    soft: "Doux",
    medium: "Moyen",
    firm: "Ferme",
    findMattress: "Trouver mon matelas",
    yourPerfectMatch: "Votre correspondance parfaite",
    completeForm: "Complétez le formulaire pour voir votre recommandation de matelas personnalisée",
    categoriesTitle: "Nos catégories de matelas",
    categoriesDesc: "Trouvez le type de matelas parfait pour vos besoins de sommeil",
    memoryFoam: "Mousse mémoire",
    memoryFoamDesc: "Support de contour qui s'adapte à la forme de votre corps pour soulager la pression",
    pressureRelief: "Soulagement des points de pression",
    motionIsolation: "Isolation des mouvements",
    bodyContouring: "Contour du corps",
    hybrid: "Hybride",
    hybridDesc: "Combinant le confort de la mousse avec le support des ressorts pour le meilleur des deux mondes",
    balancedSupport: "Support équilibré",
    enhancedAirflow: "Circulation d'air améliorée",
    responsiveFeel: "Sensation réactive",
    naturalLatex: "Latex naturel",
    naturalLatexDesc: "Support réactif écologique avec propriétés de refroidissement naturel",
    naturalMaterials: "Matériaux naturels",
    coolSleeping: "Surface de sommeil fraîche",
    durableConstruction: "Construction durable",
    benefitsTitle: "Avantages d'un sommeil de qualité",
    benefitsDesc: "Investir dans un matelas de qualité améliore plus que votre sommeil",
    cognitive: "Fonction cognitive améliorée",
    cognitiveDesc: "Un meilleur sommeil améliore la mémoire, la concentration et les capacités de résolution de problèmes",
    heart: "Amélioration de la santé cardiaque",
    heartDesc: "Un sommeil de qualité réduit le stress sur votre système cardiovasculaire",
    recovery: "Meilleure récupération physique",
    recoveryDesc: "Votre corps se répare plus efficacement pendant le sommeil profond",
    mood: "Humeur améliorée",
    moodDesc: "Les personnes bien reposées ressentent moins de stress et une meilleure régulation émotionnelle",
    technologyTitle: "Technologie de sommeil avancée",
    technologyDesc: "Nos matelas intègrent une technologie de pointe pour fournir la surface de sommeil la plus confortable et supportive disponible.",
    multiLayer: "Construction multicouche en mousse mémoire",
    coolingGel: "Infusion de gel rafraîchissant actif",
    zonedSupport: "Système de support zoné",
    naturalLatexLayer: "Couches de confort en latex naturel",
    deliveryTitle: "Livraison et installation faciles",
    deliveryDesc: "Nous rendons l'obtention de votre nouveau matelas simple et sans stress",
    order: "Commander en ligne",
    orderDesc: "Choisissez votre matelas parfait avec notre quiz de sommeil",
    freeDelivery: "Livraison gratuite",
    freeDeliveryDesc: "Nous livrons à votre porte en 3-5 jours ouvrables",
    easySetup: "Installation facile",
    easySetupDesc: "Votre matelas se développe à sa taille complète en quelques heures",
    testimonialsTitle: "Ce que disent nos clients",
    testimonialsDesc: "Rejoignez des milliers de dormeurs satisfaits",
    faqTitle: "Questions fréquemment posées",
    faqDesc: "Obtenez des réponses aux questions courantes sur nos matelas",
    adjustment: "Combien de temps faut-il pour s'adapter à un nouveau matelas?",
    adjustmentAnswer: "La plupart des gens s'adaptent en 2-3 semaines. Votre corps a besoin de temps pour s'adapter au nouveau système de support, surtout si vous passez d'un vieux matelas.",
    trial: "Offrez-vous une période d'essai?",
    trialAnswer: "Oui, nous offrons un essai sans risque de 100 nuits. Si vous n'êtes pas complètement satisfait, nous organiserons la reprise et fournirons un remboursement complet.",
    difference: "Quelle est la différence entre la mousse mémoire et l'hybride?",
    differenceAnswer: "La mousse mémoire offre un support de contour et une isolation des mouvements, tandis que l'hybride combine la mousse avec des ressorts pour à la fois le confort et le support réactif.",
    sleepTipsTitle: "Conseils pour la santé du sommeil",
    sleepTipsDesc: "Conseils d'experts pour un meilleur sommeil chaque nuit",
    consistentSchedule: "Horaires réguliers",
    consistentScheduleDesc: "Allez au lit et réveillez-vous à la même heure chaque jour, même le week-end",
    idealTemperature: "Température idéale",
    idealTemperatureDesc: "Maintenez votre chambre entre 15-19°C pour un sommeil optimal",
    digitalDetox: "Détox numérique",
    digitalDetoxDesc: "Évitez les écrans au moins 30 minutes avant le coucher pour une meilleure qualité de sommeil",
    relaxationRoutine: "Routine de relaxation",
    relaxationRoutineDesc: "Développez une routine pré-sommeil pour signaler à votre corps qu'il est temps de se détendre",
    ctaTitle: "Prêt à transformer votre sommeil?",
    ctaDesc: "Découvrez la différence AHEZA 2050 avec notre essai sans risque de 100 nuits",
    shopMattresses: "Acheter des matelas",
    expertAdvice: "Obtenir des conseils d'expert",
    footerDesc: "Transformer les expériences de sommeil avec des matelas premium et une technologie innovante.",
    quickLinks: "Liens rapides",
    supportLinks: "Support",
    shippingInfo: "Infos livraison",
    returns: "Retours",
    warranty: "Garantie",
    contactUs: "Contactez-nous",
    contact: "Contact",
    rights: "Tous droits réservés.",
    readMore: "Lire plus",
    keyFeatures: "Caractéristiques principales",
    specifications: "Spécifications",
    addToCart: "Ajouter au panier",
    viewDetails: "Voir les détails",
    shoppingCart: "Panier d'achat",
    emptyCart: "Votre panier est vide",
    emptyCartDesc: "Commencez à ajouter des matelas confortables à votre panier!",
    subtotal: "Sous-total",
    shipping: "Livraison",
    free: "GRATUIT",
    total: "Total",
    continueShopping: "Continuer les achats",
    proceedCheckout: "Passer à la caisse",
    secureCheckout: "Paiement sécurisé",
    sslEncrypted: "Chiffrement SSL",
    paymentOptions: "Options de paiement multiples",
    sleepExpertSupport: "Support expert en sommeil",
    helpDeskWelcome: "Bonjour! Je suis votre expert en sommeil. Comment puis-je vous aider à trouver le matelas parfait?",
    justNow: "À l'instant",
    memoryVsHybrid: "Mousse mémoire vs Hybride",
    bestForBackPain: "Meilleur pour les maux de dos",
    deliveryOptions: "Options de livraison",
    financingOptions: "Options de financement",
    typeQuestion: "Tapez votre question...",
    joinRevolution: "Rejoignez notre révolution du sommeil",
    getExclusiveDeals: "Recevez des offres exclusives et des conseils de sommeil dans votre boîte mail",
    enterEmail: "Entrez votre email",
    subscribe: "S'abonner",
    noSpam: "Pas de spam, juste un meilleur sommeil"
  },
  rw: {
    welcome: "Murakaza neza kuri AHEZA 2050",
    featuresTitle: "Kuki guhitamo AHEZA 2050",
    featuresDesc: "Sobanukirwa itandukaniro hamwe n'ibisubizo byacu by'uburyohe bwa none",
    temperature: "Gucunga ubushyuhe",
    temperatureDesc: "Tekinoroji nziza yo gukingira ubushyuhe bukomeye bukomeza ubushyuhe bwiza bwo kuryama ijoro ryose",
    support: "Gushigikira orthopedic",
    supportDesc: "Guhuza neza umugongo no kudohora umutwaro kugirango urire neza",
    eco: "Ibikoresho byo kubungabunga ibidukikije",
    ecoDesc: "Ibikoresho birambye, bidakora allergy kugirango ube muburyohe bwiza bwo kuryama",
    warranty: "Garanti y'imyaka 10",
    warrantyDesc: "Umutima urengeye hamwe n'ubwishingizi bwacu bukwiye",
    sleepScience: "Si yansi y'uburyohe bwiza",
    sleepScienceDesc: "Imatara zacu zishushanyijwe hashingiwe kubicukumbu byinshi byerekeranye n'imyitwarire yo kuryama n'ibyifuzo by'uburyohe",
    customerSatisfaction: "Icyifuzo cy'abakiriya",
    fallAsleep: "Iminota yo kuryama",
    betterSleep: "Bagaragaza uburyohe bwiza",
    yearWarranty: "Umwaka wa garanti",
    collectionTitle: "Urutonde rw'imatara z'ikirenga",
    collectionDesc: "Sobanukirwa imatara zacu zishushanyijwe n'amaboko zishushanyijwe kugirango ube muburyohe bukabije",
    viewAll: "Reba Imatara Zose",
    sleepCalculator: "Shaka Imatara Zawe Zikwiye",
    sleepCalculatorDesc: "Subiza ibibazo bike kandi calculators yacu nziza izakugira inama z'imatara zikwiye ku buryo bwawe bwo kuryama",
    sleepPosition: "Imimerere y'ibanze yo kuryama",
    backSleeper: "Uryama yicaye",
    sideSleeper: "Uryama yerekeza",
    stomachSleeper: "Uryama yibuno",
    combinationSleeper: "Ihuza",
    firmnessPreference: "Ibyifuzo by'ubukana",
    soft: "Bworoshye",
    medium: "Hagati",
    firm: "Bikomeye",
    findMattress: "Shaka Imatara Yanjye",
    yourPerfectMatch: "Ihuza Ryawe Rikwiye",
    completeForm: "Uzuzu ifishi kugirango ubone inama zawe z'imatara",
    categoriesTitle: "Ibyiciro by'imatara yacu",
    categoriesDesc: "Shaka ubwoko bw'imatara bukwiye kubikenewe byawe byo kuryama",
    memoryFoam: "Memory Foam",
    memoryFoamDesc: "Gushigikira kugirango bigere ku mubiri wawe kugirango udohore",
    pressureRelief: "Kudohora aho umutwaro ukomeye",
    motionIsolation: "Gutandukanya imyitwarire",
    bodyContouring: "Gukora umubiri",
    hybrid: "Hybride",
    hybridDesc: "Guhuza uburyohe bwa foam hamwe n'ubushigikie bwa spring kugirango ube muburyohe bwiza",
    balancedSupport: "Gushigikira bihagije",
    enhancedAirflow: "Kongera umuyaga",
    responsiveFeel: "Gusobanukirwa",
    naturalLatex: "Latex y'ikirere",
    naturalLatexDesc: "Gushigikira kubungabunga ibidukikije hamwe n'ubushyuhe bw'ikirere",
    naturalMaterials: "Ibikoresho by'ikirere",
    coolSleeping: "Ubuso bworoshye bwo kuryama",
    durableConstruction: "Kubaka birambye",
    benefitsTitle: "Inyungu zo kuryama neza",
    benefitsDesc: "Gutanga imari mu matara yiza bihagije ariko n'uburyohe bwiza",
    cognitive: "Kongera ubushobozi bwo kwibuka",
    cognitiveDesc: "Kuryama neza bigabanya ubushobozi bwo kwibuka, kwitondera no gusobanura ibibazo",
    heart: "Kongera ubuzima bw'umutima",
    heartDesc: "Kuryama neza bigabanya umutwaro ku mutima wawe",
    recovery: "Gusana neza",
    recoveryDesc: "Umubiri wawe uvasana neza mu gihe cyo kuryama",
    mood: "Kongera imyitwarire",
    moodDesc: "Abantu baryamye neza bagira umutwaro make kandi bagira imyitwarire myiza",
    technologyTitle: "Tekinoroji nziza yo kuryama",
    technologyDesc: "Imatara yacu ihuza tekinoroji nziza kugirango itange uburyohe n'ubushigikie bwiza bwo kuryama.",
    multiLayer: "Kubaka inshuro ebyiri memory foam",
    coolingGel: "Kwinjiza gel yo gukingira ubushyuhe",
    zonedSupport: "Sisitemu yo gushigikira",
    naturalLatexLayer: "Ingingo z'uburyohe z'ikirere",
    deliveryTitle: "Kugenzura no gushyiraho byoroshye",
    deliveryDesc: "Dukora kubona imatara yawe nshya byoroshye kandi bitagira agahinda",
    order: "Tegeka kuri interineti",
    orderDesc: "Hitamo imatara yawe ikwiye hamwe n'ibibazo byacu byo kuryama",
    freeDelivery: "Kugenzura ubuntu",
    freeDeliveryDesc: "Tugenzura kuri rugi rwawe mu minsi 3-5 y'akazi",
    easySetup: "Gushyiraho byoroshye",
    easySetupDesc: "Imatara yawe igakura kugirango ibe nini mu masaha",
    testimonialsTitle: "Ibyo abakiriya bacu bavuga",
    testimonialsDesc: "Duhunge ibihumbi by'abaryamye bihagije",
    faqTitle: "Ibibazo bibazwa cyane",
    faqDesc: "Shaka ibisubizo ku bibazo bisanzwe kuri matara yacu",
    adjustment: "Bitewe n'igihe kingana kugirango wiyunge n'imatara nshya?",
    adjustmentAnswer: "Abenshi biyunga mu within 2-3. Umubiri wawe ukeneye igihe kugirango ujyane n'ishyirahamwe rishya ryo gushigikira, cyane cyane niba uva ku matara gakondo.",
    trial: "Mwatanga igihe cyo kugerageza?",
    trialAnswer: "Yego, duha igihe cyo kugerageza kitagira ingaruka z'ijoro 100. Niba utahagije, tuzategura gusubiza kandi tuzaha indishyi.",
    difference: "Ni iki cyatandukanya memory foam na hybrid?",
    differenceAnswer: "Memory foam itanga ubushigikie n'uburyohe, naho hybrid ihuza foam na spring kugirango ihuze uburyohe n'ubushigikie.",
    sleepTipsTitle: "Inama z'ubuzima bwo kuryama",
    sleepTipsDesc: "Inama z'abanyakazi kugirango urire neza buri joro",
    consistentSchedule: "Gahunda ihuriweho",
    consistentScheduleDesc: "Genda kuryama no kuva mu buriri mu gihe kimwe buri munsi, na mu mpera z'icyumweru",
    idealTemperature: "Ubushyuhe bukwiye",
    idealTemperatureDesc: "Komeza icyumba cyawe hagati ya 15-19°C kugirango urire neza",
    digitalDetox: "Kuvanga ibikoresho bya digitale",
    digitalDetoxDesc: "Irinda amaserenade iminota 30 mbere yo kuryama kugirango ube muburyohe bwiza",
    relaxationRoutine: "Imikorere yo kwiruhuka",
    relaxationRoutineDesc: "Kora imikorere mbere yo kuryama kugirango umubiri wawe umenye ko ari igihe cyo kwiruhuka",
    ctaTitle: "Witeguye guhindura uburyohe bwawe?",
    ctaDesc: "Sobanukirwa itandukaniro rya AHEZA 2050 hamwe n'igeragezwa ryacu ry'ijoro 100 ridafite ingaruka",
    shopMattresses: "Gura Imatara",
    expertAdvice: "Shaka Inama z'Abanyakazi",
    footerDesc: "Guhindura uburambe bwo kuryama hamwe n'imatara y'ikirenga na tekinoroji nziza.",
    quickLinks: "Amahuza yo Vuba",
    supportLinks: "Gushigikira",
    shippingInfo: "Amakuru yo Kohereza",
    returns: "Gusubiza",
    warranty: "Garanti",
    contactUs: "Twandikire",
    contact: "Kontakti",
    rights: "Amahoro azira amahoro.",
    readMore: "Soma Birenzeho",
    keyFeatures: "Ibiranga",
    specifications: "Ibisobanuro",
    addToCart: "Ongeraho ku Gare",
    viewDetails: "Reba Ibisobanuro",
    shoppingCart: "Gare y'Abaguzi",
    emptyCart: "Gare yawe iri empty",
    emptyCartDesc: "Tangira kongeramo imatara zoroshye mu gare yawe!",
    subtotal: "Igiteranyo",
    shipping: "Kohereza",
    free: "UBUNTU",
    total: "Igiteranyo Cyose",
    continueShopping: "Komeza Gura",
    proceedCheckout: "Komeza mu Biro bya Gare",
    secureCheckout: "Guhagarika bihagije",
    sslEncrypted: "SSL Yanditse",
    paymentOptions: "Amahitamo yo Kwishyura",
    sleepExpertSupport: "Gushigikira Abanyakazi bo mu Buryohe",
    helpDeskWelcome: "Muraho! Ndi umunyaburyohe wawe. Nigute nshobora kugufasha gushaka imatara ikwiye?",
    justNow: "Vuba aha",
    memoryVsHybrid: "Memory Foam na Hybrid",
    bestForBackPain: "Byiza kubyimba byo mu mugongo",
    deliveryOptions: "Amahitamo yo Kohereza",
    financingOptions: "Amahitamo yo Gutanga Imari",
    typeQuestion: "Andika ikibazo cyawe...",
    joinRevolution: "Duhunge Ishyirahamwe ryawe ryo Kuryama",
    getExclusiveDeals: "Shaka amasezerano atandukanye n'inama zo kuryama mu bubiko bwawe",
    enterEmail: "Injiza imeyili yawe",
    subscribe: "Kwiyandikisha",
    noSpam: "Nta spam, gusa kuryama neza"
  }
};

// Initial state
const initialState = {
  // Theme and Language
  theme: localStorage.getItem('aheza-theme') || 'default',
  language: localStorage.getItem('aheza-lang') || 'en',
  translations,
  
  // Products
  products: [],
  productLoading: true,
  selectedProduct: null,
  
  // Cart
  cart: JSON.parse(localStorage.getItem('aheza-cart')) || [],

  // Wishlist
  wishlist: JSON.parse(localStorage.getItem('aheza-wishlist')) || [],
  
  // UI States
  isMobileMenuOpen: false,
  isCartOpen: false,
  isProductModalOpen: false,
  isSubscriptionModalOpen: false,
  isHelpDeskOpen: false,
  
  // App State
  isLoading: true,
  toasts: [],
  
  // Slideshow
  currentSlide: 0,
  
  // Testimonials
  currentTestimonial: 0
};

// Action types
const ACTION_TYPES = {
  // Theme and Language
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  
  // Products
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_PRODUCT_LOADING: 'SET_PRODUCT_LOADING',
  SET_SELECTED_PRODUCT: 'SET_SELECTED_PRODUCT',
  
  // Cart
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',

  // Wishlist
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  
  // UI States
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  TOGGLE_CART: 'TOGGLE_CART',
  TOGGLE_PRODUCT_MODAL: 'TOGGLE_PRODUCT_MODAL',
  TOGGLE_SUBSCRIPTION_MODAL: 'TOGGLE_SUBSCRIPTION_MODAL',
  TOGGLE_HELP_DESK: 'TOGGLE_HELP_DESK',
  
  // App State
  SET_LOADING: 'SET_LOADING',
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  
  // Slideshow and Testimonials
  SET_CURRENT_SLIDE: 'SET_CURRENT_SLIDE',
  SET_CURRENT_TESTIMONIAL: 'SET_CURRENT_TESTIMONIAL'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    // Theme and Language
    case ACTION_TYPES.SET_THEME:
      localStorage.setItem('aheza-theme', action.payload);
      return { ...state, theme: action.payload };

    case ACTION_TYPES.SET_LANGUAGE:
      localStorage.setItem('aheza-lang', action.payload);
      return { ...state, language: action.payload };

    // Products
    case ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: action.payload };

    case ACTION_TYPES.SET_PRODUCT_LOADING:
      return { ...state, productLoading: action.payload };

    case ACTION_TYPES.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    // Cart
    case ACTION_TYPES.ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      let newCart;
      
      if (existingItemIndex > -1) {
        newCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newCart = [...state.cart, {
          ...action.payload,
          quantity: action.payload.quantity || 1,
          addedAt: new Date().toISOString()
        }];
      }
      
      localStorage.setItem('aheza-cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };

    case ACTION_TYPES.REMOVE_FROM_CART:
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('aheza-cart', JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };

    case ACTION_TYPES.UPDATE_QUANTITY:
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('aheza-cart', JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case ACTION_TYPES.CLEAR_CART:
      localStorage.setItem('aheza-cart', JSON.stringify([]));
      return { ...state, cart: [] };

    // Wishlist
    case ACTION_TYPES.ADD_TO_WISHLIST:
      const newWishlist = state.wishlist.some(item => item.id === action.payload.id)
        ? state.wishlist
        : [...state.wishlist, { ...action.payload, addedAt: new Date().toISOString() }];
      
      localStorage.setItem('aheza-wishlist', JSON.stringify(newWishlist));
      return { ...state, wishlist: newWishlist };

    case ACTION_TYPES.REMOVE_FROM_WISHLIST:
      const filteredWishlist = state.wishlist.filter(item => item.id !== action.payload);
      localStorage.setItem('aheza-wishlist', JSON.stringify(filteredWishlist));
      return { ...state, wishlist: filteredWishlist };

    case ACTION_TYPES.CLEAR_WISHLIST:
      localStorage.setItem('aheza-wishlist', JSON.stringify([]));
      return { ...state, wishlist: [] };

    // UI States
    case ACTION_TYPES.TOGGLE_MOBILE_MENU:
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };

    case ACTION_TYPES.TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen };

    case ACTION_TYPES.TOGGLE_PRODUCT_MODAL:
      return { 
        ...state, 
        isProductModalOpen: !state.isProductModalOpen,
        selectedProduct: state.isProductModalOpen ? null : state.selectedProduct
      };

    case ACTION_TYPES.TOGGLE_SUBSCRIPTION_MODAL:
      return { ...state, isSubscriptionModalOpen: !state.isSubscriptionModalOpen };

    case ACTION_TYPES.TOGGLE_HELP_DESK:
      return { ...state, isHelpDeskOpen: !state.isHelpDeskOpen };

    // App State
    case ACTION_TYPES.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTION_TYPES.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, { ...action.payload, id: Date.now() }] };

    case ACTION_TYPES.REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) };

    // Slideshow and Testimonials
    case ACTION_TYPES.SET_CURRENT_SLIDE:
      return { ...state, currentSlide: action.payload };

    case ACTION_TYPES.SET_CURRENT_TESTIMONIAL:
      return { ...state, currentTestimonial: action.payload };

    default:
      return state;
  }
};

// Context
export const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    // Theme and Language
    setTheme: (theme) => dispatch({ type: ACTION_TYPES.SET_THEME, payload: theme }),
    setLanguage: (language) => dispatch({ type: ACTION_TYPES.SET_LANGUAGE, payload: language }),
    
    // Products
    setProducts: (products) => dispatch({ type: ACTION_TYPES.SET_PRODUCTS, payload: products }),
    setProductLoading: (loading) => dispatch({ type: ACTION_TYPES.SET_PRODUCT_LOADING, payload: loading }),
    setSelectedProduct: (product) => dispatch({ type: ACTION_TYPES.SET_SELECTED_PRODUCT, payload: product }),
    
    // Cart
    addToCart: (product, quantity = 1) => {
      dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...product, quantity } });
      actions.addToast({
        message: `${product.name} added to cart!`,
        type: 'success',
        autoHide: true
      });
    },
    removeFromCart: (productId) => {
      dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART, payload: productId });
      actions.addToast({
        message: 'Item removed from cart',
        type: 'warning',
        autoHide: true
      });
    },
    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        actions.removeFromCart(productId);
        return;
      }
      dispatch({ type: ACTION_TYPES.UPDATE_QUANTITY, payload: { productId, quantity } });
    },
    clearCart: () => dispatch({ type: ACTION_TYPES.CLEAR_CART }),

    // Wishlist
    addToWishlist: (product) => {
      dispatch({ type: ACTION_TYPES.ADD_TO_WISHLIST, payload: product });
      actions.addToast({
        message: `${product.name} added to wishlist!`,
        type: 'success',
        autoHide: true
      });
    },
    removeFromWishlist: (productId) => {
      dispatch({ type: ACTION_TYPES.REMOVE_FROM_WISHLIST, payload: productId });
      actions.addToast({
        message: 'Item removed from wishlist',
        type: 'info',
        autoHide: true
      });
    },
    clearWishlist: () => dispatch({ type: ACTION_TYPES.CLEAR_WISHLIST }),
    isInWishlist: (productId) => {
      return state.wishlist.some(item => item.id === productId);
    },
    
    // UI States
    toggleMobileMenu: () => dispatch({ type: ACTION_TYPES.TOGGLE_MOBILE_MENU }),
    toggleCart: () => dispatch({ type: ACTION_TYPES.TOGGLE_CART }),
    toggleProductModal: () => dispatch({ type: ACTION_TYPES.TOGGLE_PRODUCT_MODAL }),
    toggleSubscriptionModal: () => dispatch({ type: ACTION_TYPES.TOGGLE_SUBSCRIPTION_MODAL }),
    toggleHelpDesk: () => dispatch({ type: ACTION_TYPES.TOGGLE_HELP_DESK }),
    
    // App State
    setLoading: (loading) => dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading }),
    addToast: (toast) => dispatch({ type: ACTION_TYPES.ADD_TOAST, payload: toast }),
    removeToast: (toastId) => dispatch({ type: ACTION_TYPES.REMOVE_TOAST, payload: toastId }),
    
    // Slideshow and Testimonials
    setCurrentSlide: (slideIndex) => dispatch({ type: ACTION_TYPES.SET_CURRENT_SLIDE, payload: slideIndex }),
    setCurrentTestimonial: (testimonialIndex) => dispatch({ type: ACTION_TYPES.SET_CURRENT_TESTIMONIAL, payload: testimonialIndex })
  };

  // Helper functions
  const helpers = {
    // Cart helpers
    getCartTotal: () => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getCartItemCount: () => {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Wishlist helpers
    getWishlistCount: () => {
      return state.wishlist.length;
    },
    
    // Product helpers
    getProductById: (id) => {
      return state.products.find(product => product.id === id);
    },
    getProductsByCategory: (category) => {
      return state.products.filter(product => 
        product.specifications.Type.toLowerCase().includes(category.toLowerCase())
      );
    },
    
    // Translation helper
    translate: (key) => {
      return state.translations[state.language]?.[key] || state.translations.en[key] || key;
    },
    
    // Theme helpers
    getThemeIcon: () => {
      const icons = {
        'default': 'fa-moon-stars',
        'dark': 'fa-sun',
        'nature': 'fa-leaf',
        'luxury': 'fa-crown'
      };
      return icons[state.theme] || 'fa-moon-stars';
    }
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      actions.setProductLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        actions.setProducts(mockProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        actions.addToast({
          message: 'Failed to load products',
          type: 'error',
          autoHide: true
        });
      } finally {
        actions.setProductLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-remove toasts
  useEffect(() => {
    state.toasts.forEach(toast => {
      if (toast.autoHide) {
        setTimeout(() => {
          actions.removeToast(toast.id);
        }, 5000);
      }
    });
  }, [state.toasts]);

  // Create manager objects for better organization
  const cartManager = {
    addToCart: actions.addToCart,
    removeFromCart: actions.removeFromCart,
    updateQuantity: actions.updateQuantity,
    clearCart: actions.clearCart,
    getCartTotal: helpers.getCartTotal,
    getCartItemCount: helpers.getCartItemCount
  };

  const wishlistManager = {
    addToWishlist: actions.addToWishlist,
    removeFromWishlist: actions.removeFromWishlist,
    clearWishlist: actions.clearWishlist,
    isInWishlist: actions.isInWishlist,
    getWishlistCount: helpers.getWishlistCount
  };

  const languageManager = {
    translate: helpers.translate,
    setLanguage: actions.setLanguage,
    currentLanguage: state.language
  };

  const value = {
    ...state,
    ...actions,
    ...helpers,
    cartManager,
    wishlistManager,
    languageManager
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};