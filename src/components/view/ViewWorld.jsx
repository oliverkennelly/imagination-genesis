import { useNavigate, useParams } from "react-router-dom"
import { getWorldById } from "../../services/worldService"
import { useEffect, useState } from "react"
import { getAllWorldCivilizationsByWorldId, getAllWorldLocationsByWorldId } from "../../services/civilizationService"
import { ViewLocations } from "./ViewLocations"
import { ViewCivilizations } from "./ViewCivilizations"
import "./View.css"

export const ViewWorld = () => {
    const {worldId} = useParams()
    const navigate = useNavigate()
    const [worldInfo, setWorldInfo] = useState({})
    const [locationInfo, setLocationInfo] = useState([])
    const [civilizationInfo, setCivilizationInfo] = useState([])

    const worldInformation = () => {
        getWorldById(worldId).then(data => {
            setWorldInfo(data[0])
        })
        getAllWorldLocationsByWorldId(worldId).then(data => {
            setLocationInfo(data)
        })
        getAllWorldCivilizationsByWorldId(worldId).then(data => {
            setCivilizationInfo(data)
        })
    }

    const handleHomeClick = () => {
        navigate("/")
    }

    useEffect(() => {
        worldInformation()
    }, [worldId])

    return <div className="view-container">
    <button className="button" onClick={handleHomeClick}>Home</button>
    <div className="world-view-info">
        <h2 className="world-info-title">{worldInfo.name}</h2>
        {worldInfo.map === "" ? (
            ""
        ) : (
            <img className="world-map-view" src={worldInfo.map} alt="World Map" />
        )}
        <p>{worldInfo.description}</p>
    </div>
    <div className="location-list">
        <h3 className="module-heading">Locations of {worldInfo.name}</h3>
        {locationInfo.map((location) => (
            <div className="location-item" key={location.id}>
                <ViewLocations location={location} />
            </div>
        ))}
    </div>
    <div className="civilization-list">
        <h3 className="module-heading">Civilizations of {worldInfo.name}</h3>
        {civilizationInfo.map((civil) => (
            <div className="civilization-item" key={civil.id}>
                <ViewCivilizations civilization={civil} />
            </div>
        ))}
    </div>
</div>
}