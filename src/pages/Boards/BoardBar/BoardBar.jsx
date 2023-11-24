import { Box } from '@mui/system'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

function BoardBar() {
  const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    px: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '&:hover': {
      bgcolor: 'primary.50'
    }
  }
  return (
    <>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: '5px',
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label="Trello Board"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label="Public/Private Workspace"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to Google Driver"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Fillter"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              maxWidth: 90,
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white', opacity: 0.8 }
            }}
          >
            Invite
          </Button>
          <AvatarGroup
            max={4}
            sx={{
              gap: '10px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }
            }}
          >
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://files.fullstack.edu.vn/f8-prod/blog_posts/107/613a1e8d8fc47.jpg'
                alt='Trello'
              />
            </Tooltip>
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-43.jpg'
                alt='Trello'
              />
            </Tooltip>
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-47.jpg'
                alt='Trello'
              />
            </Tooltip>
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-38.jpg'
                alt='Trello'
              />
            </Tooltip>
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-38.jpg'
                alt='Trello'
              />
            </Tooltip>
            <Tooltip title='TrelloDev'>
              <Avatar
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-38.jpg'
                alt='Trello'
              />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar
