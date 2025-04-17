
import React, { useState } from 'react';
import { useUserPreferences } from '@/hooks/use-user-preferences';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const PreferencesQuestionnaire = () => {
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  const [step, setStep] = useState(0);
  
  // Questions to ask the user to refine recommendations
  const questions = [
    {
      title: "Qual é seu estilo de viagem preferido?",
      type: "radio",
      field: "travel_style",
      options: [
        { label: "Aventura", value: "adventure" },
        { label: "Relaxamento", value: "relaxation" },
        { label: "Cultural", value: "cultural" },
        { label: "Romântico", value: "romantic" },
        { label: "Familiar", value: "family" }
      ]
    },
    {
      title: "Quais atividades você gosta durante uma viagem?",
      type: "checkbox",
      field: "activities",
      options: [
        { label: "Trilhas", value: "hiking" },
        { label: "Mergulho", value: "diving" },
        { label: "Praia", value: "beach" },
        { label: "Passeios culturais", value: "cultural_tours" },
        { label: "Gastronomia", value: "food" },
        { label: "Vida noturna", value: "nightlife" }
      ]
    },
    {
      title: "Qual é sua frequência de viagens?",
      type: "radio",
      field: "travel_frequency",
      options: [
        { label: "Mensal", value: "monthly" },
        { label: "Trimestral", value: "quarterly" },
        { label: "Semestral", value: "biannually" },
        { label: "Anual", value: "yearly" },
        { label: "Raramente", value: "rarely" }
      ]
    }
  ];
  
  const currentQuestion = questions[step];
  
  const handleRadioChange = (value: string) => {
    if (currentQuestion.field === "travel_style" || currentQuestion.field === "travel_frequency") {
      updatePreferences({ [currentQuestion.field]: value });
    }
  };
  
  const handleCheckboxChange = (checked: boolean, value: string) => {
    if (currentQuestion.field === "activities") {
      const currentActivities = preferences?.activities || [];
      let updatedActivities;
      
      if (checked) {
        updatedActivities = [...currentActivities, value];
      } else {
        updatedActivities = currentActivities.filter(item => item !== value);
      }
      
      updatePreferences({ activities: updatedActivities });
    }
  };
  
  const nextQuestion = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };
  
  const prevQuestion = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Refine suas recomendações</CardTitle>
        <CardDescription>
          Responda algumas perguntas para recebermos sugestões mais personalizadas para você.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-6">
            <h3 className="text-lg font-medium">{currentQuestion.title}</h3>
          </div>
          
          {currentQuestion.type === "radio" && (
            <RadioGroup 
              value={
                currentQuestion.field === "travel_style" 
                  ? preferences?.travel_style 
                  : preferences?.travel_frequency
              } 
              onValueChange={handleRadioChange}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
          
          {currentQuestion.type === "checkbox" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.value}
                    checked={preferences?.activities?.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(checked as boolean, option.value)
                    }
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              disabled={step === 0}
            >
              Anterior
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={step === questions.length - 1 || isLoading}
            >
              {isLoading ? "Salvando..." : "Próxima"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesQuestionnaire;
