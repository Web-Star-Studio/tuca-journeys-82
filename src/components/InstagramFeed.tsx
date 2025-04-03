
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramFeed = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-tuca-light-blue to-tuca-light-green">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Nos Siga no Instagram
          </h2>
          
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Acompanhe nossas aventuras, dicas exclusivas e promoções especiais em nossos perfis no Instagram
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium mb-2">@tucanoronha</h3>
              <p className="text-gray-600 mb-4">Nosso perfil principal com todas as novidades e promoções</p>
              <a
                href="https://instagram.com/tucanoronha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Instagram className="h-5 w-5 mr-2" />
                  Seguir
                </Button>
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium mb-2">@agenciatucanoronha</h3>
              <p className="text-gray-600 mb-4">Conheça os bastidores da nossa agência e nossa equipe</p>
              <a
                href="https://instagram.com/agenciatucanoronha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Instagram className="h-5 w-5 mr-2" />
                  Seguir
                </Button>
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium mb-2">@fernandodenoronha</h3>
              <p className="text-gray-600 mb-4">Imagens deslumbrantes e informações sobre a ilha</p>
              <a
                href="https://instagram.com/fernandodenoronha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Instagram className="h-5 w-5 mr-2" />
                  Seguir
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
