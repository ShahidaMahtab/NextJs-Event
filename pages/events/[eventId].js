import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import Comments from '@/components/input/comments';
import { getEventById, getFeaturedEvents } from '@/helpers/api-util';
import { Fragment } from 'react';

const EventDetailPage = (props) => {
	const event = props.selectedEvent;
	if (!event) {
		return (
			<div className='mx-auto container mt-16'>
				<p className='animate-spin'>Loading ...</p>
			</div>
		);
	}
	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</Fragment>
	);
};

export default EventDetailPage;

export const getStaticProps = async (context) => {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);
	return {
		props: {
			selectedEvent: event,
		},
		revalidate: 30,
	};
};

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));

	return {
		paths: paths,
		fallback: 'blocking',
	};
};
