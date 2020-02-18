import tasksAddToDom from "./tasksAddToDom.js"


const taskExample = 
    {
    "id": 1,
    "userId": 1,
    "task": "Take out garbage",
    "completionDate": "2020-02-20",
    "complete": true
    }


    const tasksCreateHTML = {

        convertDateAndTime(date) {
                const dateTimeArr = date.split('T');
                const time = dateTimeArr[1]
                const oldDate = dateTimeArr[0]
                const dateArr = oldDate.split('-')

                return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}<br>By - ${time}`

        },

        createTasksContainer() {
            return `
            <article class='createFormContainer' id='taskFormContainer'>
                <button class='createFormButton' id='createTaskForm'>Create New Tasks</button>
            </article>
            <article class='objCards' id='taskCardsContainer'>
    
            </article>
            `
        },

        createTaskCard(task) {
            return `
                <figure class='cards' id='taskContainer-${task.id}'>
                    <div id="taskText">
                        <div id='taskNameContainer-${task.id}'>
                        <h2 id="taskName-${task.id}">Task: ${task.task}</h2>
                        </div>
                        <h3>Deadline: ${this.convertDateAndTime(task.completionDate)}</h3>
                    </div>
                    <div id="markCompleteContainer">
                        <p>Mark Complete? <input type='checkbox' id='markTaskComplete' value=${task.complete}></p>
                    </div>
                </figure>
            `
        },

        createNewTaskForm() {
            return  `
            <article id="taskFormContainer">
            <form name="taskForm" id="taskForm" action="">
                <fieldset form="taskForm" id="taskNameField">
                    <label for="taskName">Date of entry</label>
                    <input type="text" name="taskName" id="taskName" placeholder='Enter Task Here'>
                </fieldset>
                <fieldset form="taskForm" id="completionDateField">
                    <label for="completionDate">When do you want it done?</label>
                    <input type="datetime-local" name="completionDate" id="completionDate">
                </fieldset>
            </form>
            <button id='saveBtn' class='button'>Save Task</button>
            </article>
            `
        }, 

        createEditTaskNameComponent(taskName, taskId) {
            return `<h2>Task: <input type='text' class='input' id="editName-${taskId}" placeholder='${taskName}'></h2>`
        }
        

    }

    export default tasksCreateHTML