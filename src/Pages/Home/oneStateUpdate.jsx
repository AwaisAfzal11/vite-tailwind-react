// State updates
import {useState} from 'react'

function Project() {

  // State updates
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount ((prev) => prev + 1)
    setCount ((prev) => prev + 1)
    setCount ((prev) => prev + 1)
    setCount ((prev) => prev + 1)
  }

  // Conditional Rendering


  return (

    <>
    {/*  State updates */}
    <button 
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Click me
    </button>
    <p> Count is: {count}</p>

    
    </>
    
  )
}

export default Project