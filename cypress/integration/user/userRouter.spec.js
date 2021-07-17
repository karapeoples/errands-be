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

describe('Add an Authenticated Admin', () => {
    beforeEach(() => {
      cy.exec('knex seed:run');
			cy.register('Test Admin', 'password', 'admin');
			cy.register('Test User 1', 'password', 'consumer');
			cy.register('Test User 2', 'password', 'consumer');
    })
  it('Gets All Admins', () => {
		cy.login('Test Admin', 'password')
		const token = Cypress.env('token');
		const authorization = `${token}`;
		const options = {
			method: 'GET',
			url: '/api/users/admin',
			headers: {
				authorization,
			},
		};
		cy.request(options).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('username').to.be.a('string');
			expect(res.body).to.be.a('Object');
			expect(res.body).property('password').to.be.a('string');
			expect(res.body).property('user_id').to.be.a('number');
			expect(res.body).property('role').equal('admin');
		});
  });
	it('Gets All Users', () => {
		const token = Cypress.env('token');
		const authorization = `${token}`;
		const options = {
			method: 'GET',
			url: '/api/users/user',
			headers: {
				authorization,
			},
		};
		cy.request(options).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('username').to.be.a('string');
			expect(res.body).to.be.a('Object');
			expect(res.body).property('password').to.be.a('string');
			expect(res.body).property('user_id').to.be.a('number');
			expect(res.body).property('role').equal('consumer');
		});
	});
	it('Gets A Single User', () => {
		const token = Cypress.env('token');
		const authorization = `${token}`;
		const options = {
			method: 'GET',
			url: '/api/users/user/1',
			headers: {
				authorization,
			},
		};
		cy.request(options).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('username').to.be.a('string').equal('Test User 1');
			expect(res.body).to.be.a('Object');
			expect(res.body).property('password').to.be.a('string');
			expect(res.body).property('user_id').to.be.a('number').equal(2);
			expect(res.body).property('role').equal('consumer');
		});
	});
	it('Makes a Task', () => {
		cy.login('Test User 1', 'password');
		 	const token = Cypress.env('token');
			const authorization = `${token}`;
			const options = {
				method: 'POST',
				url: '/api/users/user/1/task',
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
  it('Adds a Task with another user', () => {
    cy.login('Test User 2', 'password')
    const token = Cypress.env('token');
    const authorization = `${token}`;
    const options = {
					method: 'POST',
					url: '/api/users/user/2/task',
					headers: {
						authorization,
					},
					body: {
						title: 'A Title',
						description: 'A Description',
						completeBy: '7-17-2021',
					},
				};
    cy.request(options).then((res) => {
      expect(res.status).equal(201);
      expect(res.body.errand).property('consumer_id').to.equal(2)
		})
		it('Returns all Users Tasks', () => {
			const options = {
				method: 'GET',
				url: '/api/users/user/2/tasks',
			};
			cy.request(options).then((res) => {
				expect(res.status).equal(200);
				expect(res.body.errand).property('consumer_id').to.equal(2);
			});
		})
  })






  it('Deletes a User', () => {
        const token = Cypress.env('token');
				const authorization = `${token}`;
				const options = {
					method: 'DELETE',
					url: '/api/users/delete/1',
					headers: {
						authorization,
					},
        };
    const id = 1
    cy.request(options).then((res) => {
      expect(res.status).equal(200)
      expect(res.body).property('message').equal(`Removed Consumer id ${id} from the database`);
    })
  })
});
