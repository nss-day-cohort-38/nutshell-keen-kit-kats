import createNewsComponents from "./componentNews.js"
import dbAPI from "../dbAPI.js"

const domAdditionHandler = {
    addArticlesToDOM() { 
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id
        dbAPI.getObjectByResource('news', currentUserId)
        .then(arrayOfNewsArticles => {
            console.table(this.sortArticlesByTimestamp(arrayOfNewsArticles))
            arrayOfNewsArticles.forEach(article => {
        const newsCardsContainer = document.getElementById("newsCardsContainer")
        newsCardsContainer.innerHTML += createNewsComponents.createNewsCard(article) 
        
    })})
    },
    renderNewsContainers () {
        const mainContainer = document.getElementById("mainContainer")
        mainContainer.innerHTML = createNewsComponents.createHTMLNewsContainers() 
    },
    renderFormContainerNewArticle() {
        const entryFormContainer = document.getElementById("createAndFormContainer")
        entryFormContainer.innerHTML = ""
        entryFormContainer.innerHTML = createNewsComponents.createNewsArticleInput()
    },
    editArticleInPlace (articleId, articleObject) {
        const reviewInPlaceContainer = document.getElementById(`newsCard--${articleId}`)
        
        reviewInPlaceContainer.innerHTML = ""
        reviewInPlaceContainer.innerHTML = createNewsComponents.createEditForm(articleObject)
    },
    sortArticlesByTimestamp(arrayOfObjects) {
         arrayOfObjects.sort(function(a,b) {
            let timestampA = a.timestamp
            let timestampB = b.timestamp
            return timestampA - timestampB
        })
    }

}


export default domAdditionHandler