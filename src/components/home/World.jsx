import { Link, useNavigate } from "react-router-dom"
import { deleteWorldById } from "../../services/worldService"

export const World = ({world, getAllUserWorlds}) => {
    const navigate = useNavigate()

    const handleDeleteWorld = () => {
        deleteWorldById(world.id).then(() => {
            getAllUserWorlds()
        })
    }

    const handleEditClick = () => {
        navigate(`/create`, {state: {world}})
    }

    return (<div className="world">
        <div className="info-container">
            {world.map === "" ? (
                <p></p>
            ) : (
                <div className="world-photo">
                <img className="world-map" src={world.map}/>
                </div>
            )}
            <div className="world-info">
                <h3 className="world-name">
                <Link 
                to={`/${world.id}`}
                >{world.name}</Link>
                </h3>
                {world.description}
            </div>
        </div>
        <div className="button-container">
            <button className="world-edit-button" onClick={() => {handleEditClick()}}>Edit</button>
            <button className="world-edit-button"onClick={() => {handleDeleteWorld()}}>Delete</button>
        </div>
    </div>)
}