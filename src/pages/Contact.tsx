
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would submit this to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Mensagem Enviada!",
      description: "Agradecemos seu contato. Responderemos em breve!",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-tuca-deep-blue text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue opacity-90" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Entre em Contato
              </h1>
              <p className="text-lg md:text-xl">
                Estamos aqui para responder suas dúvidas e ajudar a planejar sua
                viagem perfeita para Fernando de Noronha.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Informações de Contato
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-tuca-light-blue p-3 rounded-full mr-4">
                      <Phone className="text-tuca-ocean-blue h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Telefone/WhatsApp</h3>
                      <a 
                        href="https://wa.me/5511968008888" 
                        className="text-tuca-ocean-blue hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +55 11 96800-8888
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-tuca-light-blue p-3 rounded-full mr-4">
                      <Mail className="text-tuca-ocean-blue h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">E-mail</h3>
                      <a 
                        href="mailto:karol@tucanoronha.com.br" 
                        className="text-tuca-ocean-blue hover:underline"
                      >
                        karol@tucanoronha.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-tuca-light-blue p-3 rounded-full mr-4">
                      <MapPin className="text-tuca-ocean-blue h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Endereço</h3>
                      <p className="text-gray-700">
                        Avenida Paulista, 1000 - Bela Vista
                        <br />
                        São Paulo - SP, 01310-100
                        <br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="font-medium text-lg mb-3">Nos Siga nas Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/tucanoronha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/tucanoronha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Envie uma Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo*
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail*
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Pacotes">Pacotes de Viagem</option>
                        <option value="Passeios">Passeios</option>
                        <option value="Hospedagens">Hospedagens</option>
                        <option value="Produtos">Produtos da Loja</option>
                        <option value="Parcerias">Parcerias</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tuca-ocean-blue"
                    ></textarea>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="bg-tuca-coral hover:bg-tuca-coral/90 text-white w-full py-3"
                    >
                      Enviar Mensagem
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">
              Nossa Localização
            </h2>
            <div className="bg-white p-2 rounded-lg shadow-md">
              <div className="w-full h-96 bg-gray-300 rounded overflow-hidden">
                {/* In a real implementation, you would use a Google Maps embed or a map component */}
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-600">Mapa será carregado aqui</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
