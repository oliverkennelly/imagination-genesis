
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
                    <div className="civilization" key={civilization.id}>
                        <div className="info-container">
                            <img className="civilization-image" src={civilization.image}/>
                            <div className="civilization-info">
                                <h3 className="civilization-name">{civilization.name}</h3>
                                {civilization.description}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="civilization-edit-button" onClick={() => {handleEditCivilization(civilization)}}>Edit</button>
                            <button className="civilization-edit-button"onClick={() => {handleDeleteCivilization(civilization)}}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
    </>
}