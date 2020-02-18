
import tasksAddToDom from "./tasksAddToDom.js"
import tasksComponentCreators from "./tasksComponentCreators.js"
import dbAPI from "../dbAPI.js"
import {createHTML, createObjects}  from "../createComponent.js"

const tasksEventListeners = {

    taskNavBarEventListener() {
        const tasksButton = document.getElementById('myTasks')
        const mainContainer = document.getElementById('mainContainer')
        
        tasksButton.addEventListener('click', ()=>{
            mainContainer.innerHTML = ""
            tasksAddToDom.addTasksContainers()
            tasksAddToDom.addTaskCards()
        })
    },

    createTaskEventListener() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.addEventListener('click', (event)=>{
            if (event.target.id === 'createTaskForm') {
                const taskFormContainer = document.getElementById('taskFormContainer')

                taskFormContainer.innerHTML = tasksComponentCreators.createNewTaskForm()
            }
        })
    },

    saveTaskEventListener() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.addEventListener('click', (event)=>{
            if (event.target.id === 'saveBtn') {
                const taskFormContainer = document.getElementById('taskFormContainer')
                const taskName = document.getElementById('taskName').value
                const completionDateTime = document.getElementById('completionDate').value
                const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id

                if (taskName === "" || completionDateTime === "") {
                    return alert('Please fill out all fields!')
                }
                
                const taskObject = {
                    "task": taskName,
                    "completionDate": completionDateTime,
                    "isComplete": false,
                    "userId": currentUserId
                }

                dbAPI.postObjectByResource("tasks", taskObject)
                    .then(()=>{
                        tasksAddToDom.addTasksContainers()
                        tasksAddToDom.addTaskCards()
                        console.log(completionDateTime)
                    })
                
            }
        })
    }, 

    // Not Done
    taskCompleteEventListener() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.addEventListener('click', (event)=>{
            if (event.target.id === 'markTaskComplete') {
                const taskFormContainer = document.getElementById('taskFormContainer')
                const taskName = document.getElementById('taskName').value
                const completionDateTime = document.getElementById('completionDate')
                const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id

                dbAPI.patchObjectByResource("tasks", taskObject)
                    .then(()=>{
                        tasksAddToDom.addTasksContainers()
                        tasksAddToDom.addTaskCards()
                    })
                
            }
        })
    },

    editTaskNameEventListener() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.addEventListener('dblclick', (event) => {

            if (event.target.id.startsWith('taskName')) {
                const taskId = event.target.id.split('-')[1]
                const taskName = document.getElementById(`taskName-${taskId}`).value
                
                dbAPI.fetchObjectById('tasks', taskId)
                    .then(task => {
                        tasksAddToDom.addEditNameComponent(task.task, task.id)
                    })
            };
        });
    },

    // Not Done
    saveEditedNameEventListener() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.addEventListener('keyup', (event) => {

            if (event.target.id.startsWith('editName') && event.key === "Enter") {

                const taskId = event.target.id.split('-')[1]
                const editedName = document.getElementById(`editName-${taskId}`).value
                const patchedNameObj = createObjects.patchedKeyValueObjectCreator('task', editedName)

                dbAPI.patchObjectByResource('tasks', taskId, patchedNameObj)
                    .then(() => {
                        document.getElementById('taskCardsContainer').innerHTML = ""
                        tasksAddToDom.addTaskCards()
                    })
            };
        });
    }



}

export default tasksEventListeners