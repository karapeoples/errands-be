module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/errands.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},

	// update the following configuration to use PostgreSQL
		production: {
			client: 'pg',
			connection: process.env.DATABASE_URL,
			migrations: {
				directory: './data/migrations',
			},
			seeds: {
				directory: './data/seeds',
			},
		},
	}