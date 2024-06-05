import { useEffect, useState } from "react"
import { createNewLocation, getLocationById, saveLocationByLocationId } from "../../services/locationService"

export const Location = ({worldId, setLocationSaved, setLocationEditMode, locationEditMode, editedLocationId}) => {
    const [locationName, setLocationName] = useState("")
    const [locationTerrain, setLocationTerrain] = useState("")
    const [locationDesc, setLocationDesc] = useState("")
    const [locationImage, setLocationImage] = useState("")
    const [locationBody, setLocationBody] = useState({
        "worldId": worldId,
        "name": "",
        "terrain": "",
        "description": "",
        "image": ""
    })

    const handleSave = () => {
        if (locationEditMode) {
            setLocationEditMode(false)
            saveLocationByLocationId(locationBody, editedLocationId)
        } else (
            createNewLocation(locationBody)
        )
        setLocationSaved(true)
        setLocationName("")
        setLocationTerrain("")
        setLocationDesc("")
        setLocationImage("")
    }

    useEffect(() => {
        if (locationEditMode) {
            getLocationById(editedLocationId).then((data) => {
                const location = data
                setLocationName(`${location?.name}`)
                setLocationTerrain(`${location?.terrain}`)
                setLocationDesc(`${location?.description}`)
                setLocationImage(`${location?.image}`)
            })
        }
    }, [locationEditMode])

    useEffect(() => {
        setLocationBody({
            "worldId": worldId,
            "name": `${locationName}`,
            "terrain": `${locationTerrain}`,
            "description": `${locationDesc}`,
            "image": `${locationImage}`
        })
    }, [locationName, locationTerrain, locationDesc, locationImage])

    //name, terrain, description, image
    return <div>
        <p>Name Of Location</p>
        <input className="input-box"
        value={locationName}
        onChange={(event) => {
            setLocationName(event.target.value)
        }}/>
        <p>Terrain Of Location</p>
        <input className="input-box"
        value={locationTerrain}
        onChange={(event) => {
            setLocationTerrain(event.target.value)
        }}/>
        <p>Description Of Location</p>
        <textarea className="input-box"
        value={locationDesc}
        onChange={(event) => {
            setLocationDesc(event.target.value)
        }}/>
        <p>Image URL Of Location</p>
        <input className="input-box"
        value={locationImage}
        onChange={(event) => {
            setLocationImage(event.target.value)
        }}/>
        <button onClick={handleSave}>Save Location</button>
    </div>
}