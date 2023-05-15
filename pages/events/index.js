import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/helpers/api-util';
import { useRouter } from 'next/router';
import React from 'react';

const AllEventsPage = ({ event }) => {
	const router = useRouter();
	//const event = getAllEvents();
	const findEventsHandler = (year, month) => {
		const fullpath = `/events/${year}/${month}`;
		router.push(fullpath);
	};
	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={event} />
		</>
	);
};

export default AllEventsPage;

export const getStaticProps = async () => {
	const event = await getAllEvents();
	return {
		props: {
			event,
		},
		revalidate: 60,
	};
};
