import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('Should return get /users', () => {
	return request(address)
		.get('/users')
		.then(response => {
			expect(response.status).toBe(200)
			expect(response.body.items).toBeInstanceOf(Array)
		})
		.catch(fail)
})

test('Should return post /users', () => {
	return request(address)
		.post('/users')
		.send({
			name: 'John Doe',
			email: 'john@test.com',
			password: 'qwerty',
			cpf: '069.801.744-79'
		})
		.then(response => {
			expect(response.status).toBe(200)
			expect(response.body._id).toBeDefined()
			expect(response.body.name).toBe('John Doe')
			expect(response.body.email).toBe('john@test.com')
			expect(response.body.cpf).toBe('069.801.744-79')
			expect(response.body.password).toBeUndefined()
		})
		.catch(fail)
})

test.skip('Should return error on get /users/aaaa', () => {
	return request(address)
		.get('/users/aaaa')
		.then(response => expect(response.status).toBe(404))
		.catch(fail)
})


/*
test('Should return success on patch /users/:id', () => {
	return request(address)
		.post('/users')
		.send({
			name: 'Fulano',
			email: 'fulano@test.com',
			password: 'qwerty'
		})
		.then(response => {
			request(address)
				.patch(`/users/${response.body._id}`)
				.send({ name: 'Fulano de Tal' })
		})
		.then(response => {
			expect(response.status).toBe(200)
			expect(response.body._id).toBeDefined()
			expect(response.body.name).toBe('Fulano de Tal')
			expect(response.body.email).toBe('fulano@test.com')
			expect(response.body.password).toBeUndefined()
		})
		.catch(fail)
})
*/
