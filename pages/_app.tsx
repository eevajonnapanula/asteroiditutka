import { AppProps } from "next/dist/next-server/lib/router/router"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import "../styles/index.css"

const client = new ApolloClient({
  uri: "https://api.graphqlplaceholder.com/",
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
