import {
  Box,
  HStack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import {
  LedgerContext,
  currentPortfolioValue,
  portfolioValueAtDate,
} from "../App";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Dashboard() {
  const { ledger, setLedger } = useContext(LedgerContext);
  const [portfolioValue, setPortfolioValue] = useState(
    currentPortfolioValue(ledger)
  );

  // Get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [oldValue, setOldValue] = useState(
    portfolioValueAtDate(ledger, yesterday)
  );

  useEffect(() => {
    setPortfolioValue(currentPortfolioValue(ledger));
  }, [ledger]);

  useEffect(() => {
    console.log(portfolioValue);
  }, [portfolioValue]);

  // Percentage change
  var percentChange = (portfolioValue - oldValue) / oldValue;

  return (
    <Box className="Dashboard">
      <Heading as="h2" size="xl">
        {formatter.format(portfolioValue)}
      </Heading>
      <Heading
        as="h2"
        size="md"
        color={portfolioValue > oldValue ? "green.500" : "red.500"}
      >
        {portfolioValue > oldValue ? "▲" : "▼"}{" "}
        {formatter.format(portfolioValue - oldValue)} (
        {100 * ((portfolioValue - oldValue) / oldValue)}%){" "}
      </Heading>
      <Spacer h="50" />
      <Tabs
        onChange={(index) => {
          switch (index) {
            case 0:
              let yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              setOldValue(portfolioValueAtDate(ledger, yesterday));
              break;
            case 1:
              let last_week = new Date();
              last_week.setDate(last_week.getDate() - 1);
              setOldValue(portfolioValueAtDate(ledger, last_week));
              break;
            case 2:
              let last_month = new Date();
              last_month.setDate(last_month.getDate() - 1);
              setOldValue(portfolioValueAtDate(ledger, last_month));
              break;
            case 3:
              let last_year = new Date();
              last_year.setDate(last_year.getDate() - 1);
              setOldValue(portfolioValueAtDate(ledger, last_year));
              break;
          }
        }}
      >
        <TabPanels>
          <TabPanel>
            <p>DAY!</p>
          </TabPanel>
          <TabPanel>
            <p>WEEK!</p>
          </TabPanel>
          <TabPanel>
            <p>MONTH!</p>
          </TabPanel>
          <TabPanel>
            <p>YEAR!</p>
          </TabPanel>
        </TabPanels>

        <TabList>
          <Tab>1D</Tab>
          <Tab>1W</Tab>
          <Tab>1M</Tab>
          <Tab>1Y</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
}
