import { createContext, useMemo } from 'react'
import useTasks from './useTasks'
import useIncompleteTaskScroll from './useIncompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearing,
    appearing,
  } = useTasks()

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = useIncompleteTaskScroll(tasks)

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearing,
    appearing,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  }), [
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearing,
    appearing,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  ])

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}