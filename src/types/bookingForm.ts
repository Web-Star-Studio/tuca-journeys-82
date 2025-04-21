
export interface BookingFormValues {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  specialRequests?: string;
  paymentMethod: string;
  couponCode?: string;
  termsAccepted: boolean;
}

export interface CouponData {
  code: string;
  discountPercentage: number;
}
