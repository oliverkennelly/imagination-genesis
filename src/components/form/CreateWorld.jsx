import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { deleteWorldById, saveWorldByWorldId } from "../../services/worldService"
import { Location } from "./Location"
import "./Form.css"
import { Civilization } from "./Civilization"
import { getAllWorldCivilizationsByWorldId, getAllWorldLocationsByWorldId } from "../../services/civilizationService"
import { LocationList } from "./LocationList"
import { CivilizationList } from "./CivilizationList"

export const CreateWorld = ({currentUser}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const editedWorldBody = location.state?.world
    const isEditMode = !!editedWorldBody?.id
    const userId = currentUser.id
    const newWorldId = location.state?.newWorld
    const [worldName, setWorldName] = useState("")
    const [worldDesc, setWorldDesc] = useState("")
    const [worldMap, setWorldMap] = useState("")
    const [worldBody, setWorldBody] = useState({
        "userId": userId,
        "name": `${worldName}`,
        "map": `${worldMap}`,
        "description" : `${worldDesc}`}
    )
    const worldId = (editedWorldBody?.id || newWorldId)
    //state for locations
    const [locationSaved, setLocationSaved] = useState(false)
    const [allLocations, setAllLocations] = useState([])
    const [locationEditMode, setLocationEditMode] = useState(false)
    const [editedLocationId, setEditedLocationId] = useState(0)
    //state for civilizations
    const [civilizationSaved, setCivilizationSaved] = useState(false)
    const [allCivilizations, setAllCivilizations] = useState([])
    const [civilizationEditMode, setCivilizationEditMode] = useState(false)
    const [editedCivilizationId, setEditedCivilizationId] = useState(0)

    const handleHomeClick = () => {
        navigate("/")
        if (isEditMode === false) {
            deleteWorldById(newWorldId)
        }
    }

    const handleSaveClick = () => {
        saveWorldByWorldId(worldBody, worldId)
        navigate("/")
    }

    const handleDeleteClick = () => {
        deleteWorldById(worldId)
        navigate("/")
    }

    //this useEffect fills out the worldBody
    useEffect(() => {
        setWorldBody({
            "id": worldId,
            "userId": userId,
            "name": `${worldName}`,
            "map": `${worldMap}`,
            "description": `${worldDesc}`
        })
    }, [worldName, worldDesc, worldMap])

    useEffect(() => {
        if (isEditMode) {
            setWorldName(`${editedWorldBody?.name}`)
            setWorldDesc(`${editedWorldBody?.description}`)
            setWorldMap(`${editedWorldBody?.map}`)
        }
    }, [])

    //useEffect for getting the locations
    useEffect(() => {
        getAllWorldLocationsByWorldId(worldId).then((locationArray) => {
            setAllLocations(locationArray)})
    }, [locationSaved, worldId])

    //useEffect for detecting a location change
    useEffect(() => {
        if (locationSaved) {
            setLocationSaved(false)
        }
    }, [locationSaved])

    //useEffect for getting civilizations
    useEffect(() => {
        getAllWorldCivilizationsByWorldId(worldId).then((civilArray) => {
            setAllCivilizations(civilArray)
        })
    }, [civilizationSaved, worldId])

    //useEffect for detecting a civilization change
    useEffect(() => {
        if (civilizationSaved) {
            setCivilizationSaved(false)
        }
    }, [civilizationSaved])

    return (
        <div className="main">
            <div className="form-header">
                <button className="button" onClick={handleHomeClick}>Home</button>
                <p>Name of the world</p>
                <input
                value={worldName}
                onChange={(event) => {
                    setWorldName(event.target.value)
                }}/>
            </div>
            <div className="forms">
            <div className="box">
                <div className="world-map-form">
                <p>World Map Url</p>
                <input className="input-box"
                value={worldMap}
                onChange={(event) => {
                    setWorldMap(event.target.value)
                }}/>
                </div>
                <div className="mini-form-box"><Location worldId={worldId} setLocationSaved={setLocationSaved} setLocationEditMode={setLocationEditMode} locationEditMode={locationEditMode} editedLocationId={editedLocationId}/></div>
                <div><LocationList allLocations={allLocations} setLocationSaved={setLocationSaved} setLocationEditMode={setLocationEditMode} setEditedLocationId={setEditedLocationId}/></div>
                </div>
            <div className="box">
                <div className="world-description-form">
                <p>Description</p>
                <textarea className="world-description-input"
                value={worldDesc}
                onChange={(event) => {
                    setWorldDesc(event.target.value)
                }}/>
                </div>
                <div className="mini-form-box"><Civilization worldId={worldId} locationSaved={locationSaved} setCivilizationSaved={setCivilizationSaved} setCivilizationEditMode={setCivilizationEditMode} civilizationEditMode={civilizationEditMode} editedCivilizationId={editedCivilizationId}/></div>
                <div><CivilizationList allCivilizations={allCivilizations} setCivilizationSaved={setCivilizationSaved} setCivilizationEditMode={setCivilizationEditMode} setEditedCivilizationId={setEditedCivilizationId}/></div>
            </div>
            </div>
            <div className="button-box">
                <button className="button" onClick={handleDeleteClick}>Delete</button>
                <button className="button" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}