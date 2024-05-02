import { deleteLocationById } from "../../services/locationService"

export const LocationList = ({allLocations, setLocationSaved, setLocationEditMode, setEditedLocationId}) => {
    const handleDeleteLocation = (location) => {
        deleteLocationById(location.id)
        setLocationSaved(true)
    }
    const handleEditLocation = (location) => {
        setLocationEditMode(true)
        setEditedLocationId(location.id)
    }
    return <>
        {
            allLocations.map(location => {
                return (
                    <div className="location" key={location.id}>
                        <div className="info-container">
                            <img className="location-image" src={location.image}/>
                            <div className="location-info">
                                <h3 className="location-name">{location.name}</h3>
                                {location.description}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="location-edit-button" onClick={() => {handleEditLocation(location)}}>Edit</button>
                            <button className="location-edit-button"onClick={() => {handleDeleteLocation(location)}}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
    </>
}