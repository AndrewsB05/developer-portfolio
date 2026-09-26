// ===== i18n Translation System =====
// Client-side translations for ES/EN with auto-detection

export type Lang = 'es' | 'en';

export interface Translations {
  nav: {
    about: string;
    stack: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  terminal: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
    line8: string;
  };
  about: {
    sectionTitle: string;
    bioTitle: string;
    bioText: string;
    philosophyTitle: string;
    philosophyItems: string[];
    metricsTitle: string;
    metrics: { value: string; label: string }[];
    locationTitle: string;
    locationText: string;
    locationAvailability: string;
  };
  stack: {
    sectionTitle: string;
    sectionSubtitle: string;
    categories: {
      name: string;
      items: string[];
    }[];
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    filters: string[];
    items: {
      title: string;
      description: string;
      tags: string[];
      category: string;
      github: string;
      demo: string;
      /** Clave de la captura en `projectImages` (Projects.astro). Sin ella, la tarjeta muestra un ícono. */
      image?: string;
    }[];
  };
  footer: {
    status: string;
    contactLabel: string;
    githubLabel: string;
    linkedinLabel: string;
    cvLabel: string;
    copyright: string;
    builtWith: string;
  };
  contact: {
    pageTitle: string;
    title: string;
    intro: string;
    emailLabel: string;
    emailHint: string;
    nameLabel: string;
    optional: string;
    topicLabel: string;
    topicPlaceholder: string;
    topics: { job: string; freelance: string; collab: string; other: string };
    messageLabel: string;
    messageHint: string;
    submit: string;
    privacy: string;
    doneTitle: string;
    doneText: string;
    back: string;
    errors: { name: string; email: string; topic: string; message: string };
    alerts: {
      unavailable: string;
      invalid: string;
      expired: string;
      insult: string;
      tooManyLinks: string;
      gibberish: string;
      shouting: string;
      rateLimited: string;
      error: string;
    };
  };
}

export const translations: Record<Lang, Translations> = {
  es: {
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      stack: 'Stack',
      contact: 'Contacto',
    },
    hero: {
      badge: 'Disponible para nuevos proyectos',
      title: 'Hola, soy Benjamin,',
      titleHighlight: 'Especialista en Soluciones Backend',
      subtitle:
        'Ingeniero Civil en Computación e Informática enfocado en desarrollo Back-end, arquitectura de software y diseño de sistemas escalables.',
      cta1: 'Ver Proyectos',
      cta2: 'Contactar',
    },
    terminal: {
      line1: '$ whoami',
      line2: 'Benjamin Droguett — Ing. Civil en Computación e Informática (Backend)',
      line3: '$ cat skills.json',
      line4: '{ "core": ["Node.js", ".NET", "Python", "APIs"], "infra": ["Docker", "Linux", "SQL"] }',
      line5: '$ curl -s http://localhost:8080/api/v1/gateway/status',
      line6: '[POST] /api/v1/auth 200 OK (8ms) · [GET] /api/v1/data 200 OK (Redis: 2ms)',
      line7: '✓ 99.99% Uptime · 0 excepciones · PostgreSQL & Docker: Ready',
      line8: '[✓] Backend Status: Operacional · Disponible para nuevos proyectos',
    },
    about: {
      sectionTitle: 'Sobre mí',
      bioTitle: '¿Quién soy?',
      bioText:
        'Soy Benjamin Droguett estudiante egresado de la carrera de Ingeniería Civil en Computación e Informática en formación. Me apasiona el desarrollo Back-end, el diseño de arquitectura de software y el aprendizaje profundo de nuevas tecnologías. Mi enfoque de trabajo se fundamenta en el estudio continuo, la observación minuciosa de cada requerimiento y la creación de soluciones eficientes a problemas complejos.',
      philosophyTitle: 'Mis Objetivos & Filosofía',
      philosophyItems: [
        '🎯 Estudio constante y crecimiento técnico continuo',
        '🔍 Observación y análisis riguroso para la solución de problemas',
        '⚙️ Desarrollo Back-end estructurado, mantenible y escalable',
        '💻 Código con C#, JavaScript, Node.js y Python',
        '🐧 Experiencia y fluidez en entornos Linux',
      ],
      metricsTitle: 'Enfoque y Métricas',
      metrics: [
        { value: '100%', label: 'Compromiso con el código limpio' },
        { value: '4+', label: 'Lenguajes de programación dominados' },
        { value: 'Linux', label: 'Entorno de trabajo principal' },
        { value: 'Back-end', label: 'Área de especialización' },
      ],
      locationTitle: 'Ubicación',
      locationText: 'Chile',
      locationAvailability: 'Disponible para proyectos, prácticas y colaboraciones',
    },
    stack: {
      sectionTitle: 'Stack Tecnológico',
      sectionSubtitle: 'Tecnologías y herramientas con las que programo y construyo soluciones',
      categories: [
        {
          name: 'Lenguajes de Programación',
          items: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Java', 'C#'],
        },
        {
          name: 'Bases de Datos & APIs',
          items: ['APIs REST', 'SQL', 'MongoDB', 'Supabase'],
        },
        {
          name: 'Cloud, DevOps & Terminal',
          items: ['Docker', 'Git', 'GitHub', 'GCP', 'Azure', 'Manejo Terminal'],
        },
        {
          name: 'IA & Buenas Prácticas',
          items: ['Redes Neuronales', 'Modelos YOLO', 'Clean Code'],
        },
      ],
    },
    projects: {
      sectionTitle: 'Proyectos Destacados',
      sectionSubtitle: 'Desarrollo Back-end, APIs y arquitectura de software',
      filters: ['Todos', 'APIs', 'Cloud', 'DevOps'],
      items: [
        {
          title: 'Pokémon Chile Market Tracker',
          description:
            'Comparador de precios de producto sellado de Pokémon TCG en Chile: un scraper responsable (respeta robots.txt y rate limits) recopila precios y stock de 26 tiendas, un motor de matching unifica las publicaciones en ~440 productos y una API REST alimenta un sitio con búsqueda, filtros e historial de precios.',
          tags: ['Web Scraping', 'TypeScript', 'Node.js', 'Astro', 'PostgreSQL', 'Vercel'],
          category: 'APIs',
          github: '',
          demo: 'https://pokemon-chile-market-tracker.vercel.app/',
          image: 'pokemon-chile-market-tracker',
        },
        {
          title: 'Automatización & CI/CD Pipeline',
          description:
            'Configuración de flujos automatizados con GitHub Actions para testing continuo, compilación y despliegue en entornos Linux.',
          tags: ['GitHub Actions', 'Docker', 'Linux'],
          category: 'DevOps',
          github: 'https://github.com/AndrewsB05',
          demo: '#',
        },
        {
          title: 'Servicios Backend & Cloud',
          description:
            'Diseño de APIs RESTful escalables con persistencia de datos relacional y no relacional, optimizadas para alta concurrencia.',
          tags: ['Python', 'PostgreSQL', 'Docker'],
          category: 'Cloud',
          github: 'https://github.com/AndrewsB05',
          demo: '#',
        },
      ],
    },
    footer: {
      status: 'Disponible para nuevas oportunidades',
      contactLabel: 'Escríbeme',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      cvLabel: 'Descargar CV',
      copyright: `© ${new Date().getFullYear()} Benjamin Droguett. Todos los derechos reservados.`,
      builtWith: 'Construido con Astro, Tailwind CSS y GSAP',
    },
    contact: {
      pageTitle: 'Contacto — AndrewsB',
      title: 'Hablemos',
      intro:
        '¿Tienes una oferta laboral, un proyecto o una idea para colaborar? Escríbeme y te respondo a tu email.',
      emailLabel: 'Tu email',
      emailHint: 'Solo lo uso para responderte.',
      nameLabel: 'Tu nombre',
      optional: '(opcional)',
      topicLabel: 'Motivo',
      topicPlaceholder: 'Elige una opción',
      topics: {
        job: 'Oferta laboral o entrevista',
        freelance: 'Proyecto freelance',
        collab: 'Colaboración',
        other: 'Otro tema',
      },
      messageLabel: 'Mensaje',
      messageHint: 'Entre 20 y 2.000 caracteres.',
      submit: 'Enviar mensaje',
      privacy:
        'Tu mensaje me llega por correo (vía Resend) y tu email solo se usa para responderte. No lo publico ni lo comparto.',
      doneTitle: '¡Gracias! Recibí tu mensaje.',
      doneText: 'Te responderé al email que indicaste lo antes posible.',
      back: 'Volver al portafolio',
      errors: {
        name: 'Máximo 80 caracteres.',
        email: 'Ingresa un email válido para poder responderte.',
        topic: 'Elige un motivo.',
        message: 'El mensaje debe tener entre 20 y 2.000 caracteres.',
      },
      alerts: {
        unavailable: 'El formulario de contacto no está disponible en este momento.',
        invalid: 'Revisa los campos marcados.',
        expired: 'El formulario expiró. Revisa tu mensaje y envíalo de nuevo.',
        insult: 'Mantengamos el respeto: el mensaje tiene palabras ofensivas.',
        tooManyLinks: 'Incluye como máximo 2 links.',
        gibberish: 'No entendí el mensaje. ¿Puedes escribirlo con más detalle?',
        shouting: 'Escribe el mensaje sin usar solo mayúsculas, por favor.',
        rateLimited: 'Enviaste varios mensajes seguidos. Espera unos minutos y vuelve a intentarlo.',
        error: 'No pude enviar el mensaje. Inténtalo de nuevo en unos minutos.',
      },
    },
  },

  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
    },
    hero: {
      badge: 'Available for new projects',
      title: "Hi, I'm Benjamin,",
      titleHighlight: 'Backend Solutions Specialist',
      subtitle:
        'Computer Science & Informatics Engineer focused on Back-end development, software architecture, and scalable system design.',
      cta1: 'View Projects',
      cta2: 'Get in Touch',
    },
    terminal: {
      line1: '$ whoami',
      line2: 'Benjamin Droguett — Computer Science & Informatics Engineer (Backend)',
      line3: '$ cat skills.json',
      line4: '{ "core": ["Node.js", ".NET", "Python", "APIs"], "infra": ["Docker", "Linux", "SQL"] }',
      line5: '$ curl -s http://localhost:8080/api/v1/gateway/status',
      line6: '[POST] /api/v1/auth 200 OK (8ms) · [GET] /api/v1/data 200 OK (Redis: 2ms)',
      line7: '✓ 99.99% Uptime · 0 exceptions · PostgreSQL & Docker: Ready',
      line8: '[✓] Backend Status: Operational · Available for new projects',
    },
    about: {
      sectionTitle: 'About Me',
      bioTitle: 'Who am I?',
      bioText:
        "I am Benjamin Droguett, a Computer Science and Informatics Engineering graduate. I'm passionate about Back-end development, software architecture design, and mastering modern technologies. My work approach is based on continuous study, meticulous observation of every requirement, and creating efficient solutions to complex problems.",
      philosophyTitle: 'My Goals & Philosophy',
      philosophyItems: [
        '🎯 Continuous learning and technical growth',
        '🔍 Rigorous observation and analysis for problem solving',
        '⚙️ Structured, maintainable, and scalable Back-end development',
        '💻 Coding in C#, JavaScript, Node.js, and Python',
        '🐧 Proficient in Linux environments and CLI',
      ],
      metricsTitle: 'Focus & Metrics',
      metrics: [
        { value: '100%', label: 'Commitment to clean code' },
        { value: '4+', label: 'Core programming languages' },
        { value: 'Linux', label: 'Primary development OS' },
        { value: 'Back-end', label: 'Area of specialization' },
      ],
      locationTitle: 'Location',
      locationText: 'Chile',
      locationAvailability: 'Available for projects, internships, and collaborations',
    },
    stack: {
      sectionTitle: 'Tech Stack',
      sectionSubtitle: 'Technologies and tools I code with and build solutions upon',
      categories: [
        {
          name: 'Programming Languages',
          items: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Java', 'C#'],
        },
        {
          name: 'Databases & APIs',
          items: ['APIs REST', 'SQL', 'MongoDB', 'Supabase'],
        },
        {
          name: 'Cloud, DevOps & Terminal',
          items: ['Docker', 'Git', 'GitHub', 'GCP', 'Azure', 'Manejo Terminal'],
        },
        {
          name: 'AI & Best Practices',
          items: ['Redes Neuronales', 'Modelos YOLO', 'Clean Code'],
        },
      ],
    },
    projects: {
      sectionTitle: 'Featured Projects',
      sectionSubtitle: 'Back-end development, APIs, and software architecture',
      filters: ['All', 'APIs', 'Cloud', 'DevOps'],
      items: [
        {
          title: 'Pokémon Chile Market Tracker',
          description:
            'Price comparison platform for sealed Pokémon TCG products in Chile: a polite scraper (robots.txt-aware, rate-limited) collects prices and stock from 26 stores, a matching engine groups listings into ~440 canonical products, and a REST API powers a site with search, filters and price history.',
          tags: ['Web Scraping', 'TypeScript', 'Node.js', 'Astro', 'PostgreSQL', 'Vercel'],
          category: 'APIs',
          github: '',
          demo: 'https://pokemon-chile-market-tracker.vercel.app/',
          image: 'pokemon-chile-market-tracker',
        },
        {
          title: 'Automation & CI/CD Pipeline',
          description:
            'Automated workflow setup with GitHub Actions for continuous testing, build, and deployment in Linux server environments.',
          tags: ['GitHub Actions', 'Docker', 'Linux'],
          category: 'DevOps',
          github: 'https://github.com/AndrewsB05',
          demo: '#',
        },
        {
          title: 'Backend & Cloud Services',
          description:
            'Scalable RESTful API design with relational and NoSQL database persistence, optimized for high concurrency.',
          tags: ['Python', 'PostgreSQL', 'Docker'],
          category: 'Cloud',
          github: 'https://github.com/AndrewsB05',
          demo: '#',
        },
      ],
    },
    footer: {
      status: 'Available for new opportunities',
      contactLabel: 'Message me',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      cvLabel: 'Download CV',
      copyright: `© ${new Date().getFullYear()} Benjamin Droguett. All rights reserved.`,
      builtWith: 'Built with Astro, Tailwind CSS & GSAP',
    },
    contact: {
      pageTitle: 'Contact — AndrewsB',
      title: "Let's talk",
      intro: 'Have a job offer, a project, or an idea to collaborate on? Send me a message and I will reply to your email.',
      emailLabel: 'Your email',
      emailHint: 'Only used to reply to you.',
      nameLabel: 'Your name',
      optional: '(optional)',
      topicLabel: 'Topic',
      topicPlaceholder: 'Choose an option',
      topics: {
        job: 'Job offer or interview',
        freelance: 'Freelance project',
        collab: 'Collaboration',
        other: 'Something else',
      },
      messageLabel: 'Message',
      messageHint: 'Between 20 and 2,000 characters.',
      submit: 'Send message',
      privacy:
        'Your message reaches me by email (via Resend) and your address is only used to reply. It is never published or shared.',
      doneTitle: 'Thanks! I got your message.',
      doneText: 'I will reply to the email you provided as soon as I can.',
      back: 'Back to portfolio',
      errors: {
        name: '80 characters max.',
        email: 'Enter a valid email so I can reply.',
        topic: 'Choose a topic.',
        message: 'The message must be between 20 and 2,000 characters.',
      },
      alerts: {
        unavailable: 'The contact form is not available right now.',
        invalid: 'Please check the highlighted fields.',
        expired: 'The form expired. Check your message and send it again.',
        insult: "Let's keep it respectful: the message contains offensive words.",
        tooManyLinks: 'Include 2 links at most.',
        gibberish: "I couldn't understand the message. Could you add more detail?",
        shouting: 'Please write the message without using only capital letters.',
        rateLimited: 'You sent several messages in a row. Wait a few minutes and try again.',
        error: "I couldn't send the message. Please try again in a few minutes.",
      },
    },
  },
};

/** Detect browser language, fallback to localStorage or 'es' */
export function detectLanguage(): Lang {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null;
    if (stored && (stored === 'es' || stored === 'en')) return stored;

    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'en' ? 'en' : 'es';
  }
  return 'es';
}

/** Get translation dictionary for a language */
export function getTranslation(lang: Lang): Translations {
  return translations[lang];
}

/** Apply translations to all elements with data-i18n attribute */
export function applyTranslations(lang: Lang): void {
  const t = translations[lang];
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('portfolio-lang', lang);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const value = key.split('.').reduce<unknown>((obj, k) => {
      if (obj && typeof obj === 'object' && k in obj) {
        return (obj as Record<string, unknown>)[k];
      }
      return undefined;
    }, t as unknown);

    if (typeof value === 'string') {
      el.textContent = value;
    }
  });

  // Dispatch event for components that need custom handling
  window.dispatchEvent(new CustomEvent('lang-change', { detail: { lang, translations: t } }));
}
