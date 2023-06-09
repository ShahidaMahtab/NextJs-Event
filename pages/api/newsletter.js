const handler = (req, res) => {
	console.log('connect');
	if (req.method === 'POST') {
		const userEmail = req.body.email;
		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Invalid Email Address' });
			return;
		}
		console.log(userEmail);
		res.status(201).json({ message: 'Signed Up!' });
	}
};

export default handler;
