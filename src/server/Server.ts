import * as restify from 'restify'
import * as mongoose from 'mongoose'

import { Router } from '../common/router'
import { environment } from '../common/environment'
import { mergePatchBodyParser } from './merge-patch.parser'

export class Server {
	application: restify.Server

	initializeDb() {
		(<any>mongoose).Promise = global.Promise

		return mongoose.connect(environment.database.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}

	initRoutes(routers: Router[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this.application = restify.createServer({
					name: 'meat-api',
					version: '0.0.1'
				})

				this.application.use(restify.plugins.queryParser())
				this.application.use(restify.plugins.bodyParser())
				this.application.use(mergePatchBodyParser)

				// Routes
				routers.forEach(router => router.applyRoutes(this.application))

				this.application.listen(environment.server.port, () => {
					resolve(this.application)
				})
			} catch (err) {
				reject(err)
			}
		})
	}


	bootstrap(routers: Router[] = []): Promise<Server> {
		return this.initializeDb().then(() => this.initRoutes(routers).then(() => this))

	}
}