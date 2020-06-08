import { Server } from './server/server'
import { usersRouter } from './users/users.router'
import { reviewsRouter } from './reviews/reviews.router'
import { restaurantsRouter } from './restaurants/restaurants.router'

const server = new Server()

server.bootstrap([
	usersRouter,
	restaurantsRouter,
	reviewsRouter
])
	.then(server => {
		console.log(`Server is listening on: ${server.application.address()}`)
	})
	.catch(err => {
		console.log('Server failed to start!')
		console.log(err)
		process.exit(1)
	})
