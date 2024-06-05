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
                    <div className="list-item" key={location.id}>
                        <div className="info-container">
                            {location.image === "" ? (
                                ""
                            ) : (
                                <img className="list-item-image" src={location.image}/>
                            )}
                            <div className="list-item-text">
                                <h3 className="location-name">{location.name}</h3>
                                {location.description}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="list-item-button" onClick={() => {handleEditLocation(location)}}>Edit</button>
                            <button className="list-item-button"onClick={() => {handleDeleteLocation(location)}}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
    </>
}