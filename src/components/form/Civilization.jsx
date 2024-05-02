import { useEffect, useState } from "react"
import { createNewCivilization, getAllWorldLocationsByWorldId, getCivilizationById, saveCivilizationByCivilizationId } from "../../services/civilizationService"

export const Civilization = ({worldId, locationSaved, setCivilizationSaved, setCivilizationEditMode, civilizationEditMode, editedCivilizationId}) => {
    const [civilName, setCivilName] = useState("")
    const [civilLocation, setCivilLocation] = useState(0)
    const [civilDescription, setCivilDescription] = useState("")
    const [civilHistory, setCivilHistory] = useState("")
    const [civilImage, setCivilImage] = useState("")
    const [civilizationBody, setCivilizationBody] = useState({
        "worldId": worldId,
        "name": "",
        "locationId": 0,
        "description": "",
        "history": "",
        "image": ""
    })
    const [allLocations, setAllLocations] = useState([])

    const handleSave = () => {
        if (civilizationEditMode) {
            setCivilizationEditMode(false)
            saveCivilizationByCivilizationId(civilizationBody, editedCivilizationId)
        } else (
            createNewCivilization(civilizationBody)
        )
        setCivilizationSaved(true)
        setCivilName("")
        setCivilLocation(0)
        setCivilDescription("")
        setCivilHistory("")
        setCivilImage("")
    }

    useEffect(() => {
        if (civilizationEditMode) {
            getCivilizationById(editedCivilizationId).then((civilization) => {
                setCivilName(`${civilization?.name}`)
                setCivilLocation(civilization.locationId)
                setCivilHistory(`${civilization?.history}`)
                setCivilDescription(`${civilization?.description}`)
                setCivilImage(`${civilization?.image}`)
            })
        }
    }, [civilizationEditMode])

    useEffect(() => {
        getAllWorldLocationsByWorldId(worldId).then((locationArray) => {
            setAllLocations(locationArray)})
    }, [locationSaved])

    useEffect(() => {
        setCivilizationBody({
            "worldId": worldId,
            "name": `${civilName}`,
            "locationId": civilLocation,
            "description": `${civilDescription}`,
            "history": `${civilHistory}`,
            "image": `${civilImage}`
        })
    }, [civilName, civilLocation, civilDescription, civilHistory, civilImage])

    //name, terrain, description, image
    return <div>
        <p>Name Of Civilization</p>
        <input 
        value={civilName}
        onChange={(event) => {
            setCivilName(event.target.value)
        }}/>
        <p>Civilization Location</p>
        <select 
        value={civilLocation}
        onChange={(event) => {
            setCivilLocation(parseInt(event.target.value))
        }}>
            <option value="0">Nomadic Civilization</option>
            {allLocations.map(locationObj => {
                return <option value={locationObj.id} key={locationObj.id}>{locationObj.name}</option>
            })}
        </select>
        <p>Description Of Civilization</p>
        <input 
        value={civilDescription}
        onChange={(event) => {
            setCivilDescription(event.target.value)
        }}/>
        <p>History Of Civilization</p>
        <input 
        value={civilHistory}
        onChange={(event) => {
            setCivilHistory(event.target.value)
        }}/>
        <p>Image URL Of Location</p>
        <input 
        value={civilImage}
        onChange={(event) => {
            setCivilImage(event.target.value)
        }}/>
        <button onClick={handleSave}>Save Civilization</button>
    </div>
}