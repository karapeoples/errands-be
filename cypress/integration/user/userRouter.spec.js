describe('AUTHENTICATED USER CAN PERFORM USER METHODS', () => {
	describe('ADMIN USER METHODS', () => {
		describe('PASS', () => {
			beforeEach(() => {
				cy.exec('knex seed:run');
				cy.register('Test Admin', 'password', 'admin');
				cy.register('Test User 1', 'password', 'consumer');
				cy.register('Test User 2', 'password', 'consumer');
			});
			it('Gets All Admins', () => {
				cy.register('Test Admin 2', 'password', 'admin');
				cy.register('Test Admin 3', 'password', 'admin');
				cy.login('Test Admin', 'password');
				const options = {
					method: 'GET',
					url: '/api/users/admin',
					headers: {
						authorization: Cypress.env('token'),
					},
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(200);
					expect(res.body).a('Array').length(3);
					expect(res.body[1]).a('Object');
					expect(res.body[1]).property('username').a('string').eq('Test Admin 2');
					expect(res.body[1]).property('password').a('string');
					expect(res.body[1]).property('user_id').a('number').eq(4);
					expect(res.body[1]).property('role').a('string').eq('admin');
				});
			});
			it('Gets All Users', () => {
				const options = {
					method: 'GET',
					url: '/api/users/user',
					headers: {
						authorization: Cypress.env('token'),
					},
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(200);
					expect(res.body).a('Array').length(2);
					expect(res.body[1]).a('Object');
					expect(res.body[1]).property('username').a('string').eq('Test User 2');
					expect(res.body[1]).property('password').a('string');
					expect(res.body[1]).property('user_id').a('number').eq(3);
					expect(res.body[1]).property('role').a('string').eq('consumer');
				});
			});
			it('Gets A Single User', () => {
				const options = {
					method: 'GET',
					url: '/api/users/user/1',
					headers: {
						authorization: Cypress.env('token'),
					},
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(200);
					expect(res.body).a('Object');
					expect(res.body).property('username').a('string').eq('Test User 1');
					expect(res.body).property('password').a('string');
					expect(res.body).property('user_id').a('number').eq(2);
					expect(res.body).property('role').a('string').eq('consumer');
				});
			});
			it('Deletes a User', () => {
				const options = {
					method: 'DELETE',
					url: '/api/users/delete/1',
					headers: {
						authorization: Cypress.env('token'),
					},
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(200);
					expect(res.body).property('message').a('string').eq(`Removed Consumer id 1 from the database`);
					expect(res.body).property('deletedInfo').a('number').eq(1);
				});
			});
		});

		describe('FAIL', () => {
			it('No Admins In Database', () => {
				cy.exec('knex seed:run');
				cy.register('Test User', 'password', 'consumer');
				const options = {
					method: 'GET',
					url: '/api/users/admin',
					headers: {
						authorization: Cypress.env('token'),
					},
					failOnStatusCode: false,
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(400);
					expect(res.body).property('message').a('string').eq('There are no admins!');
				});
			});
			it('No Users In Database', () => {
				cy.exec('knex seed:run');
				cy.register('Test Admin', 'password', 'admin');
				const options = {
					method: 'GET',
					url: '/api/users/user',
					headers: {
						authorization: Cypress.env('token'),
					},
					failOnStatusCode: false,
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(400);
					expect(res.body).property('message').a('string').eq('There are no users!');
				});
			});

			it('No User By That Id', () => {
				cy.exec('knex seed:run');
				cy.register('Test Admin', 'password', 'admin');
				const options = {
					method: 'GET',
					url: '/api/users/user/1',
					headers: {
						authorization: Cypress.env('token'),
					},
					failOnStatusCode: false,
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(400);
					expect(res.body).property('message').a('string').eq('No user with the id of 1');
				});
			});
			it('No User To Delete', () => {
				cy.login('Test Admin', 'password');
				const options = {
					method: 'DELETE',
					url: '/api/users/delete/1',
					headers: {
						authorization: Cypress.env('token'),
					},
					failOnStatusCode: false,
				};
				cy.request(options).then((res) => {
					expect(res.status).eq(400);
					expect(res.body).property('message').a('string').eq('No user with the id of 1');
				});
			});
		});
	});
});
//# Starting Point Again Kara
describe('CONSUMER TASK METHODS', () => {
	describe('PASS', () => {
		after(() => {
			cy.exec('knex seed:run');
		});
		it('Makes a Task', () => {
			cy.exec('knex seed:run');
			cy.register('Test Admin', 'password', 'admin');
			cy.register('Test User 1', 'password', 'consumer');
			cy.register('Test User 2', 'password', 'consumer');
			cy.login('Test User 1', 'password');
			const token = Cypress.env('token');
			const authorization = `${token}`;
			const options = {
				method: 'POST',
				url: '/api/users/user/1/task',
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
				expect(res.body.errand).property('consumer_id').eq(1);
			});
		});
		it('Adds a Task with another user', () => {
			cy.login('Test User 2', 'password');
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
				expect(res.body.errand).property('consumer_id').eq(2);
			});
		});
		it('Returns all Users Tasks', () => {
			cy.login('Test User 2', 'password');
			cy.tasks('Task 2', 'a little info', '03-02-2022');
			cy.tasks('Task 3', 'a little info', '03-02-2022');
			const token = Cypress.env('token');
			const authorization = `${token}`;
			const options = {
				method: 'GET',
				url: '/api/users/user/2/tasks',
				headers: {
					authorization,
				},
			};
			cy.request(options).then((res) => {
				expect(res.status).equal(200);
				expect(res.body).to.have.length(3);
			});
		});
	});
	/* describe('FAIL', () => {

	}) */
});
