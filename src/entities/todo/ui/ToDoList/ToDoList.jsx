import ToDoItem from '../ToDoItem/ToDoItem'
import { useContext } from 'react'
import { TasksContext } from '../../model/TasksContext'

const ToDoList = (props) => {
  const { styles } = props
  const {
    tasks,
    filteredTasks,
  } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className={styles.emptyMessage}>Задач пока нет</div>
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Задачи не найдены</div>
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
          <ToDoItem
            className={styles.item}
            key={task.id}
            {...task}
          />
        )
      )}
    </ul>
  )
}

export default ToDoList

