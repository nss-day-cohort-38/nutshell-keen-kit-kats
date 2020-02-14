baseUrl = "http://localhost:8088"


const dbAPI = {
    getObjectByResource(resource, userId) {
        return fetch(`${baseUrl}/${resource}?id=${userId}&_expand=user`)
                .then(resp => resp.json())
    }
}