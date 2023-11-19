import { Box } from '@mui/system'
import ModeSelect from '../../components/ModeSelect'

function AppBar() {
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (them) => them.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect/>
      </Box>
    </>
  )
}

export default AppBar
