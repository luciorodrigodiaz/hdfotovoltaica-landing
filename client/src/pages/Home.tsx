import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Menu, X, Globe, Download, Shield, Sun, Building, Zap, Leaf, Loader2, 
  Layers, Users, Factory, Bus, Tractor, ChevronDown,
  Scale, Cloud, Timer, Award // <-- ÍCONO "Award" AGREGADO AQUÍ
} from "lucide-react";
import { toast } from "sonner";

/**
 * HD Fotovoltaica - UN STI Forum 2026 Edition
 * Internationalization Engine - COMPONENT UNIFICATION & SPACING OPTIMIZATION
 */

// Hook personalizado para detectar visibilidad (Intersection Observer)
const useOnScreen = (ref: React.RefObject<Element>, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // threshold de 0.5 significa que debe estar 50% visible para activarse
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold: 0.5 } 
    );
    observer.observe(ref.current);
    return () => { observer.disconnect(); };
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });

  // NUEVO: Estado para controlar qué tarjeta del Problema está abierta
  const [activeProblem, setActiveProblem] = useState<number | null>(1); 
  // NUEVO: Estado para controlar el acordeón de Innovación
  const [activeSolution, setActiveSolution] = useState<number | null>(1);

  // --- NUEVO BLOQUE: Lógica del Carrusel de Producto ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = useMemo(() => [
    "/product-innov-1.jpg", 
    "/product-innov-2.jpg", 
    "/product-innov-3.jpg"
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 7000); // Cambia de foto automáticamente cada 7 segundos
    return () => clearInterval(interval);
  }, [productImages]);
  // ---------------------------------------------------

  // Referencia para la sección de logos
  const logosRef = useRef<HTMLDivElement>(null);
  // Detectar si la sección está en pantalla
  const logosOnScreen = useOnScreen(logosRef, "-10% 0px"); // Margen de error para mobiles

// NUEVO: Referencia exclusiva para que los ODS se activen al scrollear
  const odsRef = useRef<HTMLDivElement>(null);
  const odsOnScreen = useOnScreen(odsRef, "-20% 0px"); // -20% hace que se active cuando llega bien al centro

  // Detección automática de idioma
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return navigator.language.startsWith("en") ? "EN" : "ES";
    }
    return "ES";
  });

  // Tu llave oficial para hdfotovoltaica@gmail.com
  const WEB3FORMS_ACCESS_KEY = "7d4a77ef-c085-48f6-9845-9fd4c85ee9b5";

  // Diccionario Completo de Traducciones con Métricas
  const t = useMemo(() => {
    const translations = {
      ES: {
        brandName: "Fotovoltaica",
        nav: ["El Problema", "Innovación", "Aplicaciones", "Contacto"],
        heroTag: "Foro CTI de la ONU - Nueva York 2026",
        heroTitle: "INFRAESTRUCTURA INTELIGENTE",
        heroTitleAccent: "",
        heroSubtitle: "Transformamos la industria y el agro en nodos de generación eléctrica rentable y eficiente.",
        heroBtnTech: "Descargar el Brochure Oficial",
        heroBtnLearn: "Conocer la Tecnología",
        
        trustBar: ["ODS 7: Energía Asequible", "ODS 9: Industria e Infraestructura", "ODS 11: Ciudades Sostenibles"],

        awardsTitle: "Reconocimiento Global e Impacto",
        metric1: "Unidades Instaladas",
        metric2: "Capacidad Instalada",
        metric3: "kg CO₂eq Evitados",
        metric4: "Familias y Empresas",
        
        // --- SECCIÓN: EL PROBLEMA (Versión Micro-Copy, TEXTO ACTUALIZADO) ---
        problemTag: "El Desafío Actual",
        problemTitle: "El Desafío",
        problemDesc: "Las soluciones convencionales de generación solar son pesadas, restrictivas y generan altas emisiones. HD Fotovoltaica resuelve tres barreras críticas:",
        prob1Title: "Restricción Estructural (Peso)",
        prob1Desc: "Solución 80% más ligera (3.5 kg/m²). Permite el despliegue inmediato sin costosos refuerzos de acero.",
        prob2Title: "Deuda de Carbono",
        prob2Desc: "Usamos polímeros reciclados en lugar de vidrio y aluminio, reduciendo 300 kg CO₂eq por metro lineal.",
        prob3Title: "Lentitud de Despliegue",
        prob3Desc: "Diseño estructural 'plug-and-play' que reduce drásticamente los tiempos de instalación y costos logísticos.",
        
        solutionTag: "Tecnología Base",
        solutionTitle: "La Innovación",
        solutionTitleAccent: "",
        solutionDesc: "Nuestra tecnología patentada permite construir y generar energía en un solo paso. A través de material compuesto (composite) de policarbonato o metálicas con integración fotovoltaica (BIPV), hemos creado un material híbrido que reemplaza a los materiales convencionales. Esta solución disruptiva no solo ofrece aislamiento y resistencia estructural, sino que transforma cualquier superficie en una matriz energética inteligente sin necesidad de añadir componentes externos.",
        appVideoCaption: "Hemos desarrollado una lámina multipropósito patentada que reemplaza a los materiales de construcción convencionales, integrando celdas fotovoltaicas directamente en el policarbonato.",
        sol1Title: "Generación Semitransparente",
        sol1Desc: "Permite hasta un 80% de transmisión de luz natural mientras captura la radiación solar para generar electricidad limpia.",
        sol2Title: "Ligereza y Resistencia",
        sol2Desc: "Extremadamente ligero (solo 3.5 kg/m²) y flexible. Resiste altos impactos y clima severo, superando ampliamente al vidrio tradicional.",
        sol3Title: "Integración Arquitectónica",
        sol3Desc: "Diseño versátil que se adapta a fachadas, claraboyas y techos industriales, eliminando la necesidad de estructuras de montaje adicionales.",
        
        appTag: "Casos de Uso",
        appTitle: "Aplicaciones",
        appDesc: "Nuestra tecnología está diseñada para adaptarse a los sectores que más requieren eficiencia espacial y energética.",
        app1: "Claraboyas y Techos de Fábricas / Puertos",
        app2: "Paradas de Transporte Público Inteligente",
        app3: "Invernaderos Agrícolas (Agrivoltaica)",
        app4: "Fachadas de Edificios Comerciales",

        contactTag: "Descarga Inmediata",
        contactTitle: "Descarga el Brochure Oficial",
        contactDesc: "Completa el formulario para descargar nuestro brochure oficial. Descubre cómo nuestra tecnología reduce la huella de carbono, conoce nuestras métricas de impacto y explora los reconocimientos globales.",
        contactList1: "Reducción de huella de carbono",
        contactList2: "Métricas de impacto climático y social",
        contactList3: "Premios y reconocimientos globales",
        
        formLabelName: "Nombre Completo",
        formPlaceholderName: "Ej. Laura Gómez",
        formLabelOrg: "Organización / Empresa",
        formPlaceholderOrg: "Nombre de tu entidad",
        formBtn: "Descargar Brochure PDF",
        formProcessing: "Procesando...",
        formDisclaimer: "Al descargar, aceptas nuestra política de privacidad.",
        
        footerCompanyDesc: "Transformando la infraestructura urbana con innovación solar semitransparente.",
        footerHQTitle: "Sede Central",
        footerHQDesc: "Diseñado e impulsado desde la Ciudad Autónoma de Buenos Aires (CABA), Argentina para el mundo.",
        footerRights: "© 2026 HD Fotovoltaica. Todos los derechos reservados.",
        
        toastLang: "Idioma cambiado a Inglés",
        toastSuccess: "¡Registro exitoso! Descargando brochure...",
        toastErrorFill: "Por favor, completa todos los campos.",
        toastErrorNet: "Error al enviar. Intenta nuevamente.",
        brochurePath: "/brochure-es.pdf"
      },
      EN: {
        brandName: "Photovoltaics",
        nav: ["The Problem", "Innovation", "Applications", "Contact"],
        heroTag: "UN STI Forum - New York 2026",
        heroTitle: "SMART INFRASTRUCTURES",
        heroTitleAccent: "", 
        heroSubtitle: "Transforming industry and agriculture into profitable and efficient nodes of power generation.",
        heroBtnTech: "Download the Official Brochure",
        heroBtnLearn: "Discover the Technology",
        
        trustBar: ["SDG 7: Affordable Energy", "SDG 9: Industry & Infrastructure", "SDG 11: Sustainable Cities"],

        awardsTitle: "Global Recognition & Impact",
        metric1: "Units Installed",
        metric2: "Capacity Installed",
        metric3: "kg CO₂eq Avoided",
        metric4: "Families & Businesses",

        // --- SECCIÓN: EL PROBLEMA (Versión Micro-Copy EN INGLÉS, TEXTO ACTUALIZADO) ---
        problemTag: "The Current Challenge",
        problemTitle: "The Challenge",
        problemDesc: "Conventional solar generation solutions are heavy, restrictive, and generate high emissions. HD Photovoltaics solves three critical barriers:",
        prob1Title: "Structural Restriction (Weight)",
        prob1Desc: "80% lighter solution (3.5 kg/m²). Allows immediate deployment without costly steel reinforcements.",
        prob2Title: "Carbon Debt",
        prob2Desc: "We use recycled polymers instead of glass and aluminum, reducing 300 kg CO₂eq per linear meter.",
        prob3Title: "Slow Deployment",
        prob3Desc: "'Plug-and-play' structural design that drastically reduces installation times and logistical costs.",
        
        solutionTag: "Core Technology",
        solutionTitle: "The Innovation",
        solutionTitleAccent: "",
        solutionDesc: "Our patented technology allows you to build and generate energy in a single step. Through composite materials of polycarbonate or metal with building-integrated photovoltaics (BIPV), we have created a hybrid material that replaces conventional ones. This disruptive solution not only offers insulation and structural resistance but also transforms any surface into a smart energy matrix without the need for external components.",
        appVideoCaption: "We have developed a proprietary, custom-designed BIPV solution that simplifies installation by eliminating traditional mounting infrastructure.",
        sol1Title: "Semi-transparent Generation",
        sol1Desc: "Allows up to 80% of natural light transmission while capturing solar radiation to generate clean electricity.",
        sol2Title: "Lightness and Resistance",
        sol2Desc: "Extremely lightweight (only 3.5 kg/m²) and flexible. Resists high impacts and severe weather, vastly outperforming traditional glass.",
        sol3Title: "Architectural Integration",
        sol3Desc: "Versatile design that adapts to facades, skylights, and industrial roofs, eliminating the need for additional mounting structures.",
        
        appTag: "Use Cases",
        appTitle: "Applications",
        appDesc: "Our technology is designed to adapt to the sectors that most require spatial and energetic efficiency.",
        app1: "Skylights and Factory / Port Roofs",
        app2: "Smart Public Transport Stops",
        app3: "Agricultural Greenhouses (Agrivoltaics)",
        app4: "Commercial Building Facades",

        contactTag: "Instant Download",
        contactTitle: "Download the Official Brochure",
        contactDesc: "Complete the form to download our official brochure. Discover how our technology reduces the carbon footprint, review our impact metrics, and explore the global recognitions.",
        contactList1: "Carbon footprint reduction",
        contactList2: "Climate & social impact metrics",
        contactList3: "Global awards and recognitions",
        
        formLabelName: "Full Name",
        formPlaceholderName: "e.g. Laura Gomez",
        formLabelOrg: "Organization / Company",
        formPlaceholderOrg: "Your entity's name",
        formBtn: "Download PDF Brochure",
        formProcessing: "Processing...",
        formDisclaimer: "By downloading, you accept our privacy policy.",
        
        footerCompanyDesc: "Transforming urban infrastructure with semi-transparent solar innovation.",
        footerHQTitle: "Headquarters",
        footerHQDesc: "Designed and driven from Buenos Aires (CABA), Argentina to the world.",
        footerRights: "© 2026 HD Photovoltaics. All rights reserved.",
        
        toastLang: "Language changed to Spanish",
        toastSuccess: "Successful registration! Downloading brochure...",
        toastErrorFill: "Please fill in all required fields.",
        toastErrorNet: "Submission error. Please try again.",
        brochurePath: "/brochure-en.pdf"
      }
    };
    return translations[language as keyof typeof translations];
  }, [language]);

  const handleLanguageToggle = () => {
    setLanguage(language === "ES" ? "EN" : "ES");
    toast.info(t.toastLang);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.organization) {
      setIsSubmitting(true);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Lead ONU (${language}) - ${formData.organization}`,
            from_name: "HD Fotovoltaica Web",
            Nombre: formData.name,
            Email: formData.email,
            Organizacion: formData.organization,
          }),
        });
        const result = await response.json();
        if (result.success) {
          toast.success(t.toastSuccess);
          window.open(t.brochurePath, "_blank");
          setFormData({ name: "", email: "", organization: "" });
        } else {
          toast.error(t.toastErrorNet);
        }
      } catch (error) {
        toast.error(t.toastErrorNet);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error(t.toastErrorFill);
    }
  };

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false); // Cierra el menú en móviles automáticamente al hacer clic
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-accent/30">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container flex items-center justify-between py-4">
          
          {/* LOGO CLICKABLE: Te lleva al inicio de forma suave */}
          <button onClick={scrollToTop} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-8 w-auto" />
            <span className="font-bold text-lg hidden sm:inline tracking-wide text-gray-900">{t.brandName}</span>
          </button>

          {/* NAVEGACIÓN DESKTOP: Deslizamiento suave y color CleanTech */}
          <nav className="hidden md:flex items-center gap-8">
            {t.nav.map((item, i) => {
              const sectionId = ["problem", "solution", "applications", "contact"][i];
              return (
                <a 
                  key={i} 
                  href={`#${sectionId}`} 
                  onClick={(e) => scrollToSection(e, sectionId)}
                  className="text-sm hover:text-emerald-600 transition-smooth font-medium text-gray-700"
                >
                  {item}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Mapeo de Color Nav: accent -> Neutral Corporate */}
            <button onClick={handleLanguageToggle} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-border hover:bg-emerald-50 transition-smooth">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-700">{language}</span>
            </button>
            <Button onClick={scrollToContact} className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" size="sm">
              <Download className="w-4 h-4" />
              <span>{language === "ES" ? "Brochure" : "Brochure"}</span>
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-emerald-50 rounded transition-smooth">
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-700" /> : <Menu className="w-5 h-5 text-emerald-700" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-white shadow-lg absolute w-full left-0">
            <div className="container py-4 flex flex-col gap-4">
               {t.nav.map((item, i) => {
                 const sectionId = ["problem", "solution", "applications", "contact"][i];
                 return (
                  <a 
                    key={i} 
                    href={`#${sectionId}`} 
                    onClick={(e) => scrollToSection(e, sectionId)} 
                    className="text-sm hover:text-emerald-600 font-medium text-gray-700 py-2"
                  >
                    {item}
                  </a>
                 );
               })}
            </div>
          </nav>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-white" style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hero-brushstrokes-arcs-UusSkKShgANrGwL4KjVLTM.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
        {/* Capa de Transición: Fusión suave hacia el blanco de la siguiente sección */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-56 bg-gradient-to-t from-white to-transparent z-0 pointer-events-none"></div>

        <div className="relative z-10 container text-center max-w-4xl px-4 mt-[-5vh]">
          {/* Mapeo de Color Hero: Burbuja con borde emerald-700 y más margen inferior (mb-16) */}
          <div className="inline-block mb-16 px-4 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-700 text-emerald-800 font-bold text-sm shadow-sm">
            {t.heroTag}
          </div>
          
          {/* Título rebalanceado con más espacio inferior (mb-16) */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-16 leading-tight tracking-tight text-emerald-950 selection:bg-emerald-200">
            {t.heroTitle}
          </h1>
          
          {/* Cambia text-xl md:text-2xl por text-2xl md:text-3xl para probar el impacto */}
          <p className="text-2xl md:text-3xl mb-10 text-emerald-900 max-w-3xl mx-auto font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToContact} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 rounded-lg shadow-lg">
              {t.heroBtnTech}
            </Button>
            <Button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} variant="outline" className="border-black text-black hover:bg-black/5 font-semibold px-8 py-6 rounded-lg transition-smooth">
              {t.heroBtnLearn}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL RECOGNITION & METRICS (IMPACT & OFFICIAL LOGOS) ===== */}
      {/* Cambia py-24 por pt-10 pb-24 (o pt-4 si lo quieres aún más pegado) */}
      <section ref={logosRef} className="bg-white pt-10 pb-24 mb-12 border-b border-border relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            {/* Título igualado en color al Hero (text-emerald-950) */}
            <h3 className="text-xl md:text-2xl font-bold text-emerald-950 uppercase tracking-widest mb-12">
              {t.awardsTitle}
            </h3>

            {/* Logos Oficiales con filtros de saturación y contraste */}
            <div className={`flex flex-wrap justify-center items-center gap-x-14 gap-y-10 max-w-6xl mx-auto transition-all duration-1000 ${logosOnScreen ? "grayscale-0 opacity-100" : "grayscale opacity-80"}`}>
              
              {/* Logo UNIDO */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UNIDO_Logo.svg" 
                alt="UNIDO Global Call Winner" 
                className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform saturate-150 contrast-125"
                loading="lazy"
              />
              
              {/* Logo IRENA */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f6/International_Renewable_Energy_Agency_Logo.png" 
                alt="IRENA NewGen COP28 Award" 
                className="h-14 md:h-16 w-auto object-contain hover:scale-110 transition-transform saturate-150 contrast-125"
                loading="lazy"
              />
              
              {/* Logo COP28 UAE */}
              <img 
                src="/logo-cop28.png" 
                alt="COP28 Technology Presentation" 
                className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform saturate-150 contrast-125"
                loading="lazy"
              />

              {/* Logo Enel Foundation */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/22/Enel_Group_logo.svg" 
                alt="Enel Foundation Supported" 
                className="h-10 md:h-14 w-auto object-contain hover:scale-110 transition-transform saturate-150 contrast-125"
                loading="lazy"
              />

              {/* Logo IUCN */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/IUCN_logo.svg" 
                alt="IUCN Member / Partner" 
                className="h-14 md:h-16 w-auto object-contain hover:scale-110 transition-transform saturate-150 contrast-125"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Contadores de Impacto con Íconos Mapeados a Color */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-border/50 pt-10 mt-8">
            <div className="flex flex-col items-center justify-center">
              <Layers className="w-8 h-8 text-emerald-900 mb-3 hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-black text-emerald-950 mb-1 hover:scale-110 transition-transform">254</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{t.metric1}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Zap className="w-8 h-8 text-orange-500 mb-3 hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-black text-orange-600 mb-1 hover:scale-110 transition-transform">48.7<span className="text-2xl">kW</span></div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{t.metric2}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Leaf className="w-8 h-8 text-green-600 mb-3 hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-black text-green-700 mb-1 hover:scale-110 transition-transform">+115<span className="text-2xl">k</span></div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{t.metric3}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Users className="w-8 h-8 text-blue-600 mb-3 hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl md:text-4xl font-black text-blue-700 mb-1 hover:scale-110 transition-transform">+25</div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{t.metric4}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM (Diseño Asimétrico Editorial + Acordeón) ===== */}
      <section id="problem" className="py-20 md:py-32 bg-gray-50/50 relative z-10 border-t border-gray-100">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Columna Izquierda: Título Fijo (Sticky) con Diseño Editorial */}
            <div className="md:col-span-5 md:sticky md:top-32">
              
              {/* Título Masivo Arriba */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-none tracking-tighter text-emerald-950">
                {t.problemTitle}
              </h2>

              {/* Globo (Tag) actualizado: estilo simétrico a Innovación con acento Emerald */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 font-bold text-[10px] mb-8 tracking-widest uppercase shadow-sm">
                {t.problemTag}
              </div>
              
              {/* Línea de acento para darle "cuerpo" al diseño */}
              <div className="w-16 h-1.5 bg-emerald-600 rounded-full mb-8"></div>
              
              {/* Texto descriptivo con mayor tamaño y peso */}
              <p className="text-xl md:text-2xl text-emerald-900/80 font-medium leading-relaxed">
                {t.problemDesc}
              </p>
            </div>
            
            {/* Columna Derecha: Acordeón Interactivo de Tarjetas con Numeración y Hover */}
            <div className="md:col-span-7 space-y-5 mt-8 md:mt-0">
              
              {/* Tarjeta 1: Peso */}
              <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeProblem === 1 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                <button 
                  onMouseEnter={() => setActiveProblem(1)}
                  onClick={() => setActiveProblem(activeProblem === 1 ? null : 1)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeProblem === 1 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                      <Scale className="w-7 h-7" />
                    </div>
                    <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeProblem === 1 ? 'text-emerald-950' : 'text-gray-600'}`}>
                      {t.prob1Title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeProblem === 1 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeProblem === 1 ? 'max-h-48 opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                    {t.prob1Desc}
                  </p>
                </div>
              </div>

              {/* Tarjeta 2: Carbono */}
              <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeProblem === 2 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                <button 
                  onMouseEnter={() => setActiveProblem(2)}
                  onClick={() => setActiveProblem(activeProblem === 2 ? null : 2)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeProblem === 2 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                      <Cloud className="w-7 h-7" />
                    </div>
                    <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeProblem === 2 ? 'text-emerald-950' : 'text-gray-600'}`}>
                      {t.prob2Title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeProblem === 2 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeProblem === 2 ? 'max-h-48 opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                    {t.prob2Desc}
                  </p>
                </div>
              </div>

              {/* Tarjeta 3: Velocidad */}
              <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeProblem === 3 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                <button 
                  onMouseEnter={() => setActiveProblem(3)}
                  onClick={() => setActiveProblem(activeProblem === 3 ? null : 3)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeProblem === 3 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                      <Timer className="w-7 h-7" />
                    </div>
                    <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeProblem === 3 ? 'text-emerald-950' : 'text-gray-600'}`}>
                      {t.prob3Title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeProblem === 3 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                </button>
                <div className={`transition-all duration-500 ease-in-out ${activeProblem === 3 ? 'max-h-48 opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                    {t.prob3Desc}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== INNOVATION / SOLUTION (Versión Refinada con 3 Tarjetas) ===== */}
      <section id="solution" className="py-24 bg-secondary/30 relative z-0 border-y border-emerald-100">
        <div className="container max-w-7xl mx-auto">
          {/* Elemento de acento visual sutil (cuadrícula técnica) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
            
            {/* Columna de Texto: Título Gigante + Línea + Acordeón Conectado */}
            <div className="md:col-span-7 md:sticky md:top-32">
              
              {/* Título Masivo Arriba */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-none tracking-tighter text-emerald-950">
                {t.solutionTitle}<span className="text-emerald-600">{t.solutionTitleAccent}</span>
              </h2>

              {/* Globo (Tag) debajo del título */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 font-bold text-[10px] mb-8 tracking-widest uppercase shadow-sm">
                {t.solutionTag}
              </div>

              {/* Línea de acento simétrica */}
              <div className="w-16 h-1.5 bg-emerald-600 rounded-full mb-8"></div>

              {/* Texto descriptivo con mayor tamaño y peso */}
              <p className="text-xl md:text-2xl text-emerald-900/80 font-medium leading-relaxed mb-10 max-w-2xl">
                {t.solutionDesc}
              </p>
              
              {/* Contenedor del Acordeón de Innovación Unificado y con Hover */}
              <div className="space-y-5">
                
                {/* Tarjeta 1: Generación */}
                <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeSolution === 1 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                  <button 
                    onMouseEnter={() => setActiveSolution(1)}
                    onClick={() => setActiveSolution(activeSolution === 1 ? null : 1)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeSolution === 1 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                        <Sun className="w-7 h-7" />
                      </div>
                      <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeSolution === 1 ? 'text-emerald-950' : 'text-gray-600'}`}>
                        {t.sol1Title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeSolution === 1 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${activeSolution === 1 ? 'max-h-48 opacity-100 pb-6 px-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                      {t.sol1Desc}
                    </p>
                  </div>
                </div>
                
                {/* Tarjeta 2: Ligereza */}
                <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeSolution === 2 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                  <button 
                    onMouseEnter={() => setActiveSolution(2)}
                    onClick={() => setActiveSolution(activeSolution === 2 ? null : 2)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeSolution === 2 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                        <Shield className="w-7 h-7" />
                      </div>
                      <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeSolution === 2 ? 'text-emerald-950' : 'text-gray-600'}`}>
                        {t.sol2Title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeSolution === 2 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${activeSolution === 2 ? 'max-h-48 opacity-100 pb-6 px-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                      {t.sol2Desc}
                    </p>
                  </div>
                </div>

                {/* Tarjeta 3: Integración */}
                <div className={`bg-white rounded-2xl transition-all duration-400 overflow-hidden ${activeSolution === 3 ? 'border border-emerald-100 border-l-8 border-l-emerald-600 shadow-2xl shadow-emerald-900/10 scale-[1.02] -ml-2' : 'border border-gray-200 border-l-4 border-l-transparent hover:border-emerald-200 shadow-sm hover:shadow-md'}`}>
                  <button 
                    onMouseEnter={() => setActiveSolution(3)}
                    onClick={() => setActiveSolution(activeSolution === 3 ? null : 3)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${activeSolution === 3 ? 'bg-emerald-600 text-white shadow-inner' : 'bg-gray-50 border border-gray-100 text-gray-400'}`}>
                        <Building className="w-7 h-7" />
                      </div>
                      <h3 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${activeSolution === 3 ? 'text-emerald-950' : 'text-gray-600'}`}>
                        {t.sol3Title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 transform transition-transform duration-500 ${activeSolution === 3 ? 'rotate-180 text-emerald-600' : 'text-gray-300'}`} />
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${activeSolution === 3 ? 'max-h-48 opacity-100 pb-6 px-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-lg text-emerald-900/70 font-medium leading-relaxed md:pl-[76px]">
                      {t.sol3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna de Imagen y ODS: Bajada al nivel del párrafo */}
            <div className="md:col-span-5 flex flex-col items-center justify-center gap-12 pt-12 md:pt-0 md:mt-[210px] lg:mt-[220px]">
              {/* Carrusel Dinámico Minimalista con Navegación Táctil */}
              <div className="relative w-full max-w-sm aspect-[4/5] group">
                <div className="absolute -inset-4 bg-emerald-100/40 rounded-[3rem] blur-2xl -z-10 transition-all duration-500 group-hover:bg-emerald-200/60"></div>
                
                {/* Mapeo de las 4 imágenes superpuestas */}
                {productImages.map((src, idx) => (
                  <img 
                    key={src}
                    src={src} 
                    alt={`Panel HD Fotovoltaica - Detalle ${idx + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white p-2 bg-white/50 backdrop-blur-sm transition-opacity duration-1000 ease-in-out ${currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
                  />
                ))}

                {/* Zonas de clic transparentes (Izquierda y Derecha) */}
                <button 
                  onClick={() => setCurrentImageIndex((prev) => prev === 0 ? productImages.length - 1 : prev - 1)}
                  className="absolute top-0 left-0 w-1/3 h-full z-20 flex items-center justify-start px-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                  aria-label="Imagen anterior"
                >
                  <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-md">
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </div>
                </button>

                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % productImages.length)}
                  className="absolute top-0 right-0 w-1/3 h-full z-20 flex items-center justify-end px-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                  aria-label="Siguiente imagen"
                >
                  <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shadow-md">
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </div>
                </button>

                {/* Controles: Indicadores de Puntos Inferiores */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {productImages.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={(e) => {
                        e.stopPropagation(); // Evita clics duplicados
                        setCurrentImageIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 shadow-sm relative z-30 ${currentImageIndex === idx ? 'bg-emerald-600 w-6' : 'bg-white hover:bg-emerald-200 w-2'}`}
                      aria-label={`Ver imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* ODS UNIFICADOS */}
              <div ref={odsRef} className={`w-full flex flex-wrap items-center justify-center gap-6 border-t border-gray-200/60 pt-10 transition-all duration-1000 ${odsOnScreen ? "grayscale-0 opacity-100 scale-100" : "grayscale opacity-50 scale-95"}`}>
                <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg" alt="SDG 7" className="w-16 md:w-20 h-auto rounded-lg shadow-md hover:scale-110 transition-all" />
                <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg" alt="SDG 9" className="w-16 md:w-20 h-auto rounded-lg shadow-md hover:scale-110 transition-all" />
                <img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg" alt="SDG 11" className="w-16 md:w-20 h-auto rounded-lg shadow-md hover:scale-110 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS (Patrón Z y Feature Rows) ===== */}
      <section id="applications" className="py-20 md:py-32 bg-white relative z-10">
        <div className="container max-w-7xl mx-auto">
          {/* Cambié items-center a items-start para que ambas columnas comiencen desde arriba */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Columna Izquierda: Galería Vertical de Videos y Caption */}
            <div className="order-2 md:order-1 flex flex-col justify-start items-center md:items-end gap-8">
              
              {/* Contenedor del Video 1 */}
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-emerald-100/60 rounded-[3rem] blur-xl -z-10 transition-all duration-500"></div>
                <video 
                  src="/render-1.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full object-cover rounded-3xl shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-emerald-900/20 duration-500 relative z-10 aspect-video" 
                />
              </div>

              {/* Texto de Caption actuando como separador central */}
              <p className="w-full max-w-lg text-emerald-900/70 text-[15px] font-medium leading-relaxed text-center px-4 md:px-2">
                {t.appVideoCaption}
              </p>

              {/* Contenedor del Video 2 */}
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-emerald-100/60 rounded-[3rem] blur-xl -z-10 transition-all duration-500 delay-100"></div>
                <video 
                  src="/render-2.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full object-cover rounded-3xl shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-emerald-900/20 duration-500 relative z-10 aspect-video" 
                />
              </div>
              
            </div>

            {/* Columna Derecha: Contenido y Filas Interactivas */}
            <div className="order-1 md:order-2 md:sticky md:top-32">
              
              {/* Título Masivo recuperado */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-none tracking-tighter text-emerald-950">
                {t.appTitle}
              </h2>

              {/* Globo (Tag) debajo del título */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[10px] mb-8 tracking-widest uppercase shadow-sm">
                {t.appTag}
              </div>
              
              {/* Línea de acento */}
              <div className="w-16 h-1.5 bg-emerald-600 rounded-full mb-8"></div>

              {/* Texto descriptivo */}
              <p className="text-xl text-emerald-900/80 font-medium mb-10 leading-relaxed max-w-xl">
                {t.appDesc}
              </p>
              
              <div className="space-y-4">
                {/* Aplicación 1: Fábricas */}
                <div className="group flex items-center gap-5 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Factory className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-emerald-950 transition-colors">{t.app1}</span>
                </div>

                {/* Aplicación 2: Transporte Público */}
                <div className="group flex items-center gap-5 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Bus className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-emerald-950 transition-colors">{t.app2}</span>
                </div>

                {/* Aplicación 3: Agrivoltaica */}
                <div className="group flex items-center gap-5 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Tractor className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-emerald-950 transition-colors">{t.app3}</span>
                </div>

                {/* Aplicación 4: Comercial */}
                <div className="group flex items-center gap-5 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Building className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-emerald-950 transition-colors">{t.app4}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / DOWNLOAD ===== */}
      <section id="contact" className="py-16 md:py-24 bg-emerald-950 text-white border-t border-emerald-900 relative z-10">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 font-semibold text-xs mb-6 border border-emerald-800">
              <Download className="w-3 h-3" /> {t.contactTag}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t.contactTitle}</h2>
            <p className="text-emerald-300 mb-8 leading-relaxed">{t.contactDesc}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Cloud className="w-5 h-5 text-orange-500" /> {t.contactList1}</div>
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Users className="w-5 h-5 text-orange-500" /> {t.contactList2}</div>
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Award className="w-5 h-5 text-orange-500" /> {t.contactList3}</div>
            </div>
          </div>
          <div className="bg-white text-foreground p-8 rounded-2xl shadow-xl border border-white/10">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5">{t.formLabelName}</label>
                <Input name="name" placeholder={t.formPlaceholderName} value={formData.name} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Email</label>
                <Input name="email" type="email" placeholder="email@empresa.com" value={formData.email} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-emerald-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">{t.formLabelOrg}</label>
                <Input name="organization" placeholder={t.formPlaceholderOrg} value={formData.organization} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-emerald-600" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-emerald-200/20 transition-smooth">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.formProcessing}</> : <><Download className="w-5 h-5 mr-2" />{t.formBtn}</>}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">{t.formDisclaimer}</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-white py-12 relative z-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-8 w-auto opacity-90" />
                <span className="font-bold text-xl tracking-wide">{t.brandName}</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">{t.footerCompanyDesc}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">{t.footerHQTitle}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{t.footerHQDesc}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Contacto</h4>
              {/* Mapeo de Color Mail: accent -> Emerald CleanTech */}
              <a href="mailto:hdfotovoltaica@gmail.com" className="text-sm text-gray-400 mb-2 hover:text-emerald-500 transition-smooth block">
                hdfotovoltaica@gmail.com
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}