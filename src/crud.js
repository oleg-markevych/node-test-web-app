const {MongoClient, ObjectID} = require('mongodb');
const dbName = "social_network";
const collectionName = "post";

class PostCrudRepository {

	constructor(client) {
		this.client = client;
	}

	async save(post) {
		post.createdAt = new Date().toISOString();
		const result = await this.client.db(dbName).collection(collectionName).insertOne(post);
		post._id = result.insertedId;
		return post;
	}

	async findById(id) {
		const result = await this.client.db(dbName).collection(collectionName)
			.findOne({"_id": new ObjectID(id)});
		if (result) {
			return result;
		}
		return {};
 	}

	async findAll() {
		return await this.client.db(dbName).collection(collectionName).find().toArray();
	}

	async update(id, updateList) {
		updateList.updatedAt = new Date().toISOString();
		await this.client.db(dbName).collection(collectionName)
			.updateOne({"_id":new ObjectID(id)}, {$set: updateList});
	}

	async delete(id) {
		await this.client.db(dbName).collection(collectionName)
			.deleteOne({"_id":new ObjectID(id)});
	}
}

module.exports.init = async (dbUrl, errCallback) => {
	try {
		const dbUri = dbUrl + `/${dbName}?retryWrites=true&w=majority`;
		const client = new MongoClient(dbUri);
		await client.connect();
		return new PostCrudRepository(client);
	} catch (err) {
		errCallback(err);
		throw "Unexpected error has been occurred while inializing MongoClient";
	}
}