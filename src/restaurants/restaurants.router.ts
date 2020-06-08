import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'

import { ModelRouter } from '../common/model.router'
import { Restaurant } from './restaurants.model'

class RestaurantsRouter extends ModelRouter<Restaurant> {
	constructor() {
		super(Restaurant)
		this.on('beforeRender', document => {
			document.password = undefined
		})
	}

	envelope(document) {
		const resource = super.envelope(document)
		resource._links.menu = `${this.basePath}/${resource._id}/menu`

		return resource
	}

	findMenu = (req, res, next) => {
		Restaurant.findById(req.params.id, '+menu')
			.then(restaurant => {
				if (!restaurant) {
					throw new NotFoundError('Restaurant not found');
				} else {
					res.json(restaurant.menu)
					return next()
				}
			})
			.catch(next)
	}

	replaceMenu = (req, res, next) => {
		Restaurant.findById(req.params.id)
			.then(restaurant => {
				if (!restaurant) {
					throw new NotFoundError('Restaurant not found');
				}

				restaurant.menu = req.body
				return restaurant.save()
			})
			.then(restaurant => {
				res.json(restaurant.menu)
				return next()
			})
			.catch(next)
	}

	applyRoutes(application: restify.Server) {
		application.get(`${this.basePath}`, this.findAll)
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.post(`${this.basePath}`, this.save)
		application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
		application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
		application.del(`${this.basePath}/:id`, [this.validateId, this.remove])

		application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu])
		application.put(`${this.basePath}/:id/menu`, [this.validateId, this.replaceMenu])
	}
}

export const restaurantsRouter = new RestaurantsRouter()
