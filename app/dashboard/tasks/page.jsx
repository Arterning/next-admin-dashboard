import { NingTable } from "@/app/ui/dashboard/table/table";
import styles from './page.module.css';
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import { readAllTasks } from "@/app/lib/action-task";

const TaskPage = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {count, tasks} = await readAllTasks(q, page);

    const tableData = tasks.map(task => {
        return {
            id: task.id,
            title: task.title,
            description: task.description
        }
    })

    console.log(tableData);


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a tasks..." />
                <Link href="/dashboard/tasks/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <NingTable count={count} data={tableData} viewUrl={"/dashboard/tasks/"}/>
        </div>
    )
}

export default TaskPage