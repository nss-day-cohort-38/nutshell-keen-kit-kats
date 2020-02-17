



const createNewsComponents = {
    createNewArticleButton () {
        return `
        <article class="createFormContainer">
            <button class="createFormButton">New Article</button>
        </article>
        <article class="objectCardsNews">
            ${this.createAllNewsCards()}
        </article>`

    },
    createNewsArticleInput () {

    },
    createNewsCard() {
       return `
       
        `
    }

}


