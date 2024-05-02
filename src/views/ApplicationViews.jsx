import { Route, Outlet, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { WorldList } from "../components/home/WorldList"
import { CreateWorld } from "../components/form/CreateWorld"


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localGenesisUser = localStorage.getItem("genesis_user")
    const genesisUserObject = JSON.parse(localGenesisUser)
    setCurrentUser(genesisUserObject)
  }, [])

  return <Routes>
  <Route 
  path="/" 
  element={
  <>
    <Outlet/>
  </>
  }
>
  <Route index element={<WorldList currentUser={currentUser}/>} />
  <Route path="create" element={<CreateWorld currentUser={currentUser}/>}/>
 
</Route>
</Routes>
}
