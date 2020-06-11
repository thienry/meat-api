import * as jestCli from 'jest-cli'

import { Server } from './server/server'
import { User } from './users/users.model'
import { Review } from './reviews/reviews.model'
import { usersRouter } from './users/users.router'
import { environment } from './common/environment'
import { reviewsRouter } from './reviews/reviews.router'

let server: Server
let address: string
const beforeAllTests = () => {
	environment.database.url = process.env.DB_URL || 'mongodb+srv://admin:qh3Ldghx5MFcZtdW@meat-db-v2vzb.mongodb.net/meat-db-qa?retryWrites=true&w=majority'
	environment.server.port = process.env.SERVER_PORT || 3001
	address = `http://localhost:${environment.server.port}`

	server = new Server()
	return server.bootstrap([usersRouter, reviewsRouter])
		.then(() => User.remove({}).exec())
		.then(() => Review.remove({}).exec())
}

const afterAllTests = () => {
	return server.shutdown()
}

beforeAllTests()
	.then(() => jestCli.run())
	.then(() => afterAllTests())
	.catch(console.error)