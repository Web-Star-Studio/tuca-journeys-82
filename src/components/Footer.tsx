
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-tuca-deep-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Tuca Noronha</h3>
            <p className="mb-6 text-gray-300">
              Sua agência especializada em experiências exclusivas em Fernando de Noronha.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/tucanoronha"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tuca-coral transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/tucanoronha"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tuca-coral transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/tucanoronha"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tuca-coral transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pacotes" className="text-gray-300 hover:text-white transition-colors">
                  Pacotes
                </Link>
              </li>
              <li>
                <Link to="/passeios" className="text-gray-300 hover:text-white transition-colors">
                  Passeios
                </Link>
              </li>
              <li>
                <Link to="/hospedagens" className="text-gray-300 hover:text-white transition-colors">
                  Hospedagens
                </Link>
              </li>
              <li>
                <Link to="/loja" className="text-gray-300 hover:text-white transition-colors">
                  Loja
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Contatos</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1" />
                <div>
                  <a href="mailto:karol@tucanoronha.com.br" className="text-gray-300 hover:text-white transition-colors">
                    karol@tucanoronha.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1" />
                <div>
                  <a href="https://wa.me/5511968008888" className="text-gray-300 hover:text-white transition-colors">
                    +55 11 96800-8888
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <div className="text-gray-300">
                  São Paulo, SP - Brasil
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscreva-se para receber ofertas exclusivas.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-tuca-coral text-white"
              />
              <button
                type="submit"
                className="w-full bg-tuca-coral hover:bg-tuca-coral/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tuca Noronha. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
