import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Globe, Download, Shield, Sun, Building, Zap, Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * HD Fotovoltaica - UN STI Forum 2026 Edition
 * Step 1: Estética Unificada con el Brochure (Colores, Formas, Tipografía)
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

  // Tu llave oficial para hdfotovoltaica@gmail.com
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
        
        solutionTitle: "La Innovación: ",
        solutionTitleAccent: "Policarbonato Solar Semitransparente",
        solutionDesc: "Hemos desarrollado una lámina multipropósito que reemplaza a los materiales de construcción convencionales, integrando celdas fotovoltaicas directamente en el policarbonato.",
        
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
        
        solutionTitle: "The Innovation: ",
        solutionTitleAccent: "Semi-transparent Solar Polycarbonate",
        solutionDesc: "We have developed a multipurpose sheet that replaces conventional building materials, integrating photovoltaic cells directly into the polycarbonate.",
        
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
    <div className="min-h-screen bg-white text-foreground selection:bg-[#F3A63B]/30 font-sans">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-9 w-auto" />
            <span className="font-bold text-xl hidden sm:inline text-[#133C3A]">Fotovoltaica</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {t.nav.map((item, i) => (
              <a key={i} href={`#${["problem", "solution", "applications", "contact"][i]}`} className="text-sm hover:text-[#F3A63B] transition-smooth font-medium uppercase tracking-wide">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={handleLanguageToggle} className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border border-border hover:bg-secondary transition-smooth">
              <Globe className="w-4 h-4 text-[#F3A63B]" />
              <span className="text-[#133C3A]">{language}</span>
            </button>
            <Button onClick={scrollToContact} className="hidden sm:flex bg-[#133C3A] hover:bg-[#133C3A]/90 text-white rounded-full px-5" size="sm">
              <Download className="w-4 h-4 mr-2" />
              <span className="uppercase text-xs font-bold tracking-wider">{language === "ES" ? "Brochure" : "Brochure"}</span>
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-secondary rounded-full transition-smooth">
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#133C3A]" /> : <Menu className="w-5 h-5 text-[#133C3A]" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-white">
            <div className="container py-4 flex flex-col gap-4">
               {t.nav.map((item, i) => (
                <a key={i} href={`#${["problem", "solution", "applications", "contact"][i]}`} onClick={() => setMobileMenuOpen(false)} className="text-sm hover:text-[#F3A63B] font-medium uppercase tracking-wide py-1">
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
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-[#F3A63B]/10 border border-[#F3A63B]/30 text-[#F3A63B] font-bold text-sm uppercase tracking-wider">
            {t.heroTag}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight selection:bg-[#F3A63B]/10 text-[#133C3A]">
            {t.heroTitle} <span className="text-[#F3A63B]">{t.heroTitleAccent}</span>.
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-800 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button onClick={scrollToContact} className="bg-[#133C3A] hover:bg-[#133C3A]/90 text-white font-bold px-10 py-7 rounded-full text-base shadow-xl shadow-[#133C3A]/20 uppercase tracking-wider">
              {t.heroBtnTech}
            </Button>
            <Button onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })} variant="outline" className="border-[#133C3A] text-[#133C3A] hover:bg-[#133C3A]/5 font-bold px-10 py-7 rounded-full text-base transition-smooth uppercase tracking-wider">
              {t.heroBtnLearn}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="bg-white py-12 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 opacity-90 grayscale hover:grayscale-0 transition-smooth duration-500">
            <div className="flex items-center gap-3.5"><Leaf className="w-7 h-7 text-green-600" /><span className="font-bold text-sm text-[#133C3A] uppercase tracking-wide">{t.trustBar[0]}</span></div>
            <div className="flex items-center gap-3.5"><Building className="w-7 h-7 text-blue-600" /><span className="font-bold text-sm text-[#133C3A] uppercase tracking-wide">{t.trustBar[1]}</span></div>
            <div className="flex items-center gap-3.5"><Globe className="w-7 h-7 text-[#F3A63B]" /><span className="font-bold text-sm text-[#133C3A] uppercase tracking-wide">{t.trustBar[2]}</span></div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section id="problem" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight text-[#133C3A] uppercase tracking-wider">{t.problemTitle}</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">{t.problemDesc}</p>
              <div className="space-y-7">
                <div className="flex items-start gap-5 p-5 rounded-3xl hover:bg-secondary/20 transition-smooth">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 border border-red-200"><Shield className="w-7 h-7 text-red-600" /></div>
                  <div><h3 className="font-bold mb-1.5 text-xl text-[#133C3A]">{t.prob1Title}</h3><p className="text-base text-muted-foreground leading-relaxed font-medium">{t.prob1Desc}</p></div>
                </div>
                <div className="flex items-start gap-5 p-5 rounded-3xl hover:bg-secondary/20 transition-smooth">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200"><Sun className="w-7 h-7 text-gray-600" /></div>
                  <div><h3 className="font-bold mb-1.5 text-xl text-[#133C3A]">{t.prob2Title}</h3><p className="text-base text-muted-foreground leading-relaxed font-medium">{t.prob2Desc}</p></div>
                </div>
              </div>
            </div>
            {/* Visual: Formas Redondeadas estilo Brochure */}
            <div className="flex justify-center p-2 bg-secondary/30 rounded-[3rem] border border-border shadow-inner">
              <img src="/product-problem.jpg" alt="Chapa Solar Fotovoltaica" className="w-full max-w-md h-auto rounded-[2.5rem] shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION / INNOVATION (Imagen de la Mano con Máscara Redonda) ===== */}
      <section id="solution" className="py-16 md:py-24 bg-secondary/40">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Texto */}
            <div>
              <div className="text-center md:text-left max-w-3xl mx-auto mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight text-[#133C3A] uppercase tracking-wider">{t.solutionTitle}<span className="text-[#F3A63B]">{t.solutionTitleAccent}</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">{t.solutionDesc}</p>
              </div>
            </div>
            {/* Right: Imagen con Máscara Circular/Píldora del Brochure */}
            <div className="flex justify-center order-first md:order-none p-4 bg-white rounded-[4rem] border border-accent/10 shadow-2xl">
              <img src="/product-innovation.jpg" alt="Innovación Policarbonato Solar Ligero" className="w-full max-w-md h-auto rounded-[3.5rem] shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section id="applications" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight text-[#133C3A] uppercase tracking-wider">{t.appTitle}</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">{t.appDesc}</p>
              <ul className="space-y-5">
                {[t.app1, t.app2, t.app3, t.app4].map((app, index) => (
                  <li key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:shadow-soft transition-smooth">
                    <div className="w-10 h-10 rounded-full bg-[#133C3A] flex items-center justify-center text-white font-bold text-lg">{index + 1}</div>
                    <span className="font-semibold text-[#133C3A] text-lg">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Visual: Vista Angular con Máscara */}
            <div className="flex justify-center p-3 bg-secondary/30 rounded-[3rem] border border-border shadow-inner">
              <img src="/product-applications.jpg" alt="Aplicación de Chapa Solar" className="w-full max-w-md rounded-[2.5rem] shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / DOWNLOAD ===== */}
      <section id="contact" className="py-16 md:py-24 bg-[#133C3A] text-white">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#F3A63B] font-bold text-xs mb-7 border border-[#F3A63B]/30 uppercase tracking-wider">
              <Download className="w-3 h-3" /> {t.contactTag}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight uppercase tracking-wider">{t.contactTitle}</h2>
            <p className="text-gray-300 mb-10 leading-relaxed font-medium">{t.contactDesc}</p>
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-base text-gray-200"><Zap className="w-6 h-6 text-[#F3A63B]" /> <span className="font-medium">{t.contactList1}</span></div>
              <div className="flex items-center gap-4 text-base text-gray-200"><Shield className="w-6 h-6 text-[#F3A63B]" /> <span className="font-medium">{t.contactList2}</span></div>
              <div className="flex items-center gap-4 text-base text-gray-200"><Building className="w-6 h-6 text-[#F3A63B]" /> <span className="font-medium">{t.contactList3}</span></div>
            </div>
          </div>
          <div className="bg-white text-foreground p-10 rounded-3xl shadow-2xl border border-white/10">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#133C3A] uppercase tracking-wide">{t.formLabelName}</label>
                <Input name="name" placeholder={t.formPlaceholderName} value={formData.name} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-[#F3A63B] rounded-lg p-6 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#133C3A] uppercase tracking-wide">Email</label>
                <Input name="email" type="email" placeholder="email@empresa.com" value={formData.email} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-[#F3A63B] rounded-lg p-6 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#133C3A] uppercase tracking-wide">{t.formLabelOrg}</label>
                <Input name="organization" placeholder={t.formPlaceholderOrg} value={formData.organization} onChange={handleFormChange} required disabled={isSubmitting} className="bg-secondary/50 border-transparent focus:border-[#F3A63B] rounded-lg p-6 font-medium" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#133C3A] hover:bg-[#133C3A]/90 text-white font-bold py-7 rounded-full shadow-lg shadow-[#133C3A]/20 transition-smooth uppercase tracking-wider text-base">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />{t.formProcessing}</> : <><Download className="w-5 h-5 mr-2" />{t.formBtn}</>}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-5 leading-relaxed font-medium">{t.formDisclaimer}</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-white py-14">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10 mb-10 border-b border-gray-800 pb-10">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD" className="h-9 w-auto opacity-95" />
                <span className="font-bold text-2xl tracking-tight">Fotovoltaica</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">{t.footerCompanyDesc}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-100 mb-5 uppercase tracking-wide">{t.footerHQTitle}</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">{t.footerHQDesc}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-100 mb-5 uppercase tracking-wide">Contacto</h4>
              <p className="text-sm text-gray-400 mb-2 font-medium">hdfotovoltaica@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-medium">{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}