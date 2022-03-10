const { ApolloServer, gql } = require('apollo-server')

// The GraphQL schema
const typeDefs = gql`
  type Row {
    id: Int!
    row: [Int!]!
  }
  type Query {
    matrix: [Row!]!
  }
  type Mutation {
    updateMatrix(matrix: [[Int!]!]!): Boolean!
  }
`

const matrixSize = Math.floor(Math.random() * 5)
let data = Array.from(new Array(matrixSize)).map((_, idx) => {
    return {
        id: idx+1,
        row: Array.from(new Array(matrixSize)).map((_, idx) => Math.floor(Math.random() * 100))
    }
})


const resolvers = {
   Query: {
      matrix: () => data,
   },
   Mutation: {
      updateMatrix: (_, { matrix }) => {
         data = matrix.map((row, i) => ({ id: i, row }))
         return true
      },
   },
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
})

server.listen().then(({ url }) => {
   console.log(`🚀 Server ready at ${url}`)
})
