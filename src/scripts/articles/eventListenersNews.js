import dbAPI from "../dbAPI.js"
import domAdditionHandler from "./domNews.js"
import createNewsComponents from "./componentNews.js"

const clearFormFields = () => {
    const newsTitleForm = document.getElementById("newsTitle");
    const newsSynopsisForm = document.getElementById("newsSynopsis");
    const webAddressForm = document.getElementById("newsURL");

    newsTitleForm.value = ""
    newsSynopsisForm.value = ""
    webAddressForm.value = ""
}

const newsEventListeners = {

    // event listener to wait for click of "News" button on navbar

    mainNavNewsButtonAddEventListener() {
        const mainNavNewsBtn = document.getElementById("myNews")

        mainNavNewsBtn.addEventListener("click", () => {
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.innerHTML = ""
            domAdditionHandler.renderNewsContainers()

            domAdditionHandler.addArticlesToDOM()
            domAdditionHandler.renderFriendsNewsToDom()
        })
    },

    // event listener to watch the create, save, edit, and delete buttons for the form and articles

    createSaveEditAndDeleteBtnsAddEventListener() {
        const mainContainer = document.getElementById("mainContainer")

        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.includes("createNewArticleBtn")) {
                domAdditionHandler.renderFormContainerNewArticle()
            } else if (event.target.id.startsWith("saveNewsArticleButton")) {

                // this creates a new article in the database and timestamps it

                const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id;
                const newsTitleInfo = document.getElementById("newsTitle").value;
                const newsSynopsisInfo = document.getElementById("newsSynopsis").value;
                const webAddressInfo = document.getElementById("newsURL").value;
                const currentTimeDate = new Date();

                const createdNewsObject = createNewsComponents.newsArticleObjectFactory(currentUserId, webAddressInfo, newsTitleInfo, newsSynopsisInfo, currentTimeDate);
                dbAPI.postObjectByResource('news', createdNewsObject)
                    .then(() => {
                        const newsCardsContainer = document.getElementById("newsCardsContainer")
                        newsCardsContainer.innerHTML = "";
                        domAdditionHandler.addArticlesToDOM()
                        clearFormFields()
                    });

            } else if (event.target.id.startsWith("newsDeleteButton")) {
                const focusedArticleId = event.target.id.split("--")[1]

                if (confirm("Do you really want to delete this article?")) {
                    dbAPI.deleteObjectByResource('news', focusedArticleId)
                        .then(() => {
                            const newsCardsContainer = document.getElementById("newsCardsContainer")
                            newsCardsContainer.innerHTML = "";
                            domAdditionHandler.addArticlesToDOM()
                        })
                }
            } else if (event.target.id.startsWith("newsEditButton")) {
                const focusedArticleId = event.target.id.split("--")[1]


                dbAPI.fetchObjectById('news', focusedArticleId)
                    .then(newsObject => {
                        domAdditionHandler.editArticleInPlace(focusedArticleId, newsObject)
                    })
            } else if (event.target.id.startsWith("saveEditedNewsArticleButton")) {
                const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id;
                const newsTitleInfo = document.getElementById("newsTitleEdit").value;
                const newsSynopsisInfo = document.getElementById("newsSynopsisEdit").value;
                const webAddressInfo = document.getElementById("newsURLEdit").value;
                const currentTimeDate = new Date();
                const focusedArticleId = document.getElementById("hiddenObjectId").value


                if (focusedArticleId === event.target.id.split("--")[1]) {
                    const editedNewsObject = {
                        id: focusedArticleId,
                        userId: currentUserId,
                        url: webAddressInfo,
                        title: newsTitleInfo,
                        synopsis: newsSynopsisInfo,
                        timestamp: currentTimeDate
                    }
                    dbAPI.putObjectByResource('news', editedNewsObject)
                        .then(() => {
                            const newsCardsContainer = document.getElementById("newsCardsContainer")
                            newsCardsContainer.innerHTML = "";
                            domAdditionHandler.addArticlesToDOM()
                        })
                } else {
                    alert("Too many edit boxes open at once")
                }
            }
        })
    }


}

export default newsEventListeners