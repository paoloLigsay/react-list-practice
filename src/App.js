import Header from './components/header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  //Fetch Task
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Delete a Task

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE',
      })

    setTasks(tasks.filter(task => task.id !== id))


  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  const addTask  = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // console.log(task)

    // const id =Math.floor(Math.random() * 10000) + 1
    // console.log(id)

    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    // setTasks([...tasks, newTask])
    
  }

  return (
    <Router>
      <div className="App">
        <Header title='Hello' onShow={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

        <Route 
          path='/'
          exact
          render={(props) => (
          <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {
                tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                : 'Please add a Task.'
              }
          </>
        )}
        
        />

        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router> 
  );
}

export default App;
