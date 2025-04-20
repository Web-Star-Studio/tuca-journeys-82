
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface CouponFormProps {
  onApplyCoupon: (discount: number, code: string) => void;
}

interface CouponResult {
  valid: boolean;
  discount: number;
  message: string;
}

// Simula validação de cupom
const validateCoupon = async (code: string): Promise<CouponResult> => {
  // Simular atraso de rede
  await new Promise(resolve => setTimeout(resolve, 800));

  // Cupons de demonstração
  const demoCoupons: Record<string, { discount: number; message: string }> = {
    "BEMVINDO10": { discount: 10, message: "10% de desconto aplicado!" },
    "VERAO2025": { discount: 15, message: "15% de desconto aplicado!" },
    "NORONHA25": { discount: 25, message: "25% de desconto aplicado!" },
  };
  
  if (code.toUpperCase() in demoCoupons) {
    const coupon = demoCoupons[code.toUpperCase()];
    return { valid: true, discount: coupon.discount, message: coupon.message };
  }
  
  return { valid: false, discount: 0, message: "Cupom inválido ou expirado." };
};

const CouponForm: React.FC<CouponFormProps> = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<CouponResult | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error("Por favor, informe um código de cupom");
      return;
    }
    
    setIsValidating(true);
    
    try {
      const result = await validateCoupon(couponCode);
      setValidationResult(result);
      
      if (result.valid) {
        toast.success(result.message);
        onApplyCoupon(result.discount, couponCode);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      toast.error("Erro ao validar cupom. Tente novamente.");
      setValidationResult(null);
    } finally {
      setIsValidating(false);
    }
  };
  
  const resetCoupon = () => {
    setCouponCode("");
    setValidationResult(null);
    onApplyCoupon(0, "");
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4">
      <h3 className="font-medium mb-3">Cupom de desconto</h3>
      
      {validationResult?.valid ? (
        <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
          <div className="flex items-center">
            <CheckCircle2 className="text-green-500 h-5 w-5 mr-2" />
            <div>
              <div className="font-medium text-green-700">{couponCode}</div>
              <div className="text-sm text-green-600">{validationResult.message}</div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetCoupon}
            className="text-gray-500 hover:text-gray-700"
          >
            Remover
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Digite o código do cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isValidating}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isValidating || !couponCode.trim()}
          >
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Aplicar"
            )}
          </Button>
        </form>
      )}
      
      {validationResult?.valid === false && (
        <div className="flex items-center mt-2 text-sm text-red-500">
          <XCircle className="h-4 w-4 mr-1" />
          {validationResult.message}
        </div>
      )}
    </div>
  );
};

export default CouponForm;
