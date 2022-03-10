import Head from 'next/head'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client'

import * as styles from './index.css'
import Editor from './Editor'

const client = new ApolloClient({
   uri: 'http://localhost:4000/graphql',
   cache: new InMemoryCache(),
})

const Home = () => {
   return (
     <div className={styles.container}>
        <ApolloProvider client={client}>
           <Head>
              <title>Tenera code challenge - The Matrix</title>
              <link rel="icon" href="/favicon.png" />
           </Head>

           <main>
              <h1 className={styles.title}>
                 Tenera coding challenge - The Matrix
              </h1>
              <Editor />
           </main>

           <footer>
           </footer>
        </ApolloProvider>
     </div>
   )
}

export default Home
