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
import { MarketEuropeAdvanguard } from "./MarketEuropeAdvanguard";

interface MarketCardProps {
  MarketEuropeAdvanguard: MarketEuropeAdvanguard;
}

const MarketCard: React.FC<MarketCardProps> = ({ MarketEuropeAdvanguard }) => {
  const { price, summaryDetail } = MarketEuropeAdvanguard;
  const { open, high, low, close, volume } = price;

  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <VStack align="stretch">
        <Heading size="md">{summaryDetail.property1}</Heading>
        <Text fontSize="sm">{summaryDetail.property2}</Text>
        <Stat>
          <StatLabel>Open</StatLabel>
          <StatNumber>{open}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>High</StatLabel>
          <StatNumber>{high}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Low</StatLabel>
          <StatNumber>{low}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Close</StatLabel>
          <StatNumber>{close}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Volume</StatLabel>
          <StatNumber>{volume}</StatNumber>
        </Stat>
      </VStack>
    </Card>
  );
};

export default MarketCard;
