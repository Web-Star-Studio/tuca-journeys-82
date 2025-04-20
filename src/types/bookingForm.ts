
export interface BookingFormValues {
  startDate: Date | string;
  endDate: Date | string;
  guests: number;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
  couponCode?: string;
  termsAccepted: boolean;
}

export interface CouponData {
  code: string;
  discountPercentage: number;
}
