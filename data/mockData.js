// --- Dados Simulados (Mock Data Enriquecidos) ---
export const initialCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla Altis',
    category: 'Sedan',
    year: 2023,
    price: 149900,
    km: 15000,
    fuel: 'Híbrido/Flex',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=800',
    description: 'Corolla Altis Premium Hybrid. Estado de zero, único dono, todas as revisões na concessionária. Garantia de fábrica vigente. Economia e conforto inigualáveis.',
    featured: true
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic Touring',
    category: 'Sedan',
    year: 2022,
    price: 165000,
    km: 22000,
    fuel: 'Gasolina',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    description: 'Motor Turbo 1.5, teto solar, sistema de som premium e pacote Sensing de segurança. O sedã mais completo da categoria com design esportivo.',
    featured: true
  },
  {
    id: 3,
    make: 'Jeep',
    model: 'Compass Longitude',
    category: 'SUV',
    year: 2023,
    price: 178900,
    km: 8500,
    fuel: 'Flex',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&q=80&w=800',
    description: 'SUV líder de vendas. Multimídia de 10 polegadas, bancos em couro e rodas aro 18. Perfeito para cidade e estrada com tecnologia de ponta.',
    featured: true
  },
  {
    id: 4,
    make: 'BMW',
    model: '320i M Sport',
    category: 'Sedan Premium',
    year: 2021,
    price: 289000,
    km: 35000,
    fuel: 'Gasolina',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1555215696-c936d9796460?auto=format&fit=crop&q=80&w=800',
    description: 'A esportividade alemã. Pacote M Sport completo, interior em couro Mocha e teto solar. Veículo para pessoas exigentes que buscam performance.',
    featured: true
  },
  {
    id: 5,
    make: 'Fiat',
    model: 'Pulse Audace',
    category: 'SUV',
    year: 2024,
    price: 115900,
    km: 0,
    fuel: 'Flex',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1656467396840-6b530d957c26?auto=format&fit=crop&q=80&w=800',
    description: 'Zero KM a pronta entrega. Motor Turbo 200, frenagem autônoma de emergência e carregador por indução. Agilidade urbana.',
    featured: false
  },
  {
    id: 6,
    make: 'Ford',
    model: 'Ranger Limited',
    category: 'Picape',
    year: 2022,
    price: 245000,
    km: 40000,
    fuel: 'Diesel',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    description: 'Picape robusta 4x4. Motor 3.2 Diesel, assistente de permanência em faixa e piloto automático adaptativo. Pronta para qualquer terreno.',
    featured: false
  },
  {
    id: 7,
    make: 'Porsche',
    model: 'Macan',
    category: 'SUV Premium',
    year: 2020,
    price: 420000,
    km: 28000,
    fuel: 'Gasolina',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    description: 'Puro DNA esportivo em um SUV. Acabamento impecável, teto panorâmico e sistema de som Bose. Um sonho sobre rodas.',
    featured: true
  },
  {
    id: 8,
    make: 'Volvo',
    model: 'XC60 Momentum',
    category: 'SUV Premium',
    year: 2021,
    price: 310000,
    km: 32000,
    fuel: 'Híbrido',
    transmission: 'Automático',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    description: 'Segurança e tecnologia sueca. Híbrido plug-in com autonomia excelente. Interior clean e sofisticado.',
    featured: false
  },
];

export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1920", 
    title: "Excelência em Cada Detalhe",
    subtitle: "Carros premium revisados e com garantia total."
  },
  {
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1920", 
    title: "Performance e Sofisticação",
    subtitle: "As melhores marcas mundiais você encontra aqui."
  },
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1920", 
    title: "Condições Exclusivas",
    subtitle: "Taxas especiais de financiamento para este mês."
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Os 5 SUVs mais económicos de 2024",
    date: "12 Out 2024",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=400",
    excerpt: "Descubra quais são os modelos que combinam espaço e eficiência energética para a sua família."
  },
  {
    id: 2,
    title: "Manutenção Preventiva: Quando fazer?",
    date: "05 Out 2024",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=400",
    excerpt: "Guia completo para manter o seu veículo sempre novo e evitar surpresas na estrada."
  },
  {
    id: 3,
    title: "Vale a pena comprar um híbrido usado?",
    date: "28 Set 2024",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400",
    excerpt: "Analisamos o mercado de usados para te ajudar a decidir se esta é a melhor opção para si."
  }
];

export const faqs = [
  {
    question: "Aceitam retomas?",
    answer: "Sim! Aceitamos o seu veículo usado como parte do pagamento. Realizamos uma avaliação justa e transparente baseada no mercado atual."
  },
  {
    question: "Quais são as opções de financiamento?",
    answer: "Trabalhamos com os principais bancos e financeiras do país, oferecendo taxas competitivas e planos de até 60 meses, com ou sem entrada."
  },
  {
    question: "Os carros têm garantia?",
    answer: "Absolutamente. Todos os nossos veículos passam por uma revisão rigorosa de 150 pontos e possuem garantia de 3 meses a 1 ano, dependendo do modelo."
  },
  {
    question: "Como funciona o processo de compra online?",
    answer: "Pode escolher o carro, fazer uma visita virtual por vídeo, aprovar o financiamento digitalmente e entregamos o carro na porta da sua casa."
  }
];

