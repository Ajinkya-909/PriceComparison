import { Info } from "lucide-react";
import { motion } from "framer-motion";
import type { Installment } from "@/hooks/useProductById";

interface InstallmentPlansProps {
  installments: Installment[];
  selectedTenure?: number;
  onSelect?: (tenure: number) => void;
  minPurchaseAmount?: number;
}

export default function InstallmentPlans({
  installments,
  selectedTenure,
  onSelect,
  minPurchaseAmount,
}: InstallmentPlansProps) {
  if (installments.length === 0) {
    return null;
  }

  // Sort by tenure months
  const sorted = [...installments].sort((a, b) => a.tenureMonths - b.tenureMonths);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Installment Options</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sorted.map((plan, idx) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect?.(plan.tenureMonths)}
            disabled={!plan.isAvailable}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTenure === plan.tenureMonths
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${!plan.isAvailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="text-center">
              <p className="text-sm font-semibold text-muted-foreground mb-1">
                {plan.tenureMonths} Months
              </p>
              <p className="text-lg font-bold text-foreground">₹{plan.monthlyPayment}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Total: ₹{plan.totalAmount}
              </p>
              {plan.interestRate > 0 && (
                <p className="text-xs text-warning mt-1">
                  Interest: {plan.interestRate}%
                </p>
              )}
              {plan.processingFee > 0 && (
                <p className="text-xs text-muted-foreground">
                  + ₹{plan.processingFee} fee
                </p>
              )}
              {!plan.isAvailable && (
                <p className="text-xs text-destructive mt-2">Not Available</p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {minPurchaseAmount && (
        <p className="text-xs text-muted-foreground">
          * EMI available on purchases above ₹{minPurchaseAmount.toLocaleString()}
        </p>
      )}
    </div>
  );
}
