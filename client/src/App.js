import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [ tasks, setTasks ] = useState(null)

  const authToken = cookies.AuthToken
  const userEmail = cookies.Email

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      if (response.status === 200) {
        const json = await response.json() 
        setTasks(json)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <>
      <ListHeader listName={'🏝️ Holiday tick list'} getData={getData} />
      <p className='user-email'>Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => (
      <ListItem key={task.id} task={task} getData={getData}/>))}
      </>
      }
    </div>
  )
}

export default App
