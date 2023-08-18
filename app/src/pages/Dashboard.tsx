import {
	Box,
	Flex,
	Spacer,
	Heading,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import PortfolioPreview from "../components/PortfolioPreview";
import React from "react";
import PositionsList from "../components/PositionsList";
import Newsfeed from "../components/Newsfeed";
import Watchlist from "../components/Watchlist";
import accounts from "../services/accounts.service";

export default function Dashboard() {
	const isOnMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Box className="Dashboard">
			<Flex direction={{ base: "column", md: "row" }} gap={5}>
				<Box flex="0.75">
					{accounts.isAuthenticated() ? (
						<PortfolioPreview />
					) : (
						<>
							<Heading as="h1" size="xl">
								Stotra
							</Heading>
							<Text fontSize="lg">
								Create an account or login to get started!
							</Text>
						</>
					)}
					{!isOnMobile && (
						<>
							<Spacer height={10} />
							<Heading size="md">Stock Market News</Heading>
							<Spacer height={2} />
							<Newsfeed symbol={""} />
						</>
					)}
				</Box>
				<Box
					flex="0.25"
					borderWidth={{ base: 0, md: 1 }}
					borderRadius="md"
					p={{ base: 0, md: 3 }}
					height={"fit-content"}
				>
					{accounts.isAuthenticated() ? (
						<>
							<PositionsList />
							<Spacer h="3" />
							<Watchlist />
						</>
					) : (
						<Box>
							<Heading as="h6" size="xs" textAlign={"center"}>
								(Sign in to view positions and watchlist)
							</Heading>
						</Box>
					)}
				</Box>
			</Flex>
			{isOnMobile && (
				<>
					<Spacer height={10} />
					<Heading size="md">Stock Market News</Heading>
					<Spacer height={2} />
					<Newsfeed symbol={""} />
				</>
			)}
		</Box>
	);
}
