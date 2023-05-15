import EventList from '@/components/events/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';
import { getFeaturedEvents } from '@/helpers/api-util';

import React from 'react';

const HomePage = ({ featuredEvents }) => {
	//const featuredEvents = getFeaturedEvents();
	//console.log(featuredEvents);
	return (
		<div>
			{' '}
			<NewsletterRegistration />
			<EventList items={featuredEvents} />
		</div>
	);
};

export default HomePage;
export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			featuredEvents,
		},
		revalidate: 1800,
	};
};
