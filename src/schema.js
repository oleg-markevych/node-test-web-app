
const newPostProperties = {
	text: { type: 'string' },
    author: { type: 'string' }
}

const savedPostProperties = {
	text: { type: 'string' },
    author: { type: 'string' },
    createdAt: {type: 'string' },
    updatedAt: {type: 'string' },
    _id: {type: 'string'}
}

module.exports.createPostOptions = {
	schema: {
		body: {
			type: 'object',
  			additionalProperties: false,
  			required: [
        			'text',
        			'author'
        			],
  			properties: newPostProperties
  		},
  		response: {
  			201: {
  				type: 'object',
  				properties: savedPostProperties
  			}
  		}
  	}
}

module.exports.getSinglePostSchema = {
		schema: {
  		response: {
  			200: {
  				type: 'object',
  				properties: savedPostProperties
  			}
  		}
  	}
}

module.exports.getMultiplePostsSchema = {
		schema: {
  		response: {
  			200: {
  				type: 'array',
  				properties: savedPostProperties
  			}
  		}
  	}
}

module.exports.updatePostOptions = {
	schema: {
		body: {
			type: 'object',
  			additionalProperties: false,
  			required: [
        			'text',
        			'author'
        			],
  			properties: newPostProperties
  		},
  		response: {
  			200: {
  				type: 'object',
  				properties: savedPostProperties
  			}
  		}
  	}
}

module.exports.patchPostOptions = {
	schema: {
		body: {
			type: 'object',
  			additionalProperties: false,
  			properties: newPostProperties
  		},
  		response: {
  			200: {
  				type: 'object',
  				properties: savedPostProperties
  			}
  		}
  	}
}