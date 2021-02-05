import { gql, useQuery } from "@apollo/client"
import { NextPage } from "next"
import Head from "next/head"
import AsteroidListItem from "../components/AsteroidListItem"
import format from "date-fns/format"

const GET_ASTEROIDS = gql`
  query Asteroids($date: String) {
    asteroids(start_date: $date, api_key: "O8mUZNEnClJvx5A6xfLAKm2uKMEX9Yvuubmzcf2h")
      @rest(type: "Asteroid", path: "feed?{args}") {
      name
      missInKms
      date
    }
  }
`

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_ASTEROIDS, {
    variables: { date: format(new Date(), "yyyy-MM-dd") },
  })

  return (
    <>
      <Head>
        <title>Asteroiditutka</title>
      </Head>
      <header>
        <h1>Asteroiditutka</h1>
      </header>
      <main>
        {loading ? (
          <div>Ladataan...</div>
        ) : (
          data &&
          data.asteroids.map((asteroid) => <AsteroidListItem key={asteroid.name} {...asteroid} />)
        )}
      </main>
      <footer>
        Made with{" "}
        <span role="img" aria-label="coffee">
          ☕️
        </span>{" "}
        by <a href="https://eevis.codes">Eevis</a>
      </footer>
    </>
  )
}

export default Home
