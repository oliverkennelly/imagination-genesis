import { useEffect, useState } from "react"
import { createNewWorld, getWorldListByUserId } from "../../services/worldService"
import { World } from "./World"
import { useNavigate } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import "./World.css"

export const WorldList = ({currentUser}) => {
    const [worlds, setWorlds] = useState([])
    const [newWorld, setNewWorld] = useState({})
    const userId = currentUser.id
    const navigate = useNavigate()

    const getAllUserWorlds = () => {
        if (userId !== undefined){
            getWorldListByUserId(userId).then((worldArray) => {
                setWorlds(worldArray)
            })
        }
    }

    const handleCreateClick = () => {
        createNewWorld(userId).then(data => {
            setNewWorld(data.id)
        })
    }

    useEffect(() => {
        if (JSON.stringify(newWorld) !== "{}") {
            navigate(`/create`, {state: {newWorld}})
        }
    }, [newWorld])

    useEffect(() => {
        getAllUserWorlds()
    }, [userId, currentUser])

    return (<main className="color">
        <NavBar currentUser={currentUser} />
        <h2 className="header">Your Worlds</h2>
        {worlds.length === 0 ? (
            <div>A blank page. Create some worlds?</div>
        ) : (
            <div className="all-worlds">
                {worlds.map(worldObj => {
                    return <World world={worldObj} getAllUserWorlds={getAllUserWorlds} key={worldObj.id}/>
                })}
            </div>
        )}
        <button onClick={handleCreateClick} className="create-new-world">create new world</button>
    </main>)
}