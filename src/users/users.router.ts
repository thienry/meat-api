import * as restify from 'restify'

import { User } from './users.model'
import { ModelRouter } from '../common/model.router'
import { authorize } from '../security/authz.handler'
import { authenticate } from '../security/auth.handler'

class UsersRouter extends ModelRouter<User> {
	constructor() {
		super(User)
		this.on('beforeRender', document => {
			document.password = undefined
		})
	}

	findByEmail = (req, res, next) => {
		if (req.body.email) {
			User.findByEmail(req.body.email)
				.then(user => user ? [user] : [])
				.then(this.renderAll(res, next, {
					pageSize: this.pageSize,
					url: req.url
				}))
				.catch(next)
		} else {
			next()
		}
	}

	applyRoutes(application: restify.Server) {
		application.post(`${this.basePath}`, [authorize('admin'), this.save])
		application.get(`${this.basePath}`, [authorize('admin'), this.findAll])
		application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
		application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.remove])
		application.put(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validateId, this.replace])
		application.patch(`${this.basePath}/:id`, [authorize('admin', 'user'), this.validateId, this.update])

		application.post(`${this.basePath}/authenticate`, authenticate)
	}
}

export const usersRouter = new UsersRouter()
