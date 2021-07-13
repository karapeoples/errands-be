describe('Testing Test', () => {
	it('Testing is working', () => {
		expect(true).to.equal(true);
	});
});

describe('API is Alive', () => {
	it('Checks The Server is Running', () => {
		cy.request('/');
	});
});

describe('Register~Login~Authentication', () => {
	beforeEach(() => {
		cy.exec('knex seed:run');
	});
	it('Registers An Admin', () => {
		cy
			.request('POST', '/api/welcome/register', { username: 'Test Admin', password: 'password', role: 'admin' })
			.as('newUser')
			.then((res) => {
				expect(res.status).equal(201);
				expect(res.body).property('token');
				expect(res.body.createdUser).property('username').to.equal('Test Admin');
				expect(res.body.createdUser).property('role').to.equal('admin');
				expect(res.body.roleId).property('user_id').to.be.a('number');
			});
	});
	it('Logs In An Admin', () => {
		cy
			.request('POST', '/api/welcome/register', { username: 'Test Admin', password: 'password', role: 'admin' })
			.as('newUser');
		cy.request('POST', '/api/welcome/login', { username: 'Test Admin', password: 'password' }).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('token');
			expect(res.body.user).property('username').to.equal('Test Admin');
			expect(res.body.user).property('role').to.equal('admin');
			expect(res.body.roleInfo).property('user_id').to.be.a('number');
		});
	});

	it('Registers A Consumer', () => {
		cy
			.request('POST', '/api/welcome/register', { username: 'Test User', password: 'password', role: 'consumer' })
			.as('newUser')
			.then((res) => {
				expect(res.status).equal(201);
				expect(res.body).property('token');
				expect(res.body.createdUser).property('username').to.equal('Test User');
				expect(res.body.createdUser).property('role').to.equal('consumer');
				expect(res.body.roleId).property('user_id').to.be.a('number');
			});
	});
	it('Logs In A Consumer', () => {
		cy
			.request('POST', '/api/welcome/register', { username: 'Test User', password: 'password', role: 'consumer' })
			.as('newUser');
		cy.request('POST', '/api/welcome/login', { username: 'Test User', password: 'password' }).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('token');
			expect(res.body.user).property('username').to.equal('Test User');
			expect(res.body.user).property('role').to.equal('consumer');
			expect(res.body.roleInfo).property('user_id').to.be.a('number');
		});
	});
});
