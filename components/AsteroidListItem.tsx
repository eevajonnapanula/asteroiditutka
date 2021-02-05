import React, { FunctionComponent } from "react"
import format from "date-fns/format"

interface AsteroidListItemProps {
  name: string
  date: number
  missInKms: number
}

const AsteroidListItem: FunctionComponent<AsteroidListItemProps> = ({ name, date, missInKms }) => (
  <article className="asteroid-list-item">
    <h2>{name}</h2>
    <p>{Math.round(missInKms)} km</p>
    <p>{format(new Date(date), "dd.MM.yyyy HH:mm")}</p>
  </article>
)

export default AsteroidListItem
