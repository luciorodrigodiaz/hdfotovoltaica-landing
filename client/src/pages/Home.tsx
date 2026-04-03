import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Globe, Download, Send, Shield, Sun, Building, Zap, Leaf } from "lucide-react";
import { toast } from "sonner";

/**
 * Design Philosophy: Minimalist High-Tech with Organic Warmth
 * Tailored for the UN STI Forum 2026 - CleanTech Standards
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ES");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
  });

  const handleLanguageToggle = () => {
    setLanguage(language === "ES" ? "EN" : "ES");
    toast.info(`Idioma cambiado a ${language === "ES" ? "Inglés" : "Español"}`);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.organization) {
      toast.success("¡Registro exitoso! Descargando brochure técnico...");
      
      // Lógica de redirección al PDF
      setTimeout(() => {
        window.open("https://drive.google.com/uc?export=view&id=1RSyXzkWGxOD9j6UPBhbAe3eiZyo1lQOw", "_blank");
      }, 1500);

      setFormData({ name: "", email: "", organization: "" });
    } else {
      toast.error("Por favor, completa todos los campos obligatorios.");
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* ===== HEADER / STICKY NAVIGATION ===== */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-soft">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD Fotovoltaica" className="h-8 w-auto" />
            <span className="font-bold text-lg hidden sm:inline">Fotovoltaica</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm hover:text-accent transition-smooth font-medium">
              El Problema
            </a>
            <a href="#solution" className="text-sm hover:text-accent transition-smooth font-medium">
              Innovación
            </a>
            <a href="#applications" className="text-sm hover:text-accent transition-smooth font-medium">
              Aplicaciones
            </a>
            <a href="#contact" className="text-sm hover:text-accent transition-smooth font-medium">
              Contacto
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-secondary transition-smooth"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </button>

            {/* Download Brochure Button */}
            <Button
              onClick={scrollToContact}
              className="hidden sm:flex items-center gap-2 bg-accent hover:bg-accent/90 text-white"
              size="sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Brochure Técnico</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded transition-smooth"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-secondary/50">
            <div className="container py-4 flex flex-col gap-4">
              <a
                href="#problem"
                className="text-sm hover:text-accent transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                El Problema
              </a>
              <a
                href="#solution"
                className="text-sm hover:text-accent transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Innovación
              </a>
              <a
                href="#applications"
                className="text-sm hover:text-accent transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Aplicaciones
              </a>
              <a
                href="#contact"
                className="text-sm hover:text-accent transition-smooth font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Brochure Técnico
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-white"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hero-brushstrokes-arcs-UusSkKShgANrGwL4KjVLTM.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Hero Content */}
        <div className="relative z-10 container text-center text-black max-w-4xl mx-auto px-4 mt-[-5vh]">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm">
            Foro CTI de la ONU - Nueva York 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Transformando infraestructuras pasivas en <span className="text-accent">generadoras activas</span> de energía.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800 max-w-2xl mx-auto font-medium">
            La intersección perfecta entre energías renovables y arquitectura inteligente para ciudades sostenibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 rounded-lg transition-smooth text-base shadow-lg shadow-accent/20"
            >
              Acceder a la Documentación Técnica
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("solution")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="outline"
              className="border-black text-black hover:bg-black/5 font-semibold px-8 py-6 rounded-lg transition-smooth text-base"
            >
              Conocer la Tecnología
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR / ACKNOWLEDGMENTS ===== */}
      <section className="bg-white py-10 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-smooth duration-500">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-sm">ODS 7: Energía Asequible</span>
            </div>
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-sm">ODS 9: Industria e Infraestructura</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-orange-500" />
              <span className="font-semibold text-sm">ODS 11: Ciudades Sostenibles</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM SECTION ===== */}
      <section id="problem" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">El Desafío de la Infraestructura Urbana</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Millones de metros cuadrados de superficies industriales y urbanas están desaprovechados. Los paneles solares tradicionales de vidrio no son viables en todos los escenarios debido a sus limitaciones físicas y arquitectónicas.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Peso y Rigidez (Vidrio)</h3>
                    <p className="text-sm text-muted-foreground">
                      Pesan entre 15-20 kg/m², requiriendo refuerzos estructurales costosos que muchos techos no pueden soportar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Sun className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Oscurecimiento del Espacio</h3>
                    <p className="text-sm text-muted-foreground">
                      Su opacidad bloquea la luz natural, forzando a las industrias a aumentar el consumo de iluminación artificial diurna.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border border-border p-8 text-center shadow-inner">
                <Building className="w-20 h-20 text-gray-400 mb-4" />
                <h4 className="font-bold text-gray-500 mb-2">Infraestructura Pasiva</h4>
                <p className="text-sm text-gray-500">Superficies que reciben luz solar pero no generan valor energético sin comprometer su estructura.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE SOLUTION SECTION ===== */}
      <section id="solution" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              La Innovación: <span className="text-accent">Policarbonato Solar Semitransparente</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hemos desarrollado una lámina multipropósito que reemplaza a los materiales de construcción convencionales, integrando celdas fotovoltaicas directamente en el policarbonato.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Generación Semitransparente</h3>
              <p className="text-sm text-muted-foreground">
                Filtra el paso de la luz natural de forma controlada mientras captura la radiación solar para generar electricidad limpia.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Ligereza y Resistencia</h3>
              <p className="text-sm text-muted-foreground">
                Extremadamente ligero y flexible. Resiste altos impactos y clima severo, superando ampliamente al vidrio tradicional.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Versatilidad Arquitectónica</h3>
              <p className="text-sm text-muted-foreground">
                Integración estética y sin fricciones en claraboyas, fachadas comerciales y grandes techos industriales.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Efecto Cruzado (Doble Eficiencia)</h3>
              <p className="text-sm text-muted-foreground">
                Inyecta energía renovable a la red mientras reduce drásticamente el consumo de iluminación artificial diurna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS SECTION ===== */}
      <section id="applications" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Aplicaciones Estratégicas</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nuestra tecnología está diseñada para adaptarse a los sectores que más requieren eficiencia espacial y energética.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">1</div>
                  <span className="font-medium">Claraboyas y Techos de Fábricas / Puertos</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
                  <span className="font-medium">Paradas de Transporte Público Inteligente</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">3</div>
                  <span className="font-medium">Invernaderos Agrícolas (Agrivoltaica)</span>
                </li>
                <li className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">4</div>
                  <span className="font-medium">Fachadas de Edificios Comerciales</span>
                </li>
              </ul>
            </div>
            
            {/* Right: Image */}
            <div className="flex justify-center order-1 md:order-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/product-chapa-solar-NK8dYpVbWUMwVrbMAzFyYu.webp"
                alt="Policarbonato Solar HD Fotovoltaica"
                className="w-full max-w-md h-auto rounded-xl shadow-lg border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION / CONTACT SECTION ===== */}
      <section id="contact" className="py-16 md:py-24 bg-foreground text-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs mb-6 border border-accent/30">
                <Download className="w-3 h-3" /> Descarga Inmediata
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Accede a la Documentación Técnica
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Completa el formulario para descargar nuestro brochure oficial. Descubre las especificaciones técnicas, métricas de rendimiento y detalles de integración de nuestra tecnología presentada en el Foro CTI de la ONU.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Zap className="w-5 h-5 text-accent" /> Fichas técnicas de rendimiento
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Shield className="w-5 h-5 text-accent" /> Certificaciones de resistencia
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Building className="w-5 h-5 text-accent" /> Guía de integración arquitectónica
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white text-foreground p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-1.5">
                    Nombre Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ej. Laura Gómez"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border-transparent focus:border-accent focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
                    Correo Institucional
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="laura@empresa.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border-transparent focus:border-accent focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold mb-1.5">
                    Organización / Empresa
                  </label>
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Nombre de tu entidad"
                    value={formData.organization}
                    onChange={handleFormChange}
                    className="w-full bg-secondary/50 border-transparent focus:border-accent focus:ring-accent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 rounded-xl transition-smooth flex items-center justify-center gap-2 mt-2 shadow-lg shadow-accent/20"
                >
                  <Download className="w-5 h-5" />
                  Descargar Brochure PDF
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Al descargar, aceptas nuestra política de privacidad.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280050483/jo9qH2yDgMpiW4axWL3Z6z/hd-logo_ac146515.png" alt="HD Fotovoltaica" className="h-8 w-auto opacity-90" />
                <span className="font-bold text-xl tracking-tight">Fotovoltaica</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Transformando la infraestructura urbana con innovación solar semitransparente.
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Sede Central</h4>
              <p className="text-sm text-gray-400">Diseñado e impulsado desde la<br/>Ciudad Autónoma de Buenos Aires (CABA),<br/>Argentina para el mundo.</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Contacto</h4>
              <p className="text-sm text-gray-400 mb-2">contacto@hdfotovoltaica.com</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 HD Fotovoltaica. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}