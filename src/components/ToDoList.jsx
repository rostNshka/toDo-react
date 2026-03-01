import ToDoItem from './ToDoItem'

const ToDoList = (props) => {
  const {
    tasks = [],
    filteredTasks,
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
  } = props

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length > 0

  if (!hasTasks) {
    return <div className="todo__empty-message">Задач пока нет</div>
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Задачи не найдены</div>
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
          <ToDoItem
            className='todo__item'
            key={task.id}
            onDeleteTaskButtonClick={onDeleteTaskButtonClick}
            onTaskCompleteChange={onTaskCompleteChange}
            {...task}
          />
        )
      )}
    </ul>
  )
}

export default ToDoList

