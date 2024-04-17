import React, { useEffect, useState } from "react";
import {
	Stack,
	Spinner,
	useTheme,
	Container,
	SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import MarketCard from "./MarketCard";
import { MarketEuropeAdvanguard } from "./MarketEuropeAdvanguard";
import { transformData } from "./transformData";

function MarketOverview(props: { symbols: string }) {
	const [isLoading, setIsLoading] = useState(true);
	const [marketsEurope, setStockMarketsEurope] = useState<MarketEuropeAdvanguard[]>([]);
	const symbols = props.symbols || "DAX,^FCHI,^IBEX,PSI20.LS";
	const url = `/api/markets?symbols=${symbols}`;

	useEffect(() => {
		axios.get(url).then((res) => {
			const transformedData = transformData(res.data[0]);
			setStockMarketsEurope([transformedData]);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<Stack align="center" justify="center" h="100vh">
				<Spinner />
			</Stack>
		);
	}

	return (
		<Container maxW="container.xl">
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
				{marketsEurope.map((market, index) => (
					<MarketCard key={index} MarketEuropeAdvanguard={market} />
				))}
			</SimpleGrid>
		</Container>
	);
}

export default MarketOverview;
