



const createNewsComponents = {
    newsArticleObjectFactory(currentUserId, webAddress, newsTitle, synopsis, currentTimeDate) {
        return {
            userId: currentUserId,
            url: webAddress,
            title: newsTitle,
            synopsis: synopsis,
            timestamp: currentTimeDate
        }
    },
    createHTMLNewsContainers() {
        return `
        <h1 class="sectionHeader">Your News Articles</h1>
        <article class="createFormContainer" id="createAndFormContainer">
            <button id="createNewArticleBtn" class="createFormButton">Create New Article</button>
        </article>
        <article class="objCards" id="newsCardsContainer">
        </article>
        `
    },
    createNewsArticleInput() {
        return `
            <div id="newArticleInputForm"class="inputForms">
                <fieldset>
                    <input type="text" placeholder="Article Title" name="newsTitle" id="newsTitle">
                </fieldset>
                <fieldset>
                    <input type="text" name="newsSynopsis" id="newsSynopsis" placeholder="Enter a synopsis">
                </fieldset>
                <fieldset>
                    <input type="url" name="newsURL" id="newsURL" placeholder="URL here">
                </fieldset>
                <button class="saveFormButtons" id="saveNewsArticleButton">Save Article</button>
            </div>
        `
    },
    createNewsCard(newsObject) {
        return `
       <div class="cards newsCards__styles" id="newsCard--${newsObject.id}">
        <div>
          <p><a target="_blank" href="${newsObject.url}">${newsObject.title}</a>
          </p>
          <p>
          ${newsObject.synopsis}
          </p>
        </div> 
        <div id="editAndSaveBtnContainer">
          <button class="editFormButton" id="newsEditButton--${newsObject.id}">Edit News Article</button>
          <button class="deleteFormButton" id="newsDeleteButton--${newsObject.id}">Delete News Article</button>  
        </div>
       </div>
        `
    },
    createEditForm(newsObject) {
        return `
            <div id="editInPlaceForm"class="inputForms">
                <fieldset>
                    <input type="hidden" id="hiddenObjectId" value="${newsObject.id}">
                    <input type="text" name="newsTitleEdit" value="${newsObject.title}" id="newsTitleEdit">
                </fieldset>
                <fieldset>
                    <input type="text" name="newsSynopsisEdit" value="${newsObject.synopsis}" id="newsSynopsisEdit">
                </fieldset>
                <fieldset>
                    <input type="url" name="newsURLEdit" value="${newsObject.url}" id="newsURLEdit">
                </fieldset>
                <button class="saveFormButtons" id="saveEditedNewsArticleButton--${newsObject.id}">Save Article</button>
            </div>
        `
    }

}


export default createNewsComponents