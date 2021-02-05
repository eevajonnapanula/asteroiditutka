import { gql, useQuery } from "@apollo/client"
import { NextPage } from "next"
import Head from "next/head"

const GET_USER = gql`
  query {
    user(userId: 2) {
      id
      email
      username
    }
  }
`

const Home: NextPage = () => {
  const { data } = useQuery(GET_USER)
  return (
    <>
      <Head>
        <title>Template</title>
      </Head>

      <main>{data && <section>{data.user.username}</section>}</main>
    </>
  )
}

export default Home
