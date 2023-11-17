import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/home'
import { pink } from '@mui/material/colors/'
import AccountBalance from '@mui/icons-material/accountbalance'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeToggle />
      <hr />
      <Button variant="contained">Hello world</Button>
      <p>Hello</p>
      <Typography variant="body2" color="text.red">
        h1. Heading
      </Typography>

      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
      <AccountBalance color="action" />
    </>
  )
}

export default App
