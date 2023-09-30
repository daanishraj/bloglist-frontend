import { useState, forwardRef, useImperativeHandle } from 'react'


const Togglable = forwardRef(({buttonLabel,children}, refs) => {
const [isVisible, setIsVisible] = useState(false)

const toggleVisibility = () => setIsVisible(!isVisible)

useImperativeHandle(refs, ()=> {
   return { 
    toggleVisibility
     }
})

return (
    <>
    { !isVisible && <button  onClick={toggleVisibility}>{buttonLabel}</button>}
    { isVisible &&
    <>
    {children}
    <button onClick={toggleVisibility}>cancel</button>
    </>
    }
    </>
)
})

export default Togglable
