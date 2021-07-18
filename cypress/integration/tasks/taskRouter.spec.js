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

Cypress.Commands.add('tasks', (title, description, completeBy) => {
	const token = Cypress.env('token');
	const authorization = `${token}`;
	const options = {
		method: 'POST',
		url: '/api/users/user/1/task',
		headers: {
			authorization,
		},
		body: {
			title,
			description,
			completeBy,
		},
	};
	cy
		.request(options)
		.as('resisterResponse')
		.then((res) => {
			return res;
		})
		.its('status')
		.should('eq', 201);
});

describe('CRUD for Tasks', () => {
	beforeEach(() => {
		cy.exec('knex seed:run');
		cy.register('Test User 1', 'pass', 'consumer');
		cy.tasks('Task 1', 'description', '03-03-2022');
		cy.tasks('Task 2', 'description', '03-03-2022');
		cy.tasks('Task 3', 'description', '03-03-2022');
	});
	it('Gets a Task by Id', () => {
		const token = Cypress.env('token');
		const authorization = `${token}`;
		const options = {
			method: 'GET',
			url: '/api/tasks/task/1',
			headers: {
				authorization,
      },
		};
		cy.request(options).then((res) => {
			expect(res.status).eq(200);
			expect(res.body.errand).property('title').eq('Task 1');
		});
	});
});
