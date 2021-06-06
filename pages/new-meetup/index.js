import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
const NewMeetupPage = () => {
	const router = useRouter();
	async function meetupFunction(newMeetupData) {
		// const response = await axios.post('/api/new-meetup', newMeetupData);
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(newMeetupData),
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();
		console.log(data);
		router.push('/');
	}
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='browse meet ups' />
			</Head>
			<NewMeetupForm onAddMeetup={meetupFunction} />
		</>
	);
};

export default NewMeetupPage;
