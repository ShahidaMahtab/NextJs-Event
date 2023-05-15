const handler = (req, res) => {
	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		console.log(email);
		if (
			!email.include('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid Input' });
			return;
		}
	}
	const newComment = {
		id: new Date().toISOString(),
		email,
		name,
		text,
	};
	console.log(newComment);
	res.status(201).json({ message: 'Added Comments.', comment: newComment });
	if (req.method === 'GET') {
		const dummyList = [
			{ id: 'C1', name: 'Marwa', text: 'A first comment' },
			{ id: 'C2', name: 'Shahida', text: 'A Second comment' },
		];
		res.status(200).json({ comments: dummyList });
	}
};

export default handler;
