import { gql, useQuery } from "@apollo/client"
import { NextPage } from "next"
import Head from "next/head"
import AsteroidListItem from "../components/AsteroidListItem"
import format from "date-fns/format"
import LoadingSpinner from "../components/LoadingSpinner"
import DateForm from "../components/DateForm"
import { useState } from "react"

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
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))

  const { data, loading } = useQuery(GET_ASTEROIDS, {
    variables: { date },
  })

  const handleDateChange = (changedDate: string) => {
    setDate(changedDate)
  }

  return (
    <>
      <Head>
        <title>Asteroiditutka</title>
      </Head>
      <header>
        <h1>Asteroiditutka</h1>
        <DateForm date={date} handleDateChange={handleDateChange} />
      </header>
      <main>
        {loading ? (
          <LoadingSpinner />
        ) : (
          data && (
            <section className="asteroid-list">
              {data.asteroids.map((asteroid) => (
                <AsteroidListItem key={asteroid.name} {...asteroid} />
              ))}
            </section>
          )
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
