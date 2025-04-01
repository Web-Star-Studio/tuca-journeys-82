
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TourDetailAccordion = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="cancelation">
        <AccordionTrigger>Política de Cancelamento</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Cancelamento gratuito até 48 horas antes do passeio.</li>
            <li>Cancelamentos com menos de 48 horas de antecedência não são reembolsáveis.</li>
            <li>Em caso de condições climáticas adversas, o passeio pode ser remarcado sem custo adicional.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="accessibility">
        <AccordionTrigger>Acessibilidade</AccordionTrigger>
        <AccordionContent>
          <p className="mb-2">Nossa empresa se esforça para tornar os passeios acessíveis a todos os visitantes.</p>
          <p>Por favor, entre em contato conosco antecipadamente para discutir suas necessidades específicas de acessibilidade.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TourDetailAccordion;
