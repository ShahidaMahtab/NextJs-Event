import Button from '../ui/button';
import classes from './results-title.module.css';

function ResultsTitle(props) {
	const { date } = props;

	const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<section className={`${classes.title} space-y-8`}>
			<h1 className='mb-4'>Events in {humanReadableDate}</h1>
			<Button link='/events '>Show all events</Button>
		</section>
	);
}

export default ResultsTitle;
