import { Flex, Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import React from 'react';

function StockTracker() {
  const stocks = [
    { name: 'DAX', value: 17766.23, change: -260.35, percentChange: -1.44 },
    { name: 'FTSE 100', value: 7820.36, change: -145.17, percentChange: -1.82 },
    // ... add other stocks here
  ];

  return (
    <Flex direction="row" justify="space-around" align="center" p={4}>
      {stocks.map((stock, index) => (
        <Box key={index} p={3} border="1px" borderColor="gray.200" borderRadius="md">
          <Stat>
            <StatLabel>{stock.name}</StatLabel>
            <StatNumber>{stock.value.toLocaleString()}</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              {stock.change.toLocaleString()} ({stock.percentChange}%)
            </StatHelpText>
          </Stat>
        </Box>
      ))}
    </Flex>
  );
}

export default StockTracker;
