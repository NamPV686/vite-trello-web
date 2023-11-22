import { Box } from '@mui/system'
import ModeSelect from '~/components/ModeSelect'
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menu/WorkSpaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menu/Profile'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

function AppBar() {
  return (
    <>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: '2px',
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsOutlinedIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="filled-search"
            label="Search..."
            type="search"
            size='small'
            sx={{ minWidth: 120 }}
          />
          <ModeSelect/>
          <Tooltip title="Notifications">
            <Badge badgeContent={4} color="secondary" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneOutlinedIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </>
  )
}

export default AppBar
