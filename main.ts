import * as restify from 'restify'

const server = restify.createServer({
  name: 'meat-api',
  version: '0.0.1'
})

server.get('/hello', (req, res, next) => {
  res.json({ message: 'Hello World' })
  return next()
})

server.listen(3000, () => {
  console.log('API is running...')
})