import { useEffect, useState } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
// const DUMMY_DATA = [
// 	{
// 		id: '123456',
// 		image: 'https://picsum.photos',
// 		title: 'this is dumm y title',
// 		address: 'kannelmaki is my hood',
// 	},
// 	{
// 		id: '123',
// 		image: 'https://picsum.photos',
// 		title: 'this is dummy title SECOND',
// 		address: 'SOMEWHERE ELSE IN FINLAND',
// 	},
// ];

const Homepage = (props) => {
	// const [loadMeetups, setLoadMeetups] = useState([]);
	// useEffect(() => {
	// 	setLoadMeetups(DUMMY_DATA);
	// }, []);
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='browse meet ups' />
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	return {
// 		props: {
// 			meetups: DUMMY_DATA,
// 		},
// 	};
// }

export async function getStaticProps() {
	const uri =
		'mongodb+srv://shin:vNVyPUFqF7GCZuDq@cluster0.aobcw.mongodb.net/meetups?retryWrites=true&w=majority';
	const options = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	};

	const client = await MongoClient.connect(uri, options);

	const collection = client.db('test').collection('meetups');

	const meetups = await collection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		// revalidate: 1,
	};
}

export default Homepage;
