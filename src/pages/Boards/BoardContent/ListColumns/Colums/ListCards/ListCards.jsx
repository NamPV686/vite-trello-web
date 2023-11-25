import { Box } from '@mui/system'
import Card from './Card/Card'

function ListCards(props) {
  const { cards } = props
  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
        ${theme.trello.boardContentHeight} -
        ${theme.spacing(5)} -
        ${theme.trello.columnHeaderHeight} -
        ${theme.trello.columnFooterHeight}
      )`,
      '::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
      '::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
    }}>
      {cards?.map((card) => {
        return (
          <Card key={card._id} card={card} />
        )
      })}
    </Box>
  )
}

export default ListCards