import React from 'react';
import { Table,Card, Thead, Tbody, Tr, Th, Td, Box, Container, Text } from '@chakra-ui/react';

const MarketsTable = () => {
  const markets = [
    { name: 'DAX', value: '18,115.53', changePercent: '+0.90%', changeValue: '+161.05' },
    { name: 'FTSE 100', value: '8,009.88', changePercent: '+1.09%', changeValue: '+86.08' },
    { name: 'CAC 40', value: '8,093.48', changePercent: '+0.87%', changeValue: '+69.74' },
    { name: 'IBEX 35', value: '10,760.10', changePercent: '+1.04%', changeValue: '+110.30' },
    { name: 'STOXX 50', value: '5,008.09', changePercent: '+0.83%', changeValue: '+41.41' }
  ];

  return (
    <Container maxW="container.xl" p={4}>
      <Card overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Market</Th>
              <Th isNumeric>Value</Th>
              <Th isNumeric>Change (%)</Th>
              <Th isNumeric>Change</Th>
            </Tr>
          </Thead>
          <Tbody>
            {markets.map((market, index) => (
              <Tr key={index}>
                <Td>{market.name}</Td>
                <Td isNumeric>{market.value}</Td>
                <Td isNumeric>{market.changePercent}</Td>
                <Td isNumeric>{market.changeValue}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default MarketsTable;
