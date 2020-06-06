import * as restify from 'restify'

import { environment } from '../common/environment'

export class Server {
  application: restify.Server

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'meat-api',
          version: '0.0.1'
        })

        this.application.use(restify.plugins.queryParser())

        this.application.get('/hello', (req, res, next) => {
          res.json({ message: 'Hello World' })
          return next()
        })

        this.application.listen(environment.server.port, () => {
          resolve(this.application)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this)
  }
}