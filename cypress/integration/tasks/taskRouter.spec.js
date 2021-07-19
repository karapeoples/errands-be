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
		it('Gets a Task by Id', () => {
			const token = Cypress.env('token');
			const authorization = `${token}`;
			const options = {
				method: 'GET',
				url: '/api/tasks/task/2',
				headers: {
					authorization,
				},
			};
			cy.request(options).then((res) => {
				expect(res.status).eq(200);
				expect(res.body).property('title').eq('Task 2');
			});
		});
	});
	/* describe('FAIL', () => {

	}) */
});
