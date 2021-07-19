describe('Add an Authenticated Admin', () => {
	beforeEach(() => {
		cy.exec('knex seed:run');
		cy.register('Test Admin', 'password', 'admin');
		cy.register('Test User 1', 'password', 'consumer');
		cy.register('Test User 2', 'password', 'consumer');
	});
	it('Gets All Admins', () => {
		cy.login('Test Admin', 'password');
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
		const id = 1;
		cy.request(options).then((res) => {
			expect(res.status).equal(200);
			expect(res.body).property('message').equal(`Removed Consumer id ${id} from the database`);
		});
	});
});

describe('Checks User Tasks', () => {
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
