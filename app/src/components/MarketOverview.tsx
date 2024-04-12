import React, { useEffect, useState } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Text,
	SimpleGrid,
	Heading,
	Stack,
	Link,
	Spinner,
	useTheme,
	CardFooter,
	Tag,
	HStack,
	Stat,
	Container,
	Box,
	StatArrow,
	StatGroup,
	StatHelpText,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import axios from "axios";
import { MarketEurope } from "./MarketEurope";
import MarketCard from "./MarketCard";


function timeSince(date: string) {
	const now = Date.now();
	const seconds = Math.floor((now - new Date(date).getTime()) / 1000);
	const intervals = [
		{ name: "years", seconds: 31536000 },
		{ name: "months", seconds: 2592000 },
		{ name: "days", seconds: 86400 },
		{ name: "hours", seconds: 3600 },
		{ name: "minutes", seconds: 60 },
		{ name: "seconds", seconds: 1 },
	];

	for (const interval of intervals) {
		const value = Math.floor(seconds / interval.seconds);
		if (value >= 1) {
			return `${value} ${interval.name} ago`;
		}
	}

	return "Just now";
}
interface MarketCardProps {
  MarketEurope: MarketEurope;
}
function MarketOverview(props: { symbols: string }) {
	const [isLoading, setIsLoading] = useState(true);
	const [marketsEurope, setSotckMarketsEurope] = useState<MarketEurope[]>([]);
  const symbols = props.symbols || "DAX,^FCHI,^IBEX,PSI20.LS";
  const url = `/api/markets?symbols=${symbols}`;
	let accentColor =
		useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

	useEffect(() => {
		axios.get(url).then((res) => {
			debugger;
			setSotckMarketsEurope(res.data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<Stack align="center" justify="center" h="100%">
				<Spinner />
			</Stack>
		);
	}

	return (
		<>
		   <Container maxW="container.xl">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {marketsEurope.map((market, index) => (
          <MarketCard key={index} MarketEurope={market} />
        ))}
      </SimpleGrid>
    </Container>
		</>
	);
}

export default MarketOverview;
