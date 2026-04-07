import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Globe, Download, Shield, Sun, Building, Zap, Leaf, Loader2, Layers, Users } from "lucide-react";
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
        heroBtnTech: "Acceder a la Documentación Técnica",
        heroBtnLearn: "Conocer la Tecnología",
        
        trustBar: ["ODS 7: Energía Asequible", "ODS 9: Industria e Infraestructura", "ODS 11: Ciudades Sostenibles"],

        awardsTitle: "Reconocimiento Global e Impacto",
        metric1: "Unidades Instaladas",
        metric2: "Capacidad Installed",
        metric3: "kg CO₂eq Avoided",
        metric4: "Families & Businesses",
        
        // --- SECCIÓN: EL PROBLEMA (Versión Micro-Copy) ---
        problemTitle: "La 'Brecha de Hardware' Energética",
        problemDesc: "Los paneles solares tradicionales son pesados, restrictivos y generan altas emisiones. HD Fotovoltaica resuelve tres barreras críticas:",
        prob1Title: "Restricción Estructural (Peso)",
        prob1Desc: "Solución 80% más ligera (3.5 kg/m²). Permite el despliegue inmediato sin costosos refuerzos de acero.",
        prob2Title: "Deuda de Carbono",
        prob2Desc: "Usamos polímeros reciclados en lugar de vidrio y aluminio, reduciendo 300 kg CO₂eq por metro lineal.",
        prob3Title: "Lentitud de Despliegue",
        prob3Desc: "Diseño estructural 'plug-and-play' que reduce drásticamente los tiempos de instalación y costos logísticos.",
        
        solutionTitle: "La Innovación: ",
        solutionTitleAccent: "Policarbonato Solar Semitransparente",
        solutionDesc: "Hemos desarrollado una lámina multipropósito patentada que reemplaza a los materiales de construcción convencionales, integrando celdas fotovoltaicas directamente en el policarbonato.",
        sol1Title: "Generación Semitransparente",
        sol1Desc: "Permite hasta un 80% de transmisión de luz natural mientras captura la radiación solar para generar electricidad limpia.",
        sol2Title: "Ligereza y Resistencia",
        sol2Desc: "Extremadamente ligero (solo 3.5 kg/m²) y flexible. Resiste altos impactos y clima severo, superando ampliamente al vidrio tradicional.",
        
        appTitle: "Aplicaciones Estratégicas",
        appDesc: "Nuestra tecnología está diseñada para adaptarse a los sectores que más requieren eficiencia espacial y energética.",
        app1: "Claraboyas y Techos de Fábricas / Puertos",
        app2: "Paradas de Transporte Público Inteligente",
        app3: "Invernaderos Agrícolas (Agrivoltaica)",
        app4: "Fachadas de Edificios Comerciales",

        contactTag: "Descarga Inmediata",
        contactTitle: "Accede a la Documentación Técnica",
        contactDesc: "Completa el formulario para descargar nuestro brochure oficial. Descubre las especificaciones técnicas, métricas de rendimiento y detalles de integración de nuestra tecnología presentado en el Foro CTI de la ONU.",
        contactList1: "Fichas técnicas de rendimiento",
        contactList2: "Certificaciones de resistencia",
        contactList3: "Guía de integración arquitectónica",
        
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
        heroBtnTech: "Access Technical Documentation",
        heroBtnLearn: "Discover the Technology",
        
        trustBar: ["SDG 7: Affordable Energy", "SDG 9: Industry & Infrastructure", "SDG 11: Sustainable Cities"],

        awardsTitle: "Global Recognition & Impact",
        metric1: "Units Installed",
        metric2: "Capacity Installed",
        metric3: "kg CO₂eq Avoided",
        metric4: "Families & Businesses",

        // --- SECCIÓN: EL PROBLEMA (Versión Micro-Copy EN INGLÉS) ---
        problemTitle: "The Energy 'Hardware Gap'",
        problemDesc: "Traditional solar panels are heavy, restrictive, and generate high emissions. HD Photovoltaics solves three critical barriers:",
        prob1Title: "Structural Restriction (Weight)",
        prob1Desc: "80% lighter solution (3.5 kg/m²). Allows immediate deployment without costly steel reinforcements.",
        prob2Title: "Carbon Debt",
        prob2Desc: "We use recycled polymers instead of glass and aluminum, reducing 300 kg CO₂eq per linear meter.",
        prob3Title: "Slow Deployment",
        prob3Desc: "'Plug-and-play' structural design that drastically reduces installation times and logistical costs.",
        
        solutionTitle: "The Innovation: ",
        solutionTitleAccent: "Semi-transparent Solar Polycarbonate",
        solutionDesc: "We have developed a proprietary, custom-designed BIPV solution that simplifies installation by eliminating traditional mounting infrastructure.",
        sol1Title: "Semi-transparent Generation",
        sol1Desc: "Allows up to 80% of natural light transmission while capturing solar radiation to generate clean electricity.",
        sol2Title: "Lightness and Resistance",
        sol2Desc: "Extremely lightweight (only 3.5 kg/m²) and flexible. Resists high impacts and severe weather, vastly outperforming traditional glass.",
        
        appTitle: "Strategic Applications",
        appDesc: "Our technology is designed to adapt to the sectors that most require spatial and energetic efficiency.",
        app1: "Skylights and Factory / Port Roofs",
        app2: "Smart Public Transport Stops",
        app3: "Agricultural Greenhouses (Agrivoltaics)",
        app4: "Commercial Building Facades",

        contactTag: "Instant Download",
        contactTitle: "Access Technical Documentation",
        contactDesc: "Complete the form to download our official brochure. Discover the technical specifications, performance metrics, and integration details of our technology presented at the UN STI Forum.",
        contactList1: "Performance data sheets",
        contactList2: "Resistance certifications",
        contactList3: "Architectural integration guide",
        
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

      {/* ===== PROBLEM (Versión Centrada sin Imagen) ===== */}
      <section id="problem" className="py-16 md:py-24 bg-white relative z-10">
        <div className="container max-w-4xl mx-auto">
          
          {/* Encabezado centrado para mejor balance visual */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight text-emerald-950">
              {t.problemTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.problemDesc}
            </p>
          </div>
          
          {/* Lista de 3 puntos */}
          <div className="space-y-4">
            {/* Punto 1: Peso */}
            <div className="flex items-start gap-5 p-5 md:p-6 rounded-2xl hover:bg-emerald-50 transition-smooth cursor-default border border-transparent hover:border-emerald-100 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Shield className="w-7 h-7 text-emerald-700" />
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2 text-xl text-emerald-950 tracking-tight">{t.prob1Title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t.prob1Desc}</p>
              </div>
            </div>
            
            {/* Punto 2: Carbono */}
            <div className="flex items-start gap-5 p-5 md:p-6 rounded-2xl hover:bg-emerald-50 transition-smooth cursor-default border border-transparent hover:border-emerald-100 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Leaf className="w-7 h-7 text-emerald-700" />
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2 text-xl text-emerald-950 tracking-tight">{t.prob2Title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t.prob2Desc}</p>
              </div>
            </div>

            {/* Punto 3: Velocidad */}
            <div className="flex items-start gap-5 p-5 md:p-6 rounded-2xl hover:bg-emerald-50 transition-smooth cursor-default border border-transparent hover:border-emerald-100 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Zap className="w-7 h-7 text-emerald-700" />
              </div>
              <div className="text-left">
                <h3 className="font-bold mb-2 text-xl text-emerald-950 tracking-tight">{t.prob3Title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{t.prob3Desc}</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ===== SOLUTION / INNOVATION UNIFICADA & OPTIMIZADA ===== */}
      {/* Mapeo Spacing: Unificación + py-24 para dar aire corporativo */}
      <section id="solution" className="py-24 bg-secondary/30 relative z-0">
        <div className="container">
          
          {/* ODS UNIFICADOS (Auto-activación por Scroll) */}
          <div ref={odsRef} className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-16 border-b border-gray-200/50 pb-16 transition-all duration-1000 ${odsOnScreen ? "grayscale-0 opacity-100 scale-100" : "grayscale opacity-50 scale-95"}`}>
            <img 
              src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg" 
              alt="SDG 7: Affordable and Clean Energy" 
              className="w-24 md:w-32 h-auto object-contain rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default" 
            />
            <img 
              src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg" 
              alt="SDG 9: Industry, Innovation and Infrastructure" 
              className="w-24 md:w-32 h-auto object-contain rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default" 
            />
            <img 
              src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg" 
              alt="SDG 11: Sustainable Cities and Communities" 
              className="w-24 md:w-32 h-auto object-contain rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-default" 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-[-4rem]">
            {/* Left: Texto */}
            <div>
              <div className="text-center md:text-left max-w-3xl mx-auto mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">{t.solutionTitle}<span className="text-emerald-600">{t.solutionTitleAccent}</span></h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.solutionDesc}</p>
                
                <div className="space-y-4">
                  {/* Mapeo de Color Solution Icons: CleanTech + Hover Effect unificado */}
                  <div className="flex items-start gap-4 text-left p-4 rounded-xl hover:bg-emerald-50 transition-smooth cursor-default">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200"><Sun className="w-6 h-6 text-emerald-700" /></div>
                    <div><h3 className="font-bold mb-1 text-lg tracking-tight">{t.sol1Title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{t.sol1Desc}</p></div>
                  </div>
                  <div className="flex items-start gap-4 text-left p-4 rounded-xl hover:bg-emerald-50 transition-smooth cursor-default">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 border border-emerald-200"><Shield className="w-6 h-6 text-emerald-700" /></div>
                    <div><h3 className="font-bold mb-1 text-lg tracking-tight">{t.sol2Title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{t.sol2Desc}</p></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Imagen "Wow" de Ligereza y Transparencia */}
            <div className="flex justify-center order-first md:order-none">
              <img src="/product-innovation.jpg" alt="Innovación en Policarbonato Solar Ligero" className="w-full max-w-md h-auto rounded-3xl shadow-2xl border border-emerald-100 p-2 bg-white transition-all hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section id="applications" className="py-16 md:py-24 bg-white relative z-10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t.appTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.appDesc}</p>
              <ul className="space-y-4">
                {[t.app1, t.app2, t.app3, t.app4].map((app, index) => (
                  <li key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-soft transition-smooth cursor-default">
                    {/* Mapeo de Color Applications Check: CleanTech + Hover Effect unificado */}
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">{index + 1}</div>
                    <span className="font-medium text-gray-900 text-lg">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Visual: Vista Angular Profesional */}
            <div className="flex justify-center order-1 md:order-2">
              <img src="/product-applications.jpg" alt="Aplicación de Chapa Solar Profesional" className="w-full max-w-md rounded-2xl shadow-xl border border-border transition-all hover:-translate-x-2 hover:shadow-2xl" />
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
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Zap className="w-5 h-5 text-orange-500" /> {t.contactList1}</div>
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Shield className="w-5 h-5 text-orange-500" /> {t.contactList2}</div>
              <div className="flex items-center gap-3 text-sm text-emerald-200"><Building className="w-5 h-5 text-orange-500" /> {t.contactList3}</div>
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