
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationalInput from './ConversationalInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  TravelPreference, 
  TravelStyle, 
  BudgetRange,
  AccommodationType, 
  Activity 
} from '@/types/user-preferences';
import { useTravelPreferences } from '@/hooks/use-travel-preferences';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, ChevronRight } from 'lucide-react';

const travelStyles = [
  { value: 'adventure', label: 'Aventura' },
  { value: 'relaxation', label: 'Relaxamento' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'nature', label: 'Natureza' },
  { value: 'gastronomic', label: 'Gastronômico' }
];

const activities = [
  { value: 'hiking', label: 'Trilhas' },
  { value: 'diving', label: 'Mergulho' },
  { value: 'snorkeling', label: 'Snorkeling' },
  { value: 'boat_tours', label: 'Passeios de Barco' },
  { value: 'wildlife_watching', label: 'Observação de Fauna' },
  { value: 'beach', label: 'Praia' },
  { value: 'photography', label: 'Fotografia' },
  { value: 'local_cuisine', label: 'Culinária Local' },
  { value: 'historical_sites', label: 'Pontos Históricos' },
  { value: 'surfing', label: 'Surf' },
  { value: 'fishing', label: 'Pesca' },
  { value: 'sunset_watching', label: 'Observação do Pôr do Sol' }
];

const accommodationTypes = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'pousada', label: 'Pousada' },
  { value: 'resort', label: 'Resort' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'apartment', label: 'Apartamento' }
];

const budgetRanges = [
  { value: 'economy', label: 'Econômico' },
  { value: 'medium', label: 'Médio' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxo' }
];

interface ConversationalFormProps {
  onComplete: (preferences: TravelPreference) => void;
  initialData?: Partial<TravelPreference>;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({ 
  onComplete,
  initialData = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<TravelPreference>>({
    travel_style: '',
    group_size: 1,
    trip_duration: 5,
    activities: [],
    accommodation_types: [],
    budget_range: '',
    special_requests: '',
    ...initialData
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const { savePreferences, isLoading } = useTravelPreferences();
  const [showAll, setShowAll] = useState(false);

  // Simulate typing effect for questions
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit the form
      savePreferences(formData as TravelPreference);
      onComplete(formData as TravelPreference);
    }
  };

  const updateFormData = (key: keyof TravelPreference, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Check if the current step is complete and can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!formData.travel_style;
      case 1: return !!formData.group_size && formData.group_size > 0;
      case 2: return !!formData.trip_duration && formData.trip_duration > 0;
      case 3: return formData.activities && formData.activities.length > 0;
      case 4: return formData.accommodation_types && formData.accommodation_types.length > 0;
      case 5: return !!formData.budget_range;
      default: return true;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 transition-all">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Vamos planejar sua viagem para Fernando de Noronha
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Nosso assistente virtual vai ajudar a personalizar sua experiência
        </p>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <AnimatePresence>
          {/* Travel Style */}
          <ConversationalInput
            question={
              <>
                Olá! Estou aqui para ajudar a planejar sua viagem perfeita para Fernando de Noronha. 
                <span className="block mt-2">Para começar, qual é o seu estilo de viagem preferido?</span>
              </>
            }
            isActive={currentStep === 0}
            isAnswered={currentStep > 0}
          >
            {currentStep === 0 ? (
              <div className="space-y-3">
                {travelStyles.map((style) => (
                  <motion.div
                    key={style.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={formData.travel_style === style.value ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto py-3 px-4"
                      onClick={() => updateFormData('travel_style', style.value)}
                    >
                      {style.label}
                      {formData.travel_style === style.value && (
                        <ChevronRight className="ml-auto h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>
                ))}
                
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="mt-4 w-full"
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>{travelStyles.find(s => s.value === formData.travel_style)?.label}</p>
            )}
          </ConversationalInput>

          {/* Group Size */}
          <ConversationalInput
            question={
              <>
                {formData.travel_style === 'adventure' && "Para uma aventura em Noronha, é bom saber com quantas pessoas você vai!"}
                {formData.travel_style === 'relaxation' && "Para relaxar em Noronha, saber o tamanho do grupo ajuda a encontrar o lugar perfeito."}
                {formData.travel_style === 'cultural' && "Para aproveitar a cultura de Noronha, quantas pessoas estarão com você?"}
                {formData.travel_style === 'nature' && "Conhecer a natureza de Noronha é melhor com boas companhias. Quantas pessoas viajarão?"}
                {formData.travel_style === 'gastronomic' && "Para experiências gastronômicas em Noronha, é bom saber o tamanho do grupo."}
                <span className="block mt-2">Quantas pessoas estarão na sua viagem (incluindo você)?</span>
              </>
            }
            isActive={currentStep === 1}
            isAnswered={currentStep > 1}
          >
            {currentStep === 1 ? (
              <div className="space-y-4">
                <Input
                  type="number"
                  min={1}
                  value={formData.group_size || ''}
                  onChange={(e) => updateFormData('group_size', parseInt(e.target.value) || 1)}
                  className="max-w-xs"
                />
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>{formData.group_size} {formData.group_size === 1 ? 'pessoa' : 'pessoas'}</p>
            )}
          </ConversationalInput>

          {/* Trip Duration */}
          <ConversationalInput
            question={
              <>
                {formData.group_size && formData.group_size > 3 ? 
                  `Um grupo de ${formData.group_size} pessoas! Vamos encontrar acomodações perfeitas para todos.` : 
                  `Perfeito! ${formData.group_size === 1 ? 'Você estará' : `Vocês ${formData.group_size} estarão`} indo para um paraíso!`
                }
                <span className="block mt-2">Por quantos dias pretende ficar em Fernando de Noronha?</span>
              </>
            }
            isActive={currentStep === 2}
            isAnswered={currentStep > 2}
          >
            {currentStep === 2 ? (
              <div className="space-y-4">
                <Input
                  type="number"
                  min={1}
                  value={formData.trip_duration || ''}
                  onChange={(e) => updateFormData('trip_duration', parseInt(e.target.value) || 1)}
                  className="max-w-xs"
                />
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>{formData.trip_duration} {formData.trip_duration === 1 ? 'dia' : 'dias'}</p>
            )}
          </ConversationalInput>

          {/* Activities */}
          <ConversationalInput
            question={
              <>
                {formData.trip_duration && formData.trip_duration < 4 ? 
                  `${formData.trip_duration} dias é curto, mas dá para aproveitar muito! Vamos otimizar seu tempo.` : 
                  `${formData.trip_duration} dias é perfeito para explorar as maravilhas de Noronha!`
                }
                <span className="block mt-2">Quais atividades mais interessam a você? (selecione ao menos uma)</span>
              </>
            }
            isActive={currentStep === 3}
            isAnswered={currentStep > 3}
          >
            {currentStep === 3 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {activities.map((activity) => (
                    <div key={activity.value} className="flex items-center space-x-2 p-2 border rounded">
                      <Checkbox
                        id={`activity-${activity.value}`}
                        checked={(formData.activities || []).includes(activity.value)}
                        onCheckedChange={(checked) => {
                          const currentActivities = formData.activities || [];
                          if (checked) {
                            updateFormData('activities', [...currentActivities, activity.value]);
                          } else {
                            updateFormData('activities', currentActivities.filter(a => a !== activity.value));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`activity-${activity.value}`}
                        className="text-sm cursor-pointer"
                      >
                        {activity.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>
                {formData.activities?.map(a => 
                  activities.find(act => act.value === a)?.label
                ).join(', ')}
              </p>
            )}
          </ConversationalInput>

          {/* Accommodation Types */}
          <ConversationalInput
            question={
              <>
                {formData.activities && formData.activities.includes('diving') ? 
                  "Mergulho em Noronha é incrível! Vou te indicar os melhores pontos." : 
                  "Ótimas escolhas de atividades! Vamos fazer você aproveitar ao máximo."
                }
                <span className="block mt-2">Quais tipos de hospedagem você prefere? (selecione ao menos uma)</span>
              </>
            }
            isActive={currentStep === 4}
            isAnswered={currentStep > 4}
          >
            {currentStep === 4 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {accommodationTypes.map((accType) => (
                    <div 
                      key={accType.value}
                      className={`
                        px-3 py-2 rounded-full border cursor-pointer transition-all
                        ${(formData.accommodation_types || []).includes(accType.value) 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'}
                      `}
                      onClick={() => {
                        const current = formData.accommodation_types || [];
                        if (current.includes(accType.value)) {
                          updateFormData('accommodation_types', current.filter(a => a !== accType.value));
                        } else {
                          updateFormData('accommodation_types', [...current, accType.value]);
                        }
                      }}
                    >
                      {accType.label}
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>
                {formData.accommodation_types?.map(a => 
                  accommodationTypes.find(acc => acc.value === a)?.label
                ).join(', ')}
              </p>
            )}
          </ConversationalInput>

          {/* Budget Range */}
          <ConversationalInput
            question={
              <>
                {formData.accommodation_types && formData.accommodation_types.includes('resort') ? 
                  "Os resorts em Noronha são incríveis, com vistas deslumbrantes!" : 
                  `${formData.accommodation_types && formData.accommodation_types.includes('pousada') ? 'As pousadas locais' : 'As hospedagens'} em Noronha têm muito charme e hospitalidade!`
                }
                <span className="block mt-2">Para nos ajudar a encontrar as melhores opções, qual é a sua faixa de orçamento para esta viagem?</span>
              </>
            }
            isActive={currentStep === 5}
            isAnswered={currentStep > 5}
          >
            {currentStep === 5 ? (
              <div className="space-y-4">
                <Select
                  value={formData.budget_range || ''}
                  onValueChange={(value) => updateFormData('budget_range', value)}
                >
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Selecione seu orçamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Continuar
                </Button>
              </div>
            ) : (
              <p>
                {budgetRanges.find(b => b.value === formData.budget_range)?.label}
              </p>
            )}
          </ConversationalInput>

          {/* Special Requests */}
          <ConversationalInput
            question={
              <>
                {formData.budget_range === 'luxury' ? 
                  "Excelente! Vamos garantir uma experiência luxuosa e exclusiva em Noronha." : 
                  formData.budget_range === 'economy' ? 
                  "Vamos encontrar as melhores opções com custo-benefício para você aproveitar Noronha!" : 
                  "Perfeito! Vamos encontrar opções que ofereçam o melhor valor para o seu orçamento."
                }
                <span className="block mt-2">Tem algum pedido especial ou informação adicional que devemos saber? (opcional)</span>
              </>
            }
            isActive={currentStep === 6}
            isAnswered={currentStep > 6}
          >
            {currentStep === 6 ? (
              <div className="space-y-4">
                <Textarea
                  value={formData.special_requests || ''}
                  onChange={(e) => updateFormData('special_requests', e.target.value)}
                  placeholder="Restrições alimentares, acessibilidade, comemorações especiais..."
                  className="max-w-lg"
                />
                <Button 
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Concluir'
                  )}
                </Button>
              </div>
            ) : (
              <p>
                {formData.special_requests || 'Nenhum pedido especial'}
              </p>
            )}
          </ConversationalInput>

          {/* Final step */}
          {currentStep === 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                Perfeito! Suas preferências foram salvas.
              </h3>
              <p className="text-green-600 dark:text-green-500">
                Agora podemos personalizar sua experiência em Fernando de Noronha com base nas suas preferências.
              </p>
              <Button 
                onClick={() => setShowAll(true)}
                variant="outline"
                className="mt-4"
              >
                Ver minhas preferências
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default ConversationalForm;
