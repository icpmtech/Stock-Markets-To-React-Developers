import yahooFinance from "yahoo-finance2";
import { Request, Response } from "express";
import { SearchOptions } from "yahoo-finance2/dist/esm/src/modules/search";

import dotenv from "dotenv";
dotenv.config();

const { SearchApi } = require("financial-news-api");
const searchApi = SearchApi(process.env.StockTracker_NEWSFILTER_API);

// Cache the results for 15 minutes
import NodeCache from "node-cache";
import { QuoteSummaryOptions } from "yahoo-finance2/dist/esm/src/modules/quoteSummary";
const cache = new NodeCache({ stdTTL: 15 * 60 });

const getNews = async (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['News']
	*/
	var symbol = req.params.symbol || "DAX";
	

	
		yahooNews(symbol)
			.then((news) => {
				res.status(200).json(news);
			})
			.catch((err: any) => {
				console.log(err);
				res.status(500).json(err);
			});
		return;

};
//https://github.com/gadicc/node-yahoo-finance2/blob/86becb79607aa4ecefe2184b409777eccf6d3e40/docs/modules/quoteSummary.md
function yahooNews(symbol: string): Promise<any> {
    const options: QuoteSummaryOptions = {
        modules: ['price', 'summaryDetail'] // Specify the modules you want to fetch
    };

    // Default to "OCDO.L" if symbol is empty
    symbol = symbol || "DAX";

    return yahooFinance.quoteSummary(symbol, options)
        .then((response: any) => {
            // Extract price and summaryDetail from the response
            const { price, summaryDetail } = response;
            const financialData = {
                symbol: symbol,
                currentPrice: price.regularMarketPrice,
                priceHint: summaryDetail.priceHint,
                maxAge: summaryDetail.maxAge
            };

            // Cache the fetched data
            cache.set(symbol + "-financialData", financialData);
            return financialData;
        })
        .catch((err: any) => {
            console.error(err);
            throw new Error(`Failed to fetch financial data: ${err}`);
        });
	}

export default { getNews };
