<div align="center">

# 🚀 Benjamin Droguett — Developer Portfolio

**Portafolio profesional de Ingeniería de Software & Desarrollo Back-end**  
Construido con un enfoque en rendimiento, arquitectura limpia y diseño moderno.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-Enabled-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io)

[English](#-english-summary) • [Características](#-características-principales) • [Estructura](#-estructura-del-proyecto) • [Instalación](#-instalación-y-desarrollo)

</div>

---

## 📋 Descripción

Este proyecto es el portafolio web personal de **Benjamin Droguett** (Estudiante de Ingeniería Civil en Computación e Informática). Diseñado para destacar competencias en desarrollo back-end, diseño de APIs, arquitectura de software, fundamentos de computación (.NET, C#, Node.js, Python, Linux) y buenas prácticas de ingeniería.

---

## ✨ Características Principales

- 🌐 **Soporte Bilingüe (i18n):** Cambio dinámico e instantáneo entre Español e Inglés con detección automática y persistencia en `localStorage`.
- ⚡ **Rendimiento Ultrarrápido:** Generación de sitios estáticos optimizada con Astro y estilos de última generación con Tailwind CSS v4.
- 💻 **Terminal Interactiva en Hero:** Componente visual interactivo que simula una consola CLI con comandos técnicos y estado del desarrollador.
- 🎯 **Showcase de Proyectos Filtrable:** Visualización de proyectos por categorías (Full-Stack, Backend, APIs, etc.) con enlaces a repositorios y demostraciones en vivo.
- 🛠️ **Stack Tecnológico Categorizado:** Organización de tecnologías por Lenguajes, Backend & Frameworks, Bases de Datos, Cloud y Herramientas.
- 🎭 **Micro-interacciones y Animaciones Fluidas:** Integración con GSAP para transiciones de scroll y efectos hover cuidados.
- 📱 **Diseño 100% Responsivo:** Adaptado minuciosamente para dispositivos móviles, tablets y monitores de escritorio con estética Dark Mode elegante.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| [**Astro**](https://astro.build/) | Framework web moderno orientado a contenido y velocidad con cero JS innecesario por defecto. |
| [**Tailwind CSS v4**](https://tailwindcss.com/) | Motor de estilos de alto rendimiento mediante `@tailwindcss/vite`. |
| [**GSAP (GreenSock)**](https://greensock.com/) | Biblioteca de animaciones para transiciones fluidas y micro-interacciones. |
| [**TypeScript**](https://www.typescriptlang.org/) | Tipado estático para la lógica del cliente y el sistema de traducciones. |
| [**pnpm**](https://pnpm.io/) | Gestor de paquetes rápido y eficiente en disco. |

---

## 📂 Estructura del Proyecto

```text
portafolio/
├── public/                 # Recursos estáticos (imágenes, favicon, etc.)
├── src/
│   ├── components/         # Componentes modulares Astro
│   │   ├── Header.astro    # Barra de navegación con selector de idioma
│   │   ├── Hero.astro      # Sección principal con terminal interactiva
│   │   ├── About.astro     # Biografía, principios y métricas clave
│   │   ├── TechStack.astro # Stack técnico categorizado
│   │   ├── Projects.astro  # Galería de proyectos con filtros
│   │   └── Footer.astro    # Canales de contacto y estado
│   ├── i18n/
│   │   └── translations.ts # Diccionario bilingüe (ES / EN) y lógica i18n
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla base HTML, metadatos SEO y tipografía
│   ├── pages/
│   │   └── index.astro     # Página de inicio principal
│   └── styles/
│       └── global.css      # Estilos globales y tokens de diseño
├── AGENTS.md / CLAUDE.md   # Instrucciones y directrices para agentes IA
├── astro.config.mjs        # Configuración de Astro y plugins
└── package.json            # Scripts y dependencias del proyecto
```

---

## 🚀 Instalación y Desarrollo

### Requisitos Previos

- **Node.js**: Versión `>= 22.12.0`
- **pnpm**: Recomendado (`npm install -g pnpm`)

### Pasos para Ejecutar Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/portafolio.git
   cd portafolio
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   El sitio estará disponible en [http://localhost:4321](http://localhost:4321).

4. **Compilar para producción:**
   ```bash
   pnpm build
   ```

5. **Previsualizar la compilación de producción:**
   ```bash
   pnpm preview
   ```

---

## 🌍 English Summary

**Benjamin Droguett's Developer Portfolio** is a high-performance personal portfolio built with **Astro**, **Tailwind CSS v4**, **GSAP**, and **TypeScript**. It features full bilingual internationalization (ES/EN), an interactive terminal showcase, a filterable projects catalog, a categorized tech stack, and responsive dark-mode styling tailored for technical recruiters and engineering managers.

---

<div align="center">
  <sub>Diseñado y desarrollado con precisión técnica por Benjamin Droguett.</sub>
</div>
