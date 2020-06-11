import * as restify from 'restify'

export const handleError = (
	req: restify.Request,
	res: restify.Response,
	err,
	done
) => {
	err.toJSON = () => {
		return {
			message: err.message
		}
	}

	switch (err.name) {
		case 'MongoError':
			if (err.name === 11000) {
				err.statusCode = 400
			}
			return;

		case 'ValidationError':
			err.statusCode = 400

			const messages: any[] = []
			for (const name in err.errors) {
				messages.push({ messages: err.errors[name].message })
			}

			err.toJSON = () => ({
				message: 'Validation error while processing your request',
				errors: messages
			})
			return;

		default:
			return;
	}

	done()
}