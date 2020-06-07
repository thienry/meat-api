export const environment = {
	server: { port: process.env.Server_PORT || 3000 },
	database: { url: process.env.DB_URL || 'mongodb+srv://admin:qh3Ldghx5MFcZtdW@meat-db-v2vzb.mongodb.net/meat-db?retryWrites=true&w=majority' },
	security: { saltRounds: process.env.saltRounds || 10 }
}