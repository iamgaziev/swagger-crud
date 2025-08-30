import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import AboutById from "./pages/aboutById/AboutById"
import Contact from "./pages/base64/Base64"


const App = () => {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      children: [
        {
          index:true,
          element:<Home/>
        },
        {
          path: "/aboutById/:id",
          element: <AboutById />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App