const RouterLink = (props) => {
  const {
    styles,
    to,
    children,
    ...rest
  } = props

  const handleClick = (event) => {
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a className={styles.link} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export default RouterLink