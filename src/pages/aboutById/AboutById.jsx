import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AboutById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getById() {
    try {
      let { data } = await axios.get(`http://37.27.29.18:8001/api/to-dos/${id}`)
      setUser(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getById()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg 
                         hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Tasks
            </button>
            
            {user && (
              <div className={`px-4 py-2 rounded-full ${user?.isCompleted ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'} font-medium flex items-center gap-2`}>
                {user?.isCompleted ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    In Progress
                  </>
                )}
              </div>
            )}
          </div>

          {/* Task details */}
          {user ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-800 mb-2">{user.name}</h1>
                <p className="text-gray-600 text-lg">{user.description || "No description provided"}</p>
              </div>

              {/* Images section */}
              {user.images && user.images.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Task Images
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.images.map((item) => (
                      <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-md bg-gray-100">
                        <img 
                          src={`http://37.27.29.18:8001/images/${item.imageName}`} 
                          alt="Task attachment" 
                          className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5YzlkYWEiPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No images attached to this task</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Task Not Found</h3>
              <p className="text-gray-500">The task you're looking for doesn't exist or may have been deleted.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutById