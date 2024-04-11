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

interface MarketItem {
	currentPrice: string;
	priceHint: string;
	maxAge: string;
	symbol: string;

	
}

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

function MarketOverview(props: { symbol: string }) {
	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState<MarketItem>();

	let accentColor =
		useTheme()["components"]["Link"]["baseStyle"]["color"].split(".")[0];

	useEffect(() => {
		axios.get("/api/markets/" + (props.symbol || "")).then((res) => {
			debugger;
			setNews(res.data);
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
	const markets = [
		{ name: 'DAX', value: '17,954.48', change: '-0.79%', difference: '-142.82' },
		{ name: 'FTSE 100', value: '7,923.80', change: '-0.47%', difference: '-37.41' },
		{ name: 'CAC 40', value: '8,023.74', change: '-0.27%', difference: '-21.64' },
		{ name: 'IBEX 35', value: '10,649.80', change: '-1.16%', difference: '-125.20' },
		{ name: 'STOXX 50', value: '4,966.68', change: '-0.68%', difference: '-34.15' }
	  ];
	return (
		<>
		  <Container maxW="container.xl">
   
      <StatGroup>
        {markets.map((market, index) => (
			 <Card>
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
            <Stat>
              <StatLabel>{market.name}</StatLabel>
              <StatNumber>{market.value}</StatNumber>
              <StatHelpText>
                <StatArrow type={market.change.includes('-') ? 'decrease' : 'increase'} />
                {market.change} ({market.difference})
              </StatHelpText>
            </Stat>
			
          </Box>
		  </Card>
        ))}
      </StatGroup>
    </Container>
		</>
	);
}

export default MarketOverview;
