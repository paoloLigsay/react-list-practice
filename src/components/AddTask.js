import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onChangeReminder = (e) => {
    setReminder(e.currentTarget.checked)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return(
    <form onSubmit={onSubmit}>
      <label htmlFor=""> Task </label>
      <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
      <input type="text" placeholder="Add Day" value={day} onChange={(e) => setDay(e.target.value)}/>
      <input type="checkbox" checked={reminder} value={reminder} onChange={onChangeReminder}/>
      <input type="submit" value="save task"></input>
    </form>
  )
}

export default AddTask