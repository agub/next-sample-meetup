import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetupDetails = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetupDetails.title}</title>
				<meta
					name='description'
					content={props.meetupDetails.description}
				/>
			</Head>
			<MeetupDetail
				title={props.meetupDetails.title}
				image={props.meetupDetails.image}
				address={props.meetupDetails.address}
				description={props.meetupDetails.description}
			/>
		</>
	);
};

export async function getStaticPaths() {
	const uri =
		'mongodb+srv://shin:vNVyPUFqF7GCZuDq@cluster0.aobcw.mongodb.net/meetups?retryWrites=true&w=majority';
	const options = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	};

	const client = await MongoClient.connect(uri);

	const collection = client.db('test').collection('meetups');

	const meetups = await collection.find({}, { _id: 1 }).toArray();
	client.close();
	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;
	console.log(meetupId);
	const uri =
		'mongodb+srv://shin:vNVyPUFqF7GCZuDq@cluster0.aobcw.mongodb.net/meetups?retryWrites=true&w=majority';
	const options = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	};

	const client = await MongoClient.connect(uri);

	const collection = client.db('test').collection('meetups');

	const selectedMeetup = await collection.findOne({
		_id: ObjectId(meetupId),
	});

	client.close();
	return {
		props: {
			meetupDetails: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;
