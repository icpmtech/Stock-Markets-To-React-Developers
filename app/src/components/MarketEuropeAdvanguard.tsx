export interface MarketEuropeAdvanguard {
  summaryDetail: SummaryDetail;
  price: Price;
}

export interface SummaryDetail {
  // Define properties for summary detail
  // Example:
  property1: string;
  property2: number;
  // ...
}

export interface Price {
  // Define properties for price
  // Example:
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  // ...
}
