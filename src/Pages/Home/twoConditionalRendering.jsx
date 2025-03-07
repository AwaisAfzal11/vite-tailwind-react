import { useState, useEffect } from 'react'

function Project({ id }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        // Simulating an API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulated project data
        const projectData = {
          1: { name: 'E-commerce Website', description: 'A full-featured online shopping platform' },
          2: { name: 'Task Manager', description: 'A productivity app for managing daily tasks' },
          3: { name: 'Weather App', description: 'Real-time weather forecasting application' }
        }

        if (!projectData[id]) {
          throw new Error('Project not found')
        }

        setProject(projectData[id])
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id]) // Effect runs when id changes

  if (!id) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
        No project ID provided
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 text-gray-600">
        Loading project details...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error: {error}
      </div>
    )
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Project {id}: {project?.name}</h1>
      <p className="text-gray-600">{project?.description}</p>
      
      <div className="mt-4">
        <button 
          onClick={() => setProject(prev => ({
            ...prev,
            description: prev.description + ' (Updated!)'
          }))}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Description
        </button>
      </div>
    </section>
  )
}

export default Project




