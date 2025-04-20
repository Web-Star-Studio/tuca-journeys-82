
export interface BookingFormValues {
  startDate: Date | string;
  endDate: Date | string;
  guests: number;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: string;
  couponCode?: string;
  termsAccepted: boolean;
}

export interface CouponData {
  code: string;
  discountPercentage: number;
}
