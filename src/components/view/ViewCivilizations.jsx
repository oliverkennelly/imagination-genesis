import { useEffect, useState } from "react"
import { getLocationById } from "../../services/locationService"

export const ViewCivilizations = (civilization) => {
    const [civilLocation, setCivilLocation] = useState("")

    useEffect(() => {
        getLocationById(civilization.civilization.locationId).then(data => {
            setCivilLocation(data.name)
        })
    }, [civilization])

    return <div key={civilization.civilization.id}>
    <h4 className="civilization-list-title">{civilization.civilization.name}</h4>
    {civilization.civilization.image === "" ? (
        ""
    ) : (
        <img className="image"src={civilization.civilization.image}/>
    )}
    <h5 className="sub-info">{civilLocation}</h5>
    <p>{civilization.civilization.description}</p>
    <p className="sub-info">History</p>
    <p>{civilization.civilization.history}</p>
    <sub></sub>
</div>
}