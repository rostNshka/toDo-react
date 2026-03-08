import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import ToDoInfo from '@/features/stats'
import { ToDoList } from '@/entities/todo'
import { useContext } from 'react'
import Button from '@/shared/ui/Button'
import { TasksContext } from '@/entities/todo'
import styles from './Todo.module.scss'

const ToDo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext)

  return (
      <div className={styles.todo}>
        <h1 className={styles.title}>To Do List</h1>
        <AddTaskForm styles={styles} />
        <SearchTaskForm styles={styles} />
        <ToDoInfo styles={styles} />
        <Button
          onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Перейти к первой невыполненной задаче
        </Button>
        <ToDoList styles={styles} />
      </div>
  )
}

export default ToDo