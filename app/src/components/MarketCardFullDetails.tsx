import React from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  Heading,
  Text,
  Card
} from '@chakra-ui/react';
import { MarketEurope } from "./MarketEurope";

interface MarketCardProps {
  MarketEurope: MarketEurope;
}

const MarketCard: React.FC<MarketCardProps> = ({ MarketEurope }) => {
  const { price, summaryDetail } = MarketEurope;
  const {
    regularMarketPrice,
    regularMarketDayHigh,
    regularMarketDayLow,
    regularMarketChange,
    regularMarketChangePercent,
    regularMarketVolume,
    currencySymbol
  } = price;

  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
    
      <VStack align="stretch">
        <Heading size="md">{price.shortName}</Heading>
        <Text fontSize="sm">{price.longName}</Text>
        <Stat>
          <StatLabel>Current Price</StatLabel>
          <StatNumber>{`${currencySymbol}${regularMarketPrice.toFixed(2)}`}</StatNumber>
          <StatHelpText>
            <StatArrow type={regularMarketChange > 0 ? 'increase' : 'decrease'} />
            {`${regularMarketChange.toFixed(2)} (${(regularMarketChangePercent * 100).toFixed(2)}%)`}
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Volume</StatLabel>
          <StatNumber>{regularMarketVolume.toLocaleString()}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Day Range</StatLabel>
          <StatNumber>{`${currencySymbol}${regularMarketDayLow.toFixed(2)} - ${currencySymbol}${regularMarketDayHigh.toFixed(2)}`}</StatNumber>
        </Stat>
      </VStack>
      
    </Card>
  );
};

export default MarketCard;
