import dbAPI from "./dbAPI.js";
import addToDom from "./addToDom.js";
import { createHTML, createObjects } from "./createComponent.js";
import eventsRenderToDom from './events/eventsRenderToDom.js';
import eventHtmlComponents from './events/eventHtmlComponents.js';
import tasksCreateHTML from './tasks/tasksComponentCreators.js';
import createNewsComponents from './articles/componentNews.js';

const passwordMinLength = 3;
const eventListeners = {
  loginButtonEventListener() {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.addEventListener("click", event => {
      const userEmail = document.getElementById("userEmail");
      const userPassword = document.getElementById("userPassword");
      if (event.target.id.startsWith("loginButton")) {
        dbAPI.getUsers().then(users => {
          const userDatabaseObject = users.filter(
            user =>
              user.email === userEmail.value &&
              user.password === userPassword.value
          );
          if (userEmail.value === "" || userPassword.value === "") {
            alert("Please fill out all entry fields!");
          } else if (userDatabaseObject.length === 0) {
            alert("Sorry, wrong email or password. Try again!");
            userPassword.value = "";
          } else {
            // This is a successful login.
            // The user object is taken directly from the db so it has the id
            // It is then stored in the browsers session memory, which is ended if you close the tab or window.
            sessionStorage.setItem(
              "user",
              JSON.stringify(userDatabaseObject[0])
            );
            mainContainer.innerHTML = "";
            addToDom.addReturningUserMessage();
            // making nav buttons appear
            document
              .getElementById("resourceButtons")
              .classList.toggle("hidden");
            document.getElementById("profileIcon").classList.toggle("hidden");
          }
        });
      }
    });
  },
  signupButtonEventListener() {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.addEventListener("click", event => {
      const newUserEmail = document.getElementById("new-userEmail");
      const newUsername = document.getElementById("new-username");
      const newUserPassword = document.getElementById("new-userPassword");
      if (event.target.id.startsWith("signUpButton")) {
        dbAPI.getUsers().then(users => {
          const userEmailObject = users.filter(
            user => user.email === newUserEmail.value
          );
          const userNameObject = users.filter(
            user => user.username === newUsername.value
          );
          if (
            newUsername.value === "" ||
            newUserEmail.value === "" ||
            newUserPassword.value === ""
          ) {
            alert("Please fill out all entry fields!");
          } else if (userEmailObject.length !== 0) {
            alert(
              "That email is already in use. Pleas use another email and try again."
            );
          } else if (
            newUserEmail.value.includes("@") === false ||
            newUserEmail.value.includes(".com" || ".net" || ".org") === false
          ) {
            alert("Please enter valid email address!");
          } else if (newUsername.value.length < 3) {
            alert(
              "Usernames must be at least three characters long. Please try again."
            );
          } else if (userNameObject.length !== 0) {
            alert(
              "That username is already in use. Please choose another one and try again."
            );
          } else if (newUserPassword.value.length < passwordMinLength) {
            alert(
              `Passwords must be at least ${passwordMinLength} characters long. Please try again.`
            );
          } else if (newUserPassword.value.includes(" ")) {
            alert("Passwords cannot include spaces. Please try again.");
          } else {
            // This is a successful new account creation
            // The newUserObject is POSTed, and then returns the new object
            // We then save the new object to session storage and wipe the login away
            const newUserObject = createObjects.newUserObjectCreator(
              newUsername.value,
              newUserEmail.value,
              newUserPassword.value
            );
            dbAPI
              .postObjectByResource("users", newUserObject)
              .then(newUserObject => {
                sessionStorage.setItem("user", JSON.stringify(newUserObject));
                mainContainer.innerHTML = "";
                addToDom.addNewUserMessage();
                // making nav buttons appear
                document
                  .getElementById("resourceButtons")
                  .classList.toggle("hidden");
                document
                  .getElementById("profileIcon")
                  .classList.toggle("hidden");
              });
          }
        });
      }
    });
  },
  profileDropDownEventListener() {
    const profileIcon = document.getElementById("profileIcon");
    profileIcon.addEventListener("click", () =>
      document.getElementById("profileDropDown").classList.toggle("hidden")
    );
  },
  logoutButtonEventListener() {
    const logoutButton = document.getElementById("logout");
    const mainContainer = document.getElementById("mainContainer");
    logoutButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        sessionStorage.clear();
        mainContainer.innerHTML = "";
        if (document.getElementById("chatContainer").classList.value.includes('hidden') === false) {
          document.getElementById("chatContainer").classList.toggle("hidden");
          document.getElementById("body").classList.toggle("shrink");
        }
        // making nav buttons disappear
        document.getElementById("resourceButtons").classList.toggle("hidden");
        document.getElementById("profileIcon").classList.toggle("hidden");
        // making drop-down disappear
        document.getElementById("profileDropDown").classList.toggle("hidden");
        addToDom.addLoginForm()
      }
    });
  },
  loginTabListener() {

    const mainContainer = document.getElementById("mainContainer");
    mainContainer.addEventListener("click", event => {
      const signupContainer = document.getElementById('signup-tab-content')
      const loginContainer = document.getElementById('login-tab-content')
      const signupTab = document.getElementById('signup-tab')
      const loginTab = document.getElementById('login-tab')
      
      if (event.target.id === 'login-tab' && signupContainer.classList.value == "") {
        signupTab.classList.toggle('active')
        signupTab.classList.toggle('inactive')
        loginTab.classList.toggle('active')
        loginTab.classList.toggle('inactive')
        signupContainer.classList.toggle('hidden')
        loginContainer.classList.toggle('hidden')
      }
    })
  },

  signupTabListener() {

    const mainContainer = document.getElementById("mainContainer");
    mainContainer.addEventListener("click", event => {
      const loginContainer = document.getElementById('login-tab-content')
      const signupContainer = document.getElementById('signup-tab-content')
      const signupTab = document.getElementById('signup-tab')
      const loginTab = document.getElementById('login-tab')

      if (event.target.id === 'signup-tab' && loginContainer.classList.value == "") {
        signupTab.classList.toggle('active')
        signupTab.classList.toggle('inactive')
        loginTab.classList.toggle('active')
        loginTab.classList.toggle('inactive')
        signupContainer.classList.toggle('hidden')
        loginContainer.classList.toggle('hidden')
      }
    })
  },
  addSeeAllButtonEventListener() {
    const seeAllButton = document.getElementById("myAll")

    const mainContainer = document.getElementById("mainContainer");


    seeAllButton.addEventListener("click", () => {

      const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

      // render News containters to DOM

      mainContainer.innerHTML = createNewsComponents.createHTMLNewsContainers()

      // render News cards to DOM

      dbAPI.getObjectByResource('news', loggedInUserId)
        .then(arrayOfNewsArticles => {
          const sortedArrayOfNews = arrayOfNewsArticles.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp)
          })

          sortedArrayOfNews.forEach(article => {
            const newsCardsContainer = document.getElementById("newsCardsContainer")
            newsCardsContainer.innerHTML += createNewsComponents.createNewsCard(article)

          })
        })

      // render Friends container and cards to DOM

      dbAPI.getFriends(loggedInUserId).then(friendDataArray => {
        friendDataArray.forEach(friendObj => {
          const friendId = friendObj.user.id;
          dbAPI.getObjectByResource('news', friendId)
            .then(friendsNews => {
              if (friendsNews.length !== 0) {
                const friendsNewsContainer = document.getElementById('friendsNewsContainer')
                friendsNewsContainer.innerHTML += `<h1 class ="objCards friendCardName">${friendObj.user.username}'s News</h1>`
                friendsNews.forEach(friendArticle => {
                  friendsNewsContainer.innerHTML += createNewsComponents.createFriendsNewsCard(friendArticle)
                })
              }
            })
        })
      })

      // render Events containers

      mainContainer.innerHTML += eventHtmlComponents.createEventsContainersAndHeaders()

      // render Event cards

      dbAPI.getObjectByResource("events", loggedInUserId)
        .then(events => {

          if (events.length === 0) {

            // eventsRenderToDom.renderEventsContainersAndHeaders()

            eventsRenderToDom.renderNoEventsMessage()

          } else {

            // eventsRenderToDom.renderEventsContainersAndHeaders()

            const eventCardsContainer = document.getElementById("objCards--events");

            const eventsSorted = events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })

            for (let i = 0; i < eventsSorted.length; i++) {
              let firstCard = eventsSorted[0]
              if (eventsSorted[i] === firstCard) {
                eventCardsContainer.innerHTML += eventHtmlComponents.createFirstEventCard(firstCard)
              } else {
                eventCardsContainer.innerHTML += eventHtmlComponents.createEventCard(eventsSorted[i])
              }
            }
          }
        })

      // render friend's events

      dbAPI.getFriends(loggedInUserId).then(friendDataArray => {
        friendDataArray.forEach(friendObj => {
          const friendId = friendObj.user.id
          dbAPI.getObjectByResource('events', friendId)
            .then(friendsEvents => {
              if (friendsEvents.length !== 0) {
                const friendsEventsContainer = document.getElementById('friendsEventsContainer')
                friendsEventsContainer.innerHTML += `<h1 class ="objCards friendCardName">${friendObj.user.username}'s Events</h1>`
                friendsEvents.forEach(friendEvent => {
                  friendsEventsContainer.innerHTML += eventHtmlComponents.createFriendEventCard(friendEvent)
                })
              }

            })

        })
      })

      // render Tasks containers

      mainContainer.innerHTML += tasksCreateHTML.createTasksContainer()

      // render Tasks cards

      const tasksContainer = document.getElementById('taskCardsContainer')

      dbAPI.getObjectByResource('tasks', loggedInUserId)
        .then(tasks => {

          if (tasks.length === 0) {
            tasksContainer.innerHTML = `<figure class='noCards'>You don't have any tasks yet. Click the button up top to create a new task!</figure>`
          } else {
            const tasksSorted = tasks.sort((a, b) => { return new Date(a.completionDate) - new Date(b.completionDate) });

            tasksSorted.forEach(task => {
              tasksContainer.innerHTML += tasksCreateHTML.createTaskCard(task)
            })
          }

        })
    })
  }
}

export default eventListeners;
