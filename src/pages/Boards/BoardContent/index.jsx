import { Box } from '@mui/system'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (them) => `calc(100vh - ${them.trello.appBarHeight} - ${them.trello.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
        Board Content
    </Box>
  )
}

export default BoardContent
