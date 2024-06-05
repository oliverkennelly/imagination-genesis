export const ViewLocations = (location) => {
    return (<div key={location.location.id}>
    <h4 className="location-list-title">{location.location.name}</h4>
    {location.location.image === "" ? (
        ""
    ) : (
        <img className="image" src={location.location.image}/>
    )}
    <sub className="sub-info">{location.location.terrain}</sub>
    <p>{location.location.description}</p>
</div>)
}