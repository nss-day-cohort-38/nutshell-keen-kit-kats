
import tasksCreateHTML from "./tasksComponentCreators.js"
import dbAPI from "../dbAPI.js"




const taskExample = 
    {
    "id": 1,
    "userId": 1,
    "task": "Take out garbage",
    "completionDate": "2020-02-20",
    "complete": true
    }


const tasksAddToDom = {

    addTasksContainers() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.innerHTML = tasksCreateHTML.createTasksContainer()

    },

    addTaskCards() {
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id
        const tasksContainer = document.getElementById('taskCardsContainer')

        dbAPI.getObjectByResource('tasks',currentUserId)
            .then(tasks => {

                tasks.forEach(task => {
                    tasksContainer.innerHTML += tasksCreateHTML.createTaskCard(task)
                });
            })
    },

    addEditNameComponent(taskName, taskId) {
        const taskNameContainer = document.getElementById(`taskNameContainer-${taskId}`)

        taskNameContainer.innerHTML = tasksCreateHTML.createEditTaskNameComponent(taskName, taskId)
    }

}

export default tasksAddToDom