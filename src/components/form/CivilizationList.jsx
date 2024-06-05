import { deleteCivilizationById } from "../../services/civilizationService"

export const CivilizationList = ({allCivilizations, setCivilizationSaved, setCivilizationEditMode, setEditedCivilizationId}) => {
    const handleDeleteCivilization = (civilization) => {
        deleteCivilizationById(civilization.id)
        setCivilizationSaved(true)
    }
    const handleEditCivilization = (civilization) => {
        setCivilizationEditMode(true)
        setEditedCivilizationId(civilization.id)
    }
    return <>
        {
            allCivilizations.map(civilization => {
                return (
                    <div className="list-item" key={civilization.id}>
                        <div className="info-container">
                            {civilization.image === "" ? (
                                ""
                            ) : (
                                <img className="list-item-image" src={civilization.image}/>
                            )}
                            <div className="list-item-text">
                                <h3 className="civilization-name">{civilization.name}</h3>
                                {civilization.description}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="list-item-button" onClick={() => {handleEditCivilization(civilization)}}>Edit</button>
                            <button className="list-item-button"onClick={() => {handleDeleteCivilization(civilization)}}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
    </>
}