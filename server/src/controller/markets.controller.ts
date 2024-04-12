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

const getMarketsEurope = async (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['News']
	*/
	var symbols = req.params.symbols || "DAX,%5EFCHI,%5EIBEX,PSI20.LS";
	if (!symbols) {
        return res.status(400).send({ error: "No symbols provided" });
    }
	const symbolList = symbols.split(',');
	
	try {
        const results = await fetchFinancialDataForSymbols(symbolList);
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data for symbols" });
    }

};

async function fetchFinancialDataForSymbols(symbols: string[]): Promise<any[]> {
    const fetchPromises = symbols.map(symbol => {
        const cachedData = cache.get(symbol);
        if (cachedData) {
            return Promise.resolve(cachedData);
        }
        return fetchFinancialData(symbol);
    });

    return Promise.all(fetchPromises);
}

async function fetchFinancialData(symbol: string): Promise<any> {
	const options: QuoteSummaryOptions = {
        modules: ['price', 'summaryDetail'] // Specify the modules you want to fetch
    };
    try {
        const data = await yahooFinance.quoteSummary(symbol, options);
        cache.set(symbol, data);
        return data;
    } catch (error) {
        console.error(`Failed to fetch data for ${symbol}: ${error}`);
        throw error;
    }
}

export default { getMarketsEurope };
