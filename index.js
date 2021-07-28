import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
const app = express();

app.use('/gql',graphqlHTTP({
    schema :buildSchema(`
        type RootQuery{
            event : [String!]!
        }
        type RootMutations{
            createEvent(name:String): String
        }

        schema{
            query: RootQuery
            mutation : RootMutations
        }
    `),
    rootValue:{
        event: (args,req)=>{
            console.log(args);
            return ['sarwar','ali']
        },
        createEvent: (args)=>{
            console.log(args);
            let name = args.name;
            return name;
        }
    },
    graphiql:true
}))

app.listen(3001,()=>console.log('server is listening on port 3001'))