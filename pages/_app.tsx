import { AppProps } from "next/dist/next-server/lib/router/router"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { RestLink } from "apollo-link-rest"
import compareAsc from "date-fns/compareAsc"

import "../styles/index.css"

interface CloseApproachData {
  epoch_date_close_approach: number
  miss_distance: {
    kilometers: number
  }
}

interface NearEarthObject {
  name: string
  close_approach_data: CloseApproachData
}

const restLink = new RestLink({
  uri: "https://api.nasa.gov/neo/rest/v1/",
  responseTransformer: async (response) => {
    const json = await response.json()

    const asteroids = Object.values(json.near_earth_objects).flat()

    return asteroids
      .map((asteroid: NearEarthObject) => {
        if (asteroid.close_approach_data[0]) {
          return {
            name: asteroid.name,
            date: asteroid.close_approach_data[0].epoch_date_close_approach,
            missInKms: asteroid.close_approach_data[0].miss_distance.kilometers,
          }
        }
      })
      .sort((asteroidA, asteroidB) =>
        compareAsc(new Date(asteroidA.date), new Date(asteroidB.date)),
      )
  },
})

const client = new ApolloClient({
  link: restLink,
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
