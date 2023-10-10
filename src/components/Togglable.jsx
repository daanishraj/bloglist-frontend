import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel,children }, refs) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      { !isVisible && <button data-testid="show-blog-form"  onClick={toggleVisibility}>{buttonLabel}</button>}
      { isVisible &&
    <>
      {children}
      <button onClick={toggleVisibility}>cancel</button>
    </>
      }
    </>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
