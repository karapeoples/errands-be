Cypress.Commands.add('register', (username, password, role) => {
	cy
		.request({
			method: 'POST',
			url: '/api/welcome/register',
			body: {
				username,
				password,
				role,
			},
		})
		.as('registerResponse')
		.then((response) => {
			Cypress.env('token', response.body.token);
			return response;
		})
		.its('status')
		.should('eq', 201);
});
Cypress.Commands.add('login', (username, password) => {
	cy
		.request({
			method: 'POST',
			url: '/api/welcome/login',
			body: {
				username,
				password,
			},
		})
		.as('registerResponse')
		.then((response) => {
			Cypress.env('token', response.body.token);
			return response;
		})
		.its('status')
		.should('eq', 200);
});


describe('Add User', () => {
  beforeEach(() => {
    cy.exec('knex seed:run');
    cy.register('Test User 1', 'password', 'consumer');
    cy.register('Test User 2', 'password', 'consumer')
  })
  it('Adds a Task', () => {
    const token = Cypress.env('token');
    const authorization = `${token}`;
    const options = {
      method: 'POST',
      url: '/api/tasks',
      headers: {
        authorization,
      },
      body:{
        title: 'A Title',
        description: 'A Description',
        completeBy: '7-17-2021',
      },
    };
    cy.request(options).then((res) => {
      expect(res.status).equal(201);
      expect(res.body.errand).property('consumer_id').to.equal(2)
    })
  })
  it('Adds a Task with another user', () => {
    cy.login('Test User 1', 'password')
    const token = Cypress.env('token');
    const authorization = `${token}`;
    const options = {
      method: 'POST',
      url: '/api/tasks',
      headers: {
        authorization,
      },
      body:{
        title: 'A Title',
        description: 'A Description',
        completeBy: '7-17-2021',
      },
    };
    cy.request(options).then((res) => {
      expect(res.status).equal(201);
      expect(res.body.errand).property('consumer_id').to.equal(1)
    })
  })
})