import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Globe, Download, Shield, Sun, Building, Zap, Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";

/**
 * HD Fotovoltaica - UN STI Forum 2026 Edition
 * Internationalization Engine
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "" });

  // 1. Detección automática de idioma del navegador
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return navigator.language.startsWith("en") ? "EN" : "ES";
    }
    return "ES";
  });

  // Reemplaza esto con tu Access Key oficial
  const WEB3FORMS_ACCESS_KEY = "7d4a77ef-c085-48f6-9845-9fd4c85ee9b5";

  // 2. Diccionario de Traducciones
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
        problemTitle: "El Desafío de la Infraestructura Urbana",
        problemDesc: "Millones de metros cuadrados de superficies industriales están desaprovechados. Los paneles de vidrio tradicionales tienen limitaciones físicas críticas.",
        solutionTitle: "La Innovación: Policarbonato Solar Semitransparente",
        solutionDesc: "Una lámina multipropósito que reemplaza materiales convencionales, integrando celdas fotovoltaicas directamente.",
        appTitle: "Aplicaciones Estratégicas",
        contactTitle: "Accede a la Documentación Técnica",
        contactDesc: "Completa el formulario para descargar nuestro brochure oficial con especificaciones técnicas y métricas de rendimiento.",
        formLabelName: "Nombre Completo",
        formLabelOrg: "Organización / Empresa",
        formBtn: "Descargar Brochure PDF",
        toastLang: "Idioma cambiado a Inglés",
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
        problemTitle: "The Urban Infrastructure Challenge",
        problemDesc: "Millions of square meters of industrial surfaces are wasted. Traditional glass panels face critical physical and architectural limitations.",
        solutionTitle: "The Innovation: Semi-transparent Solar Polycarbonate",
        solutionDesc: "A multi-purpose sheet that replaces conventional materials, integrating photovoltaic cells directly.",
        appTitle: "Strategic Applications",
        contactTitle: "Access Technical Documentation",
        contactDesc: "Complete the form to download our official brochure with technical specifications and performance metrics.",
        formLabelName: "Full Name",
        formLabelOrg: "Organization / Company",
        formBtn: "Download PDF Brochure",
        toastLang: "Language changed to Spanish",
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
            Nombre: formData.name,
            Email: formData.email,
            Organizacion: formData.organization,
          }),
        });
        const result = await response.json();
        if (result.success) {
          toast.success(language === "ES" ? "¡Registro exitoso!" : "Successful registration!");
          window.open(t.brochurePath, "_blank");
          setFormData({ name: "", email: "", organization: "" });
        }
      } catch (error) {
        toast.error("Error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
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
          </div>
        </div>
      </header>

      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-white" style={{ backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hero-brushstrokes-arcs-UusSkKShgANrGwL4KjVLTM.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10 container text-center max-w-4xl px-4">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm animate-fade-in">
            {t.heroTag}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.heroTitle} <span className="text-accent">{t.heroTitleAccent}</span>.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-2xl mx-auto font-medium">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:row gap-4 justify-center">
            <Button onClick={scrollToContact} className="bg-accent hover:bg-accent/90 text-white px-8 py-6 rounded-lg text-base shadow-lg shadow-accent/20">
              {t.heroBtnTech}
            </Button>
          </div>
        </div>
      </section>

      {/* Secciones simplificadas para brevedad, manteniendo la lógica t.prop */}
      <section id="contact" className="py-24 bg-foreground text-white">
        <div className="container max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t.contactTitle}</h2>
            <p className="text-gray-400 mb-8">{t.contactDesc}</p>
          </div>
          <div className="bg-white text-foreground p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <Input name="name" placeholder={t.formLabelName} value={formData.name} onChange={handleFormChange} required />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required />
              <Input name="organization" placeholder={t.formLabelOrg} value={formData.organization} onChange={handleFormChange} required />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-accent py-6 text-white font-bold">
                {isSubmitting ? <Loader2 className="animate-spin" /> : t.formBtn}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}