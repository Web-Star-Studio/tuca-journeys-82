
import React from "react";
import TeamMember from "./TeamMember";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Karol Tuca",
      role: "Fundadora e CEO",
      description: "Apaixonada por Noronha, Karol fundou a Tuca Noronha após mais de 50 viagens ao arquipélago.",
      image: "/lovable-uploads/3e37da64-d22a-4127-8447-69d6e3c61dc4.png",
      initials: "KT"
    },
    {
      name: "Rafael Oliveira",
      role: "Gerente de Experiências",
      description: "Especialista em passeios e atividades, Rafael conhece os melhores spots da ilha.",
      image: "/lovable-uploads/7b44c0fe-f8a4-490f-bc6d-4dd7e025c278.png",
      initials: "RO"
    },
    {
      name: "Marina Santos",
      role: "Consultora de Viagens",
      description: "Marina cria roteiros personalizados para cada perfil de viajante.",
      image: "/lovable-uploads/cd81e007-b687-426e-9059-a599e95ea9f8.png", 
      initials: "MS"
    },
    {
      name: "Lucas Mendes",
      role: "Guia Local",
      description: "Nascido e criado em Noronha, Lucas compartilha histórias e segredos da ilha.",
      image: "/lovable-uploads/c8a4052e-a65d-4ff5-ade2-082544f30b82.png",
      initials: "LM"
    }
  ];

  return (
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
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              description={member.description}
              image={member.image}
              initials={member.initials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
