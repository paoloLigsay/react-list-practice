import Button from'./Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onShow, showAdd}) => {
  const location = useLocation()

  return(
    <header>
      <h1> Task Tracker {title} </h1>
      {location.pathname === '/' && 
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'close' : 'add'} onShow={onShow}/>
      }
      
    </header>
  )
}

export default Header