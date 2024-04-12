

export interface Price {
  maxAge: number;
  preMarketSource?: string;
  regularMarketChangePercent: number;
  regularMarketChange: number;
  regularMarketTime: string;
  priceHint: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  averageDailyVolume10Day: number;
  averageDailyVolume3Month: number;
  regularMarketPreviousClose: number;
  regularMarketSource: string;
  regularMarketOpen: number;
  exchange: string;
  exchangeName: string;
  exchangeDataDelayedBy: number;
  marketState: string;
  quoteType: string;
  symbol: string;
  underlyingSymbol?: any;
  shortName: string;
  longName: string;
  currency: string;
  quoteSourceName: string;
  currencySymbol: string;
  fromCurrency?: any;
  toCurrency?: any;
  lastMarket?: any;
}
