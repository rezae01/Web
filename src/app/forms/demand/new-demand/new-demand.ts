export interface User {
  RequesterId: number;
  CalculationData?: [{
    TrfType?: number;
    // postcode?: string;
  }]
}