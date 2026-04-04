import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Globe, Download, Shield, Sun, Building, Zap, Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * HD Fotovoltaica - UN STI Forum 2026 Edition
 * Internationalization Engine - FULL VERSION
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });

  // Detección automática de idioma
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return navigator.language.startsWith("en") ? "EN" : "ES";
    }
    return "ES";
  });

  // Tu nueva llave oficial para hdfotovoltaica@gmail.com
  const WEB3FORMS_ACCESS_KEY = "7d4a77ef-c085-48f6-9845-9fd4c85ee9b5";

  // Diccionario Completo de Traducciones
  const t = useMemo(() => {
    const translations = {
      ES: {
        nav: ["El Problema", "Innovación", "Aplicaciones", "Contacto"],
        heroTag: "Foro CTI de la ONU - Nueva York 2026",
        heroTitle: "Transformando infraestructuras pasivas en ",
        heroTitleAccent: "generadoras activas",
        heroSubtitle: "La intersección perfecta entre energías renovables y arquitectura inteligente para ciudades sostenibles.",
        heroBtnTech: "Acceder a la Documentación Técnica",
        heroBtnLearn: "Conocer la Tecnología",
        
        trustBar: ["ODS 7: Energía Asequible", "ODS 9: Industria e Infraestructura", "ODS 11: Ciudades Sostenibles"],
        
        problemTitle: "El Desafío de la Infraestructura Urbana",
        problemDesc: "Millones de metros cuadrados de superficies industriales y urbanas están desaprovechados. Los paneles solares tradicionales de vidrio no son viables en todos los escenarios debido a sus limitaciones físicas y arquitectónicas.",
        prob1Title: "Peso y Rigidez (Vidrio)",
        prob1Desc: "Pesan entre 15-20 kg/m², requiriendo refuerzos estructurales costosos que muchos techos no pueden soportar.",
        prob2Title: "Oscurecimiento del Espacio",
        prob2Desc: "Su opacidad bloquea la luz natural, forzando a las industrias a aumentar el consumo de iluminación artificial diurna.",
        probCardTitle: "Infraestructura Pasiva",
        probCardDesc: "Superficies que reciben luz solar pero no generan valor energético sin comprometer su estructura.",

        solutionTitle: "La Innovación: ",
        solutionTitleAccent: "Policarbonato Solar Semitransparente",
        solutionDesc: "Hemos desarrollado una lámina multipropósito que reemplaza a los materiales de construcción convencionales, integrando celdas fotovoltaicas directamente en el policarbonato.",
        sol1Title: "Generación Semitransparente",
        sol1Desc: "Filtra el paso de la luz natural de forma controlada mientras captura la radiación solar para generar electricidad limpia.",
        sol2Title: "Ligereza y Resistencia",
        sol2Desc: "Extremadamente ligero y flexible. Resiste altos impactos y clima severo, superando ampliamente al vidrio tradicional.",
        sol3Title: "Versatilidad Arquitectónica",
        sol3Desc: "Integración estética y sin fricciones en claraboyas, fachadas comerciales y grandes techos industriales.",
        sol4Title: "Efecto Cruzado (Doble Eficiencia)",
        sol4Desc: "Inyecta energía renovable a la red mientras reduce drásticamente el consumo de iluminación artificial diurna.",

        appTitle: "Aplicaciones Estratégicas",
        appDesc: "Nuestra tecnología está diseñada para adaptarse a los sectores que más requieren eficiencia espacial y energética.",
        app1: "Claraboyas y Techos de Fábricas / Puertos",
        app2: "Paradas de Transporte Público Inteligente",
        app3: "Invernaderos Agrícolas (Agrivoltaica)",
        app4: "Fachadas de Edificios Comerciales",

        contactTag: "Descarga Inmediata",
        contactTitle: "Accede a la Documentación Técnica",
        contactDesc: "Completa el formulario para descargar nuestro brochure oficial. Descubre las especificaciones técnicas, métricas de rendimiento y detalles de integración de nuestra tecnología presentada en el Foro CTI de la ONU.",
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
        nav: ["The Problem", "Innovation", "Applications", "Contact"],
        heroTag: "UN STI Forum - New York 2026",
        heroTitle: "Transforming passive infrastructures into ",
        heroTitleAccent: "active generators",
        heroSubtitle: "The perfect intersection between renewable energy and smart architecture for sustainable cities.",
        heroBtnTech: "Access Technical Documentation",
        heroBtnLearn: "Discover the Technology",
        
        trustBar: ["SDG 7: Affordable Energy", "SDG 9: Industry & Infrastructure", "SDG 11: Sustainable Cities"],

        problemTitle: "The Urban Infrastructure Challenge",
        problemDesc: "Millions of square meters of industrial and urban surfaces are wasted. Traditional glass solar panels are not viable in all scenarios due to their physical and architectural limitations.",
        prob1Title: "Weight and Rigidity (Glass)",
        prob1Desc: "Weighing between 15-20 kg/m², they require costly structural reinforcements that many roofs cannot support.",
        prob2Title: "Space Darkening",
        prob2Desc: "Their opacity blocks natural light, forcing industries to increase the consumption of daytime artificial lighting.",
        probCardTitle: "Passive Infrastructure",
        probCardDesc: "Surfaces that receive sunlight but generate no energetic value without compromising their structure.",

        solutionTitle: "The Innovation: ",
        solutionTitleAccent: "Semi-transparent Solar Polycarbonate",
        solutionDesc: "We have developed a multipurpose sheet that replaces conventional building materials, integrating photovoltaic cells directly into the polycarbonate.",
        sol1Title: "Semi-transparent Generation",
        sol1Desc: "Filters natural light in a controlled manner while capturing solar radiation to generate clean electricity.",
        sol2Title: "Lightness and Resistance",
        sol2Desc: "Extremely lightweight and flexible. Resists high impacts and severe weather, vastly outperforming traditional glass.",
        sol3Title: "Architectural Versatility",
        sol3Desc: "Aesthetic and seamless integration in skylights, commercial facades, and large industrial roofs.",
        sol4Title: "Cross Effect (Double Efficiency)",
        sol4Desc: "Injects renewable energy into the grid while drastically reducing the consumption of daytime artificial lighting.",

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
        footerRights: "© 2026 HD Fotovoltaica. All rights reserved.",
        
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

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-accent/30">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-8 w-auto" />
            <span className="font-bold text-lg hidden sm:inline">Fotovoltaica</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {t.nav.map((item, i) => (
              <a key={i} href={`#${["problem", "solution", "applications", "contact"][i]}`} className="text-sm hover:text-accent transition-smooth font-medium">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={handleLanguageToggle} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-smooth">
              <Globe className="w-4 h-4 text-accent" />
              <span>{language}</span>
            </button>
            <Button onClick={scrollToContact} className="hidden sm:flex bg-accent hover:bg-accent/90 text-white" size="sm">
              <Download className="w-4 h-4" />
              <span>{language === "ES" ? "Brochure" : "Brochure"}</span>
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-secondary rounded transition-smooth">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-white">
            <div className="container py-4 flex flex-col gap-4">
               {t.nav.map((item, i) => (
                <a key={i} href={`#${["problem", "solution", "applications", "contact"][i]}`} onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-accent font-medium">
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-white" style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hero-brushstrokes-arcs-UusSkKShgANrGwL4KjVLTM.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10 container text-center max-w-4xl px-4 mt-[-5vh]">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm">
            {t.heroTag}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t.heroTitle} <span className="text-accent">{t.heroTitleAccent}</span>.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-2xl mx-auto font-medium">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToContact} className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 rounded-lg shadow-lg">
              {t.heroBtnTech}
            </Button>
            <Button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} variant="outline" className="border-black text-black hover:bg-black/5 font-semibold px-8 py-6 rounded-lg">
              {t.heroBtnLearn}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-white py-10 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-smooth duration-500">
            <div className="flex items-center gap-3"><Leaf className="w-6 h-6 text-green-600" /><span className="font-semibold text-sm">{t.trustBar[0]}</span></div>
            <div className="flex items-center gap-3"><Building className="w-6 h-6 text-blue-600" /><span className="font-semibold text-sm">{t.trustBar[1]}</span></div>
            <div className="flex items-center gap-3"><Globe className="w-6 h-6 text-orange-500" /><span className="font-semibold text-sm">{t.trustBar[2]}</span></div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section id="problem" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.problemTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.problemDesc}</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0"><Shield className="w-6 h-6 text-red-600" /></div>
                  <div><h3 className="font-semibold mb-1 text-lg">{t.prob1Title}</h3><p className="text-sm text-muted-foreground">{t.prob1Desc}</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0"><Sun className="w-6 h-6 text-gray-600" /></div>
                  <div><h3 className="font-semibold mb-1 text-lg">{t.prob2Title}</h3><p className="text-sm text-muted-foreground">{t.prob2Desc}</p></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border border-border p-8 text-center shadow-inner">
                <Building className="w-20 h-20 text-gray-400 mb-4" />
                <h4 className="font-bold text-gray-500 mb-2">{t.probCardTitle}</h4>
                <p className="text-sm text-gray-500">{t.probCardDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section id="solution" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.solutionTitle}<span className="text-accent">{t.solutionTitleAccent}</span></h2>
            <p className="text-lg text-muted-foreground">{t.solutionDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:-translate-y-1 transition-all"><div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4"><Sun className="w-6 h-6 text-accent" /></div><h3 className="font-bold mb-2">{t.sol1Title}</h3><p className="text-sm text-muted-foreground">{t.sol1Desc}</p></div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:-translate-y-1 transition-all"><div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4"><Shield className="w-6 h-6 text-accent" /></div><h3 className="font-bold mb-2">{t.sol2Title}</h3><p className="text-sm text-muted-foreground">{t.sol2Desc}</p></div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:-translate-y-1 transition-all"><div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4"><Building className="w-6 h-6 text-accent" /></div><h3 className="font-bold mb-2">{t.sol3Title}</h3><p className="text-sm text-muted-foreground">{t.sol3Desc}</p></div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:-translate-y-1 transition-all"><div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-accent" /></div><h3 className="font-bold mb-2">{t.sol4Title}</h3><p className="text-sm text-muted-foreground">{t.sol4Desc}</p></div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section id="applications" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.appTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.appDesc}</p>
              <ul className="space-y-4">
                {[t.app1, t.app2, t.app3, t.app4].map((app, index) => (
                  <li key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">{index + 1}</div>
                    <span className="font-medium">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/product-chapa-solar-NK8dYpVbWUMwVrbMAzFyYu.webp" alt="HD Fotovoltaica" className="w-full max-w-md rounded-xl shadow-lg border border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-16 md:py-24 bg-foreground text-white">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs mb-6 border border-accent/30">
              <Download className="w-3 h-3" /> {t.contactTag}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contactTitle}</h2>
            <p className="text-gray-400 mb-8">{t.contactDesc}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-300"><Zap className="w-5 h-5 text-accent" /> {t.contactList1}</div>
              <div className="flex items-center gap-3 text-sm text-gray-300"><Shield className="w-5 h-5 text-accent" /> {t.contactList2}</div>
              <div className="flex items-center gap-3 text-sm text-gray-300"><Building className="w-5 h-5 text-accent" /> {t.contactList3}</div>
            </div>
          </div>
          <div className="bg-white text-foreground p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5">{t.formLabelName}</label>
                <Input name="name" placeholder={t.formPlaceholderName} value={formData.name} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Email</label>
                <Input name="email" type="email" placeholder="email@empresa.com" value={formData.email} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">{t.formLabelOrg}</label>
                <Input name="organization" placeholder={t.formPlaceholderOrg} value={formData.organization} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 rounded-xl shadow-lg">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.formProcessing}</> : <><Download className="w-5 h-5 mr-2" />{t.formBtn}</>}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">{t.formDisclaimer}</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-8 w-auto opacity-90" />
                <span className="font-bold text-xl tracking-tight">Fotovoltaica</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">{t.footerCompanyDesc}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">{t.footerHQTitle}</h4>
              <p className="text-sm text-gray-400">{t.footerHQDesc}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Contacto</h4>
              <p className="text-sm text-gray-400 mb-2">contacto@hdfotovoltaica.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center gap-4">
            <p className="text-sm text-gray-500">{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}