import { createOrUpdateTask, queryTask } from "@/app/lib/action-task";
import styles from "./page.module.css"
import ButtonGroup from "./_components/button-group";


const SingleTaskPage = async ({ params }) => {

    const { id } = params;

    const task = await queryTask(id);


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form action={createOrUpdateTask} className={styles.form}>
                    <input type="hidden" name="id" value={task?.id} />
                    <label>Title</label>
                    <input type="text" placeholder={task?.title} name="title" />
                    <label>Description</label>
                    <input type="text" placeholder={task?.description} name="description" />
                    <label>Date</label>
                    <input type="date" name="date" placeholder={task?.date}/>
                    <label>Is Important</label>
                    <input type="checkbox" name="isImportant"/>
                    <label>Is Completed</label>
                    <input type="checkbox" name="isCompleted"/>
                    <ButtonGroup/>
                </form>
            </div>
        </div>
    )
}

export default SingleTaskPage