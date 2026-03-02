import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import ToDoInfo from './ToDoInfo'
import ToDoList from './ToDoList'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Button from './Button'

const ToDo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      { id: 'task-1', title: 'Покормить кота', isDone: false },
      { id: 'task-2', title: 'Купить молоко', isDone: true },
    ]
  })

  const [searchQuery, setSearchQuery] = useState('')
  const[newTaskTitle, setNewTaskTitle] = useState('')

  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Вы действительно хотите удалить все задачи?')

    if (isConfirmed) {
      return setTasks([])
    }
  },[])

  const deleteTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone}
        }

        return task
      })
    )
  },[tasks])

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }, [newTaskTitle])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(searchQuery))
      : null
  }, [searchQuery, tasks])

  const doneTasks = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToDoInfo
        total={tasks.length}
        done={doneTasks}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: "smooth" })}
      >
        Перейти к первой невыполненной задаче
      </Button>
      <ToDoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}

export default ToDo