describe('TASKS METHODS', () => {
	describe('PASS', () => {
		beforeEach(() => {
			cy.exec('knex seed:run');
			cy.register('Test User 1', 'password', 'consumer');
			cy.register('Test User 2', 'password', 'consumer');
			cy.tasks('Task 1', 'description', '03-03-2022');
			cy.tasks('Task 2', 'description', '03-03-2022');
			cy.tasks('Task 3', 'description', '03-03-2022');
		});
		it('Gets A Task By Id', () => {
			const options = {
				method: 'GET',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(200);
				expect(res.body).a('Object').property('title').a('string').eq('Task 2');
			});
		});
		it('Updates A Task', () => {
			const options = {
				method: 'PUT',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
				body: {
					title: 'The title has changed',
					description: 'Let there be change',
				},
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(200);
				expect(res.body).a('Object').property('message').a('string').eq('The Errand was Updated with the following Info');
				expect(res.body.body).a('Object').property('title').a('string').eq('The title has changed');
				expect(res.body).property('body').property('description').a('string').eq('Let there be change');
			});
		});
		it('Deletes A Task', () => {
			const options = {
				method: 'DELETE',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(200);
				expect(res.body).a('Object').property('success').a('string').eq('Errand with ID 2 has been removed');
				expect(res.body).property('info').a('Object').property('title').a('string').eq('Task 2');
				expect(res.body.info).property('description').a('string').eq('description');
				expect(res.body.info).property('completeBy').a('string').eq('03-03-2022');
				expect(res.body.info).property('consumer_id').a('number').eq(2);
			});
		});
	});
	describe('FAIL', () => {
		it('Task Does Not Exist', () => {
			cy.exec('knex seed:run');
			cy.register('Test User 2', 'password', 'consumer');
			const options = {
				method: 'GET',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
				failOnStatusCode: false,
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(400);
				expect(res.body).a('Object').property('message').a('string').eq('No task with the id of 2');
			});
		});
		it('Updates Receives 500 Error', () => {
			const options = {
				method: 'PUT',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
				failOnStatusCode: false,
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(500);
				expect(res.body).a('Object').property('note').a('string').eq('Some Required Information is Missing');
			});
		});
		it('Deletes A Task', () => {
			cy.exec('knex seed:run');
			cy.register('Test User 2', 'password', 'consumer');
			const options = {
				method: 'DELETE',
				url: '/api/tasks/task/2',
				headers: {
					authorization: Cypress.env('token'),
				},
				failOnStatusCode: false,
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(400);
				expect(res.body).a('Object').property('fail').a('string').eq('No task with the id of 2');
			});
		});
	});
});
