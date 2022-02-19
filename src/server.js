
const fastify = require('fastify')({ logger: true });
const crud = require(`./crud.js`);
const schema = require(`./schema.js`);

const port = 8000;
const host = '0.0.0.0';

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

const postCrudRepositoryPromise = new Promise((resolve, reject) => {
	resolve(crud.init(dbUrl, err => fastify.log.error(err)));
}).then(
	result => {
		postCrudRepository = result;
	},
	error => {
		fastify.log.error("Error has been occurred " + error);
	});

let postCrudRepository;

fastify.get('/', schema.getMultiplePostsSchema, async (req, res) => {
	res.code(200);
	return postCrudRepository.findAll();
});

fastify.get('/:postId', schema.getSinglePostSchema, async (req, res) => {
	return postCrudRepository.findById(req.params.postId);
});

fastify.post('/', schema.createPostOptions, async (req, res) => {
	const createdPost = postCrudRepository.save(req.body);
	res.code(201);
	return createdPost;
});

fastify.put('/:postId', schema.updatePostOptions, async (req, res) => {
	postCrudRepository.update(req.params.postId, req.body);
	res.code(200);
	return postCrudRepository.findById(req.params.postId);
});

fastify.patch('/:postId', schema.patchPostOptions, async (req, res) => {
	postCrudRepository.update(req.params.postId, req.body);
	res.code(200);
	return postCrudRepository.findById(req.params.postId);
});


fastify.delete('/:postId', async (req, res) => {
	postCrudRepository.delete(req.params.postId);
	res.code(204);
});



const start = async () => {
	try {
		await postCrudRepositoryPromise;
		await fastify.listen(port, host);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}

start();
