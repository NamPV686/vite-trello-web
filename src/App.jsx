import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/home'
import { pink } from '@mui/material/colors'

function App() {

  return (
    <>
      <Button variant="contained">Hello world</Button>
      <p>Hello</p>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
