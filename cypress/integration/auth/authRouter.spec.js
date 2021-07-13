describe('Testing Test', () => {
	it('Testing is working', () => {
		expect(true).to.equal(true);
	});
});

describe('API is Alive', () => {
	it('Checks the server is alive', () => {
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
			.its('body')
			.as('newUser')
			.then((res) => {
				expect(res).property('token');
				expect(res.createdUser).property('username').to.equal('Test Admin');
				expect(res.createdUser).property('role').to.equal('admin');
        expect(res.roleId).property('user_id').to.be.a('number');
			});
  });

	it('Registers a Consumer', () => {
		cy
			.request('POST', '/api/welcome/register', { username: 'Test User', password: 'password', role: 'consumer' })
			.its('body')
			.as('newUser')
			.then((res) => {
				expect(res).property('token');
				expect(res.createdUser).property('username').to.equal('Test User');
				expect(res.createdUser).property('role').to.equal('consumer');
        expect(res.roleId).property('user_id').to.be.a('number');
			});
	});
});
