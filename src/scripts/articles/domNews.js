import createNewsComponents from "./componentNews.js"
import dbAPI from "../dbAPI.js"

const domAdditionHandler = {
    addArticlesToDOM() {
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id
        dbAPI.getObjectByResource('news', currentUserId)
            .then(arrayOfNewsArticles => {
                const sortedArrayOfNews = arrayOfNewsArticles.sort(function (a, b) {
                    return new Date(b.timestamp) - new Date(a.timestamp)
                })

                sortedArrayOfNews.forEach(article => {
                    const newsCardsContainer = document.getElementById("newsCardsContainer")
                    newsCardsContainer.innerHTML += createNewsComponents.createNewsCard(article)

                })
            })
    },
    renderNewsContainers() {
        const mainContainer = document.getElementById("mainContainer")
        mainContainer.innerHTML = createNewsComponents.createHTMLNewsContainers()
    },
    renderFormContainerNewArticle() {
        const entryFormContainer = document.getElementById("createAndFormContainer")
        entryFormContainer.innerHTML = ""
        entryFormContainer.innerHTML = createNewsComponents.createNewsArticleInput()
    },
    editArticleInPlace(articleId, articleObject) {
        const reviewInPlaceContainer = document.getElementById(`newsCard--${articleId}`)

        reviewInPlaceContainer.innerHTML = ""
        reviewInPlaceContainer.innerHTML = createNewsComponents.createEditForm(articleObject)
    },
    renderFriendsNewsToDom(){
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id;

        dbAPI.getFriends(currentUserId).then(friendDataArray => {
            friendDataArray.forEach(friendObj => {
                const friendId = friendObj.user.id;
                dbAPI.getObjectByResource('news', friendId)
                    .then(friendsNews=> {
                        if (friendsNews.length !== 0) {
                            const friendsNewsContainer = document.getElementById('friendsNewsContainer')
                            friendsNewsContainer.innerHTML += `<h1 class ="objCards friendCardName">${friendObj.user.username}'s News</h1>`
                            friendsNews.forEach(friendArticle => {
                            friendsNewsContainer.innerHTML += createNewsComponents.createFriendsNewsCard(friendArticle)
                            })
                        }
                    })
            })
        });
    }
}


export default domAdditionHandler