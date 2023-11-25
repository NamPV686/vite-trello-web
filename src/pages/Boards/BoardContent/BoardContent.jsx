import { Box } from '@mui/system'
import ListColums from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent(props) {
  const { board } = props
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* ListColums */}
        <ListColums columns={orderedColumns}/>
      </Box>
    </Box>
  )
}

export default BoardContent
