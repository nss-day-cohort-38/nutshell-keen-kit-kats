


const newsEventListeners = {
    mainNavNewsButtonAddEventListener () {
        const mainNavNewsBtn = document.getElementById("myNews")

        mainNavNewsBtn.addEventListener("click", () => {
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.innerHTML = ""
            
        })
    }
}