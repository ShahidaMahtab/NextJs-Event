import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/helpers/api-util';
import { useRouter } from 'next/router';
import React from 'react';

const FilteredEventsPage = (props) => {
	const router = useRouter();
	/* const filterData = router.query.slug;
	if (!filterData) {
		return <p>Loading...</p>;
	}
	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth; */
	if (props.hasError) {
		return (
			<>
				<ErrorAlert>
					<p>invalid filters please adjust your values</p>
				</ErrorAlert>
				<div className=''>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		);
	}
	const filteredEvents = props.events;
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the choosen filter</p>
				</ErrorAlert>
				<div className='mx-auto '>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		);
	}
	const date = new Date(props.date.year, props.date.month - 1);
	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export default FilteredEventsPage;

export const getServerSideProps = async (context) => {
	const { params } = context;
	const filterData = params.slug;
	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;
	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1
	) {
		return {
			props: { hasError: true },
			notFound: true,
			/* redirect:{
				destination:'/error'
			} */
		};
	}
	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});
	return {
		props: {
			events: filteredEvents,
			date: {
				year: numYear,
				month: numMonth,
			},
		},
	};
};
