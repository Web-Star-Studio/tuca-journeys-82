
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; 
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ChevronRight, 
  Heart, 
  Calendar, 
  Star, 
  MessageSquare, 
  ChevronLeft 
} from "lucide-react";

interface Recommendation {
  id: number;
  title: string;
  image: string;
  score: number;
}

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

const RecommendationsTab = ({ recommendations }: RecommendationsTabProps) => {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Example questionnaire steps
  const steps = [
    {
      question: "Qual o principal objetivo da sua próxima viagem?",
      options: [
        { id: "relaxation", label: "Relaxar e descansar" },
        { id: "adventure", label: "Aventura e adrenalina" },
        { id: "nature", label: "Contemplar a natureza" },
        { id: "culture", label: "Conhecer a cultura local" },
      ]
    },
    {
      question: "Você prefere atividades na água ou em terra?",
      options: [
        { id: "water", label: "Atividades aquáticas (mergulho, natação)" },
        { id: "land", label: "Atividades terrestres (trilhas, passeios)" },
        { id: "both", label: "Gosto dos dois tipos" }
      ]
    },
    {
      question: "Quantos dias pretende ficar em Fernando de Noronha?",
      options: [
        { id: "short", label: "Até 3 dias" },
        { id: "medium", label: "4 a 7 dias" },
        { id: "long", label: "Mais de 7 dias" }
      ]
    },
    {
      question: "Com quem você planeja viajar?",
      options: [
        { id: "solo", label: "Sozinho(a)" },
        { id: "couple", label: "Em casal" },
        { id: "family", label: "Em família" },
        { id: "friends", label: "Com amigos" }
      ]
    },
    {
      question: "Qual o seu orçamento aproximado para atividades?",
      options: [
        { id: "budget", label: "Econômico (até R$ 1.000)" },
        { id: "medium", label: "Moderado (R$ 1.001 - R$ 3.000)" },
        { id: "premium", label: "Premium (acima de R$ 3.000)" }
      ]
    }
  ];
  
  // Store answers
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  
  const handleAnswerSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentStep]: value
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish questionnaire
      console.log("Questionnaire answers:", answers);
      setIsQuestionnaireOpen(false);
      setCurrentStep(0);
      // Here you would typically send answers to backend
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    setOpenFeedback(false);
    setFeedback("");
    // Here you would typically send feedback to backend
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recomendações Para Você</h3>
          <div className="flex items-center space-x-2">
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsQuestionnaireOpen(true)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Responder Questionário
              </Button>
            </DialogTrigger>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={rec.image}
                  alt={rec.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs font-medium">{rec.score}% match</span>
                </div>
              </div>
              
              <div className="p-3">
                <h4 className="font-medium mb-1">{rec.title}</h4>
                
                <div className="flex items-center justify-between mt-2">
                  <Button variant="ghost" size="sm" className="px-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-xs">Reservar</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="px-2">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-xs">Salvar</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="px-2">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Ver detalhes</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            className="text-tuca-ocean-blue"
            onClick={() => setOpenFeedback(true)}
          >
            Estas recomendações foram úteis? Envie feedback
          </Button>
        </div>
        
        {/* Questionnaire Dialog */}
        <Dialog open={isQuestionnaireOpen} onOpenChange={setIsQuestionnaireOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ajude-nos a personalizar suas recomendações</DialogTitle>
            </DialogHeader>
            
            {steps[currentStep] && (
              <div className="py-4">
                <div className="mb-4 flex justify-between text-sm text-gray-500">
                  <span>Pergunta {currentStep + 1} de {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                
                <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
                  <div 
                    className="h-1 bg-tuca-ocean-blue rounded-full transition-all" 
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                
                <h3 className="text-lg font-medium mb-4">
                  {steps[currentStep].question}
                </h3>
                
                <RadioGroup 
                  value={answers[currentStep]} 
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {steps[currentStep].options.map((option) => (
                    <div 
                      key={option.id} 
                      className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                        answers[currentStep] === option.id 
                          ? 'border-tuca-ocean-blue bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleAnswerSelect(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label 
                        htmlFor={option.id} 
                        className={`flex-grow cursor-pointer ${
                          answers[currentStep] === option.id ? 'font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            <DialogFooter className="flex justify-between">
              {currentStep > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrevStep}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
              )}
              <div className={currentStep === 0 ? 'ml-auto' : ''}>
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  disabled={!answers[currentStep]}
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  ) : 'Finalizar'}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Feedback Dialog */}
        <Dialog open={openFeedback} onOpenChange={setOpenFeedback}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enviar Feedback</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <Label htmlFor="feedback" className="mb-2 block">
                Como podemos melhorar nossas recomendações para você?
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px]"
                placeholder="Compartilhe suas sugestões aqui..."
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpenFeedback(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={handleSubmitFeedback}
                disabled={!feedback.trim()}
              >
                Enviar Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;
