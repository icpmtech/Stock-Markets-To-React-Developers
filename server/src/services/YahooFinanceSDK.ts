import axios, { AxiosInstance } from 'axios';

interface QuoteResponse {
  // Define the structure of the quote response
  // This can be adjusted based on the actual response structure
  /* Example:
  quoteResponse: {
    result: {
      symbol: string;
      regularMarketPrice: number;
      // Add more properties as needed
    }[]
  }
  */
}

export class YahooFinanceSDK {
  private baseURL: string;
  private crumb: string;
  private axiosInstance: AxiosInstance;

  constructor(crumb: string) {
    this.baseURL = 'https://query2.finance.yahoo.com/v7/finance';
    this.crumb = crumb;
    this.axiosInstance = axios.create();
  }

  async getQuote(symbol: string): Promise<QuoteResponse | undefined> {
    try {
      const response = await this.axiosInstance.get<QuoteResponse>(
        `${this.baseURL}/quote`,
        {
          params: {
            symbols: symbol,
            crumb: this.crumb
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching quote for symbol ${symbol}: ${error}`);
    }
  }
}
