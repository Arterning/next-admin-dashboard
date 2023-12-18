
import { createFile } from "@/app/lib/actions";
import styles from "./addFiles.module.css"

const addMediaPage = () => {
    return (
        <div className={styles.container}>
          <form action={createFile} className={styles.form}>
            <input type="text" placeholder="name" name="name" required />
            <input type="type" placeholder="type" name="type" required />
            <input type="file" placeholder="file" name="file"/>
            <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default addMediaPage;