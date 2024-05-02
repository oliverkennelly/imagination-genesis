export const createNewCivilization = (civilizationBody) => {
    return fetch(`http://localhost:8088/civilizations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(civilizationBody),
    }).then((res) => res.json())
}

export const getAllWorldLocationsByWorldId = (worldId) => {
    return fetch(`http://localhost:8088/locations?worldId=${worldId}`).then((res) =>
    res.json()
  )
}

export const getAllWorldCivilizationsByWorldId = (worldId) => {
    return fetch(`http://localhost:8088/civilizations?worldId=${worldId}`).then((res) =>
    res.json()
  )
}

export const saveCivilizationByCivilizationId = (civilizationBody, civilizationId) => {
    return fetch(`http://localhost:8088/civilizations/${civilizationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(civilizationBody),
    }).then((res) => res.json())
}

export const getCivilizationById = (civilizationId) => {
    return fetch(`http://localhost:8088/civilizations/${civilizationId}`).then((res) => res.json())
}