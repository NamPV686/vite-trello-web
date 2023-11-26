import { Box } from '@mui/system'
import ListColums from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import Colums from './ListColumns/Colums/Colums'
import Card from './ListColumns/Colums/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent(props) {
  const { board } = props
  //Yêu cầu di chuyển chuột 10px thì mới kick hoạt event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  //Yêu cầu di chuyển chuột 10px thì mới kick hoạt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //Nhấn giữ 250ms và dung sai của cảm ứng khoảng 0-500 thì mới kích hoạt even
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  //Ưu tiên sử dụng kết hợp 2 loại sensor là MouseSensor và TouchSensor để có trải nghiệm tốt trên mobile
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //Cùng 1 thời điểm chỉ có 1 phần tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    //Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds, bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //Trigger khi bắt đầu kéo(drag) 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //Trigger quá trình giữa kéo(drag) và thả(drop) 1 phần tử
  const handlDragOver = (event) => {
    //Không làm gì nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // console.log('handlDragOver: ', event)

    //Xử lý thêm nếu kéo card: để kéo card qua lại giữa các column
    const { active, over } = event

    //Kiểm tra nếu không tồn tại active hoặc over(kéo thả linh tinh ra khỏi phạm vi container) return luôn tránh lỗi và crash trang
    if (!active || !over) return

    //activeDraggingCardId: là id của Card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    //overCardId: là id của cái Card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId } = over

    //Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // console.log('overColumn: ', overColumn)
    //Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu trong column ban đầu của nó thì không làm gì
    //Vì đây đang là xử lý lúc kéo (handleDragOver), còn khi kéo xong rồi thì nó lại là vấn đề khác ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        //Tìm vị trí (index) của overCard trong column đích (nơi mà activeCard sắp đc thả)
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //Logic tính toán CardIndex mới (trên hoặc dưới của overCard) - lấy chuần ra từ code của thư viện
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //Clone mảng OrderedColumnsState cũ ra 1 cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //Column cũ
        if (nextActiveColumn) {
          //Xóa card ở cái column active (có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        //Column mới
        if (nextOverColumn) {
          //Kiểm tra xem card đang kéo có tồn tại ở overColumn hay chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced( newCardIndex, 0, activeDragItemData)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }

  }

  //Trigger khi bắt đầu thả(drop) 1 phần tử
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hành động kéo thả - tạm thời không làm gì cả ')
      return
    }

    const { active, over } = event

    //Kiểm tra nếu không tồn tại active hoặc over(kéo thả linh tinh ra khỏi phạm vi container) return luôn tránh lỗi và crash trang
    if (!active || !over) return

    //Nếu vị trí sau khi kéo thả khác vị trí ban đầu
    if (active.id != over.id) {
      //Lấy vị trí cũ từ thằng active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //Lấy vị trí mới từ thằng over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      //Dùng arrayMove để sắp sếp lại mảng Columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //Sau này sử dụng để xử lý khi gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

      //Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)

  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handlDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        {/* ListColums */}
        <ListColums columns={orderedColumns}/>
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Colums column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
