import HomeIcon from '@mui/icons-material/home'
import { pink } from '@mui/material/colors/'
import AccountBalance from '@mui/icons-material/accountbalance'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/system'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{ width: 20, display: 'flex', gap: 1 }}>
            <LightModeOutlinedIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ width: 20, display: 'flex', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" />Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ width: 20, display: 'flex', gap: 1 }}>
            <WysiwygOutlinedIcon fontSize="small" />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {

  return (
    <>
      <ModeSelect/>
      <hr />
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
