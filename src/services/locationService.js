export const createNewLocation = (locationBody) => {
    return fetch(`http://localhost:8088/locations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationBody),
    }).then((res) => res.json())
}

export const deleteLocationById = (locationId) => {
    return fetch(`http://localhost:8088/locations/${locationId}`, {
        method: "DELETE"
})}

export const getLocationById = (locationId) => {
    return fetch(`http://localhost:8088/locations/${locationId}`).then((res) => res.json())
}

export const saveLocationByLocationId = (locationBody, locationId) => {
    return fetch(`http://localhost:8088/locations/${locationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationBody),
    }).then((res) => res.json())
}