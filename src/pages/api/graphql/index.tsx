// pages/api/graphql.js
import { ApolloServer } from 'apollo-server-micro'
import schema from './schema'
import { MongoClient } from 'mongodb'

let db

const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
        if (!db) {
            try {
                const dbClient = new MongoClient(process.env.MONGO_DB_URI,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    }
                )
                if (!dbClient.isConnected()) await dbClient.connect()
                db = dbClient.db(process.env.MONGO_DB_NAME) // database name
                console.log("connected to mongo database: ", dbClient.isConnected())
            } catch (e) {
                console.log('--->error while connecting with graphql context (db)', e)
            }
        }

        return { db }
    },
})

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default handler