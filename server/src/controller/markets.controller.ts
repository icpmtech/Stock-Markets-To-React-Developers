import axios from "axios";
import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const ALPHA_VANTAGE_API_KEY = 'SF6UH88CL3UM7VXA';

const getMarketsEurope = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['News']
    */
    const symbols = req.params.symbols || "DAX";
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
        return fetchFinancialData(symbol);
    });

    return Promise.all(fetchPromises);
}

async function fetchFinancialData(symbol: string): Promise<any> {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = response.data;
        if (data && data['Global Quote']) {
            return data['Global Quote'];
        } else {
            throw new Error(`Failed to fetch data for ${symbol}`);
        }
    } catch (error) {
        console.error(`Failed to fetch data for ${symbol}: ${error}`);
        throw error;
    }
}

export default { getMarketsEurope };
