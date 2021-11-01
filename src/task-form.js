import {useState} from "react";

function TaskForm(props) {

    const [taskName, setTaskName] = useState("")

    const onSubmitHandler = event => {
        event.preventDefault()

        const newTask = {
            name: taskName
        }

        fetch("http://localhost:3001/items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .finally(() => {
                props.onNewTask(newTask);
                setTaskName("");
            });
    }

    return (
        <div style={{

            margin: "10px"
        }}>
            <form style={{
                display: "flex",
                justifyContent: "space-between"
            }} onSubmit={onSubmitHandler}>
                <input
                    style={{
                        width: "100%",
                        fontSize: "24px",
                        fontWeight: "bold"
                    }}
                    type={"text"} placeholder={"Description"} value={taskName}
                    onChange={(e => setTaskName(e.target.value))}/>
                <input
                    style={{
                        width: "100px",
                        padding: "25px",
                        margin: "10px",
                        backgroundColor: "lightblue"
                    }}
                    type={"submit"}/>
            </form>
        </div>
    )
}

export default TaskForm;
