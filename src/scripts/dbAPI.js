const baseUrl = "http://localhost:8088";

const dbAPI = {
    getUsers() {
        return fetch(`${baseUrl}/users`).then(resp => resp.json());
    },
    getFriends() {
        return fetch(`${baseUrl}/friends`).then(resp => resp.json());
    },

    fetchObjectById(resource, id) {
        return fetch(`${baseUrl}/${resource}/${id}`).then(resp => resp.json())
    },

    getObjectByIdAndResource(resource, objectId) {
        return fetch(`${baseUrl}/${resource}/${objectId}`)
            .then(resp => resp.json())
    },

    getObjectByResource(resource, userId) {
        return fetch(
            `${baseUrl}/${resource}/?userId=${userId}&_expand=user`
        ).then(resp => resp.json());
    },
    postObjectByResource(resource, resourceObject) {
        return fetch(`${baseUrl}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resourceObject)
        }).then(resp => resp.json());
    },
    deleteObjectByResource(resource, id) {
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "DELETE"
        });
    },
    putObjectByResource(resource, resourceObject) {
        return fetch(`${baseUrl}/${resource}/${resourceObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resourceObject)
        }).then(resp => resp.json());
    },
    patchObjectByResource(resource, id, keyValueObj) {
        return fetch(`${baseUrl}/${resource}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(keyValueObj)
        }).then(resp => resp.json());
    },
    getMessages() {
        return fetch(`${baseUrl}/messages`).then(resp => resp.json())
    }
};

export default dbAPI;
