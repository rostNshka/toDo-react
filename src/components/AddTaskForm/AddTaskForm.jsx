import Field from '../Field/Field'
import Button from '../Button/Button'
import { useContext, useState } from 'react'
import { TasksContext } from '../../context/TasksContext'

const AddTaskForm = (props) => {
  const { styles } = props
  const {
    addTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  const [error, setError] = useState('')

  const clearNewTaskTitle = newTaskTitle.trim()
  const isTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isTaskTitleEmpty){
      addTask(clearNewTaskTitle)
    }
  }

  const onInput = (event) => {
    const { value } = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setNewTaskTitle(value)
    setError(hasOnlySpaces ? 'Задача не может быть пустой' : '')
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        label='New Task Title'
        id='new-task'
        error={error}
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button
        type='submit'
        isDisabled={isTaskTitleEmpty}
      >
        Add
      </Button>
    </form>
  )
}

export default AddTaskForm