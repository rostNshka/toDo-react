import AddTaskForm from '../AddTaskForm/AddTaskForm'
import SearchTaskForm from '../SearchTaskForm/SearchTaskForm'
import ToDoInfo from '../ToDoInfo/ToDoInfo'
import ToDoList from '../ToDoList/ToDoList'
import { useContext } from 'react'
import Button from '../Button/Button'
import { TasksContext } from '../../context/TasksContext'
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