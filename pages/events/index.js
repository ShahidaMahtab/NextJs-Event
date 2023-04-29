import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/dummy-data';
import { useRouter } from 'next/router';
import React from 'react';

const AllEventsPage = () => {
	const router = useRouter();
	const event = getAllEvents();
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
