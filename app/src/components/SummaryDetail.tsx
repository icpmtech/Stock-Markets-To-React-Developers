

export interface SummaryDetail {
  maxAge: number;
  priceHint: number;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  trailingPE?: number;
  volume: number;
  regularMarketVolume: number;
  averageVolume: number;
  averageVolume10days: number;
  averageDailyVolume10Day: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  yield?: number;
  totalAssets?: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  navPrice?: number;
  currency: string;
  fromCurrency?: any;
  toCurrency?: any;
  lastMarket?: any;
  coinMarketCapLink?: any;
  algorithm?: any;
  tradeable: boolean;
}
