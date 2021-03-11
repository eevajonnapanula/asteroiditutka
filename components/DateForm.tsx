import React, { FunctionComponent, useState } from "react"

interface DateFormProps {
  date: string
  handleDateChange: (changedDate: string) => void
}

const DateForm: FunctionComponent<DateFormProps> = ({ date, handleDateChange }) => {
  const [dateInputValue, setDateInputValue] = useState(date)

  const handleSubmit = (event) => {
    event.preventDefault()
    handleDateChange(event.target.date.value)
  }

  const handleChange = (event: { target: { value: string } }) =>
    setDateInputValue(event.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Alkupäivämäärä:</label>
      <input type="date" id="date" name="date" value={dateInputValue} onChange={handleChange} />
      <button type="submit">Hae</button>
    </form>
  )
}

export default DateForm
