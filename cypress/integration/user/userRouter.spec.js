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

describe('Add an Authenticated Admin', () => {
    beforeEach(() => {
      cy.exec('knex seed:run');
			cy.register('Test User', 'password', 'consumer');
			cy.register('Test Admin', 'password', 'admin');
    })
  it('Gets All Admins', () => {
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
					expect(res.body).property('username').to.be.a('string').equal('Test User');
					expect(res.body).to.be.a('Object');
					expect(res.body).property('password').to.be.a('string');
					expect(res.body).property('user_id').to.be.a('number').equal(1);
					expect(res.body).property('role').equal('consumer');
    });
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
      expect(res.body.message).equal(`Removed Consumer id ${id} from the database`);
    })
  })
});
