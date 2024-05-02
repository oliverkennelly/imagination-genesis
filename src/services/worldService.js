export const getWorldListByUserId = (userId) => {
    return fetch(`http://localhost:8088/worlds?userId=${userId}`).then((res) =>
      res.json()
    )
}

export const getWorldById = (worldId) => {
    return fetch(`http://localhost:8088/worlds?id=${worldId}`).then((res) =>
      res.json()
    )
}

export const createNewWorld = (userId) => {
    const worldBody = {
        "userId": userId,
        "name": "",
        "map": "",
        "description" : ""
    }
    return fetch("http://localhost:8088/worlds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(worldBody),
    }).then((res) => res.json())
}

export const saveWorldByWorldId = (worldBody, worldId) => {
    return fetch(`http://localhost:8088/worlds/${worldId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(worldBody),
    }).then((res) => res.json())
}

export const deleteWorldById = (id) => {
    return fetch(`http://localhost:8088/worlds/${id}`, {
        method: "DELETE"
    })
}