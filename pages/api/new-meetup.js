import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		console.log(data);
		const uri =
			'mongodb+srv://shin:vNVyPUFqF7GCZuDq@cluster0.aobcw.mongodb.net/meetups?retryWrites=true&w=majority';
		const options = {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		};

		const client = await MongoClient.connect(uri, options);

		const collection = client.db('test').collection('meetups');
		const result = await collection.insertOne(data);
		console.log(result);
		client.close();
		res.status(201).json({ message: 'meetup inserted!!!!!' });
	}
}

export default handler;
