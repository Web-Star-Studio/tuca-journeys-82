
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { Users, Heart, Map, Award } from "lucide-react";

const About = () => {
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
                Sobre a Tuca Noronha
              </h1>
              <p className="text-lg md:text-xl">
                Somos especialistas em criar experiências inesquecíveis em
                Fernando de Noronha, com a dedicação e o cuidado que você merece.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Nossa História
                </h2>
                <p className="text-gray-700 mb-4">
                  A Tuca Noronha nasceu da paixão pela beleza natural e única de
                  Fernando de Noronha. Fundada por Karol Tuca, que se encantou pelo
                  arquipélago em sua primeira visita, a agência foi criada com a
                  missão de compartilhar esse paraíso de forma autêntica e
                  sustentável.
                </p>
                <p className="text-gray-700 mb-4">
                  Com mais de 10 anos de experiência, nossa equipe de especialistas
                  conhece cada canto da ilha e trabalha incansavelmente para
                  oferecer roteiros exclusivos e personalizados, sempre respeitando
                  o meio ambiente e as comunidades locais.
                </p>
                <p className="text-gray-700">
                  Nosso compromisso é transformar sua viagem em uma experiência
                  memorável, cuidando de cada detalhe para que você possa
                  aproveitar ao máximo tudo o que Fernando de Noronha tem a
                  oferecer.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/about-team.jpg"
                  alt="Equipe Tuca Noronha"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 border-4 border-tuca-coral rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Nossos Valores
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Na Tuca Noronha, trabalhamos com princípios sólidos que guiam
              todas as nossas ações e decisões
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
                <div className="bg-tuca-light-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-tuca-ocean-blue h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  Atendimento Personalizado
                </h3>
                <p className="text-gray-700">
                  Cada cliente é único, e por isso oferecemos um atendimento
                  personalizado e exclusivo para cada viajante.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
                <div className="bg-tuca-light-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-tuca-green h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  Paixão por Noronha
                </h3>
                <p className="text-gray-700">
                  Amamos o que fazemos e compartilhamos nosso entusiasmo e
                  conhecimento sobre Fernando de Noronha.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
                <div className="bg-tuca-sand w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="text-tuca-coral h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  Conhecimento Local
                </h3>
                <p className="text-gray-700">
                  Nossa equipe conhece todos os segredos e melhores momentos para
                  aproveitar cada atração da ilha.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover-scale">
                <div className="bg-tuca-light-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-tuca-deep-blue h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  Excelência e Qualidade
                </h3>
                <p className="text-gray-700">
                  Compromisso com a excelência em todos os serviços, garantindo a
                  mais alta qualidade em cada detalhe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Conheça Nossa Equipe
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-center mb-16">
              Profissionais apaixonados por Fernando de Noronha e dedicados a
              tornar sua viagem inesquecível
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tuca-ocean-blue">
                  <img
                    src="/team-karol.jpg"
                    alt="Karol Tuca"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Karol Tuca</h3>
                <p className="text-tuca-ocean-blue font-medium mb-2">Fundadora e CEO</p>
                <p className="text-gray-700 text-sm">
                  Apaixonada por Noronha, Karol fundou a Tuca Noronha após mais de 50 viagens ao arquipélago.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tuca-ocean-blue">
                  <img
                    src="/team-rafael.jpg"
                    alt="Rafael Oliveira"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Rafael Oliveira</h3>
                <p className="text-tuca-ocean-blue font-medium mb-2">Gerente de Experiências</p>
                <p className="text-gray-700 text-sm">
                  Especialista em passeios e atividades, Rafael conhece os melhores spots da ilha.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tuca-ocean-blue">
                  <img
                    src="/team-marina.jpg"
                    alt="Marina Santos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Marina Santos</h3>
                <p className="text-tuca-ocean-blue font-medium mb-2">Consultora de Viagens</p>
                <p className="text-gray-700 text-sm">
                  Marina cria roteiros personalizados para cada perfil de viajante.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-tuca-ocean-blue">
                  <img
                    src="/team-lucas.jpg"
                    alt="Lucas Mendes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Lucas Mendes</h3>
                <p className="text-tuca-ocean-blue font-medium mb-2">Guia Local</p>
                <p className="text-gray-700 text-sm">
                  Nascido e criado em Noronha, Lucas compartilha histórias e segredos da ilha.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
