//Shortcut Commands
Cypress.Commands.add('register', (username, password, role) => {
	const options = {
		method: 'POST',
		url: '/api/welcome/register',
		body: {
			username,
			password,
			role,
		},
	};
	cy.request(options).then((res) => {
		Cypress.env('token', res.body.token);
		expect(res.status).eq(201);
		return res;
	});
});

Cypress.Commands.add('login', (username, password) => {
	const options = {
		method: 'POST',
		url: '/api/welcome/login',
		body: {
			username,
			password,
		},
	};
	cy.request(options).then((res) => {
		Cypress.env('token', res.body.token);
		expect(res.status).eq(201);
		return res;
	});
});

Cypress.Commands.add('tasks', (title, description, completeBy) => {
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
			title,
			description,
			completeBy,
		},
	};
	cy.request(options).then((res) => {
		expect(res.status).eq(201);
		return res;
	});
});
//TESTING SUITE START
describe('TESTING TESTS', () => {
	it('Testing Is Working', () => {
		expect(true).eq(true);
	});
	it('Checks The Server Is Running', () => {
		cy.request('/');
	});
});
describe('REGISTER~~LOGIN', () => {
	describe('PASS', () => {
		beforeEach(() => {
			cy.exec('knex seed:run');
		});
		it('Registers An Admin', () => {
			cy.register('Test Admin', 'password', 'admin').then((res) => {
				expect(res.status).eq(201);
				expect(res.body).property('token');
				expect(res.body).property('createdUser').a('Object');
				expect(res.body.createdUser).property('username').a('string').eq('Test Admin');
				expect(res.body.createdUser).property('role').a('string').eq('admin');
				expect(res.body.roleId).property('user_id').a('number').eq(1);
			});
		});
		it('Logs In An Admin', () => {
			cy.register('Test Admin', 'password', 'admin');
			cy.login('Test Admin', 'password').then((res) => {
				expect(res.status).equal(201);
				expect(res.body).property('token');
				expect(res.body).property('user').a('Object');
				expect(res.body.user).property('username').a('string').eq('Test Admin');
				expect(res.body.user).property('role').a('string').eq('admin');
				expect(res.body.roleInfo).property('user_id').a('number').eq(1);
			});
		});
		it('Registers A Consumer', () => {
			cy.register('Test User', 'password', 'consumer').then((res) => {
				expect(res.status).eq(201);
				expect(res.body).property('token');
				expect(res.body).property('createdUser').a('Object');
				expect(res.body.createdUser).property('username').a('string').eq('Test User');
				expect(res.body.createdUser).property('role').a('string').eq('consumer');
				expect(res.body.roleId).property('user_id').a('number').eq(1);
			});
		});
		it('Logs In A Consumer', () => {
			cy.register('Test Admin', 'password', 'admin');
			cy.register('Test User', 'password', 'consumer');
			cy.login('Test User', 'password').then((res) => {
				expect(res.status).equal(201);
				expect(res.body).property('token');
				expect(res.body).property('user').a('Object');
				expect(res.body.user).property('username').a('string').eq('Test User');
				expect(res.body.user).property('role').a('string').eq('consumer');
				expect(res.body.roleInfo).property('user_id').a('number').eq(2);
			});
		});
	});
	describe('FAIL', () => {
		beforeEach(() => {
			cy.exec('knex seed:run');
		});
		it('Fails To Register', () => {
			const options = {
				method: 'POST',
				url: '/api/welcome/register',
				body: {
					username: 'Test Admin',
					password: 'password',
					role: '',
				},
				failOnStatusCode: false,
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(500);
				expect(res.body).property('message').a('string').eq('Was not able to register user');
			});
		});
		it('Login Checks For Valid Credentials', () => {
			const options = {
				method: 'POST',
				url: '/api/welcome/login',
				body: {
					username: 'Test Admin',
					password: 'not the right password',
				},
				failOnStatusCode: false,
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(401);
				expect(res.body).property('message').a('string').eq('Invalid Login Credentials');
			});
		});
	});
});
