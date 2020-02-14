baseUrl = "http://localhost:8088"


const dbAPI = {
    getObjectByResource(resource, userId) {
        return fetch(`${baseUrl}/${resource}/?userId=${userId}&_expand=user`)
                .then(resp => resp.json())
    },
    postObjectByResource(resourceObject,resource) {
        return fetch((`${baseUrl}/${resource}`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resourceObject)
        })
            .then(resp => resp.json())
    },
    deleteObjectByResource(resource, id) {
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "DELETE"
        })
    },
    putObejectByResource(resourceObject, resource) {
        return fetch(`${baseUrl}/${resource}/${resourceObject.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resourceObject)
        })
            .then(resp => resp.json())
    },
    patchObejectByResource(resourceObject, resource) {
        return fetch(`${baseUrl}/${resource}/${resourceObject.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resourceObject)
        })
            .then(resp => resp.json())
    }
}

