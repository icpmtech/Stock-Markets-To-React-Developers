
import { MarketEuropeAdvanguard } from "./MarketEuropeAdvanguard";

export function transformData(data: any): MarketEuropeAdvanguard {
	return {
		summaryDetail: {
			// Define properties for summary detail
			// Example:
			property1: data["01. symbol"],
			property2: parseFloat(data["02. open"]),
			// ...
		},
		price: {
			// Define properties for price
			// Example:
			open: parseFloat(data["02. open"]),
			high: parseFloat(data["03. high"]),
			low: parseFloat(data["04. low"]),
			close: parseFloat(data["05. price"]),
			volume: parseInt(data["06. volume"]),
			// ...
		}
	};
}
