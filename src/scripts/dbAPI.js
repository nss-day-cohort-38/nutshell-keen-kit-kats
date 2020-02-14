const baseUrl = "http://localhost:8088"


const dbAPI = {

    getUsers() {
        return fetch(`${baseUrl}/users`).then(resp=>resp.json())
    },

    getObjectByResource(resource, userId) {
        return fetch(`${baseUrl}/${resource}/?userId=${userId}&_expand=user`)
                .then(resp => resp.json())
    },

    postObject(object, resource) {
        fetch(`${baseUrl}/${resource}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(object)
        }).then(r=>r.json())
    },



}

export default dbAPI