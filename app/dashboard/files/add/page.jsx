
import { createFile } from "@/app/lib/actions";
import styles from "./addFiles.module.css"

const addMediaPage = () => {
    return (
        <div className={styles.container}>
          <form action={createFile} className={styles.form}>
            <input type="text" placeholder="name" name="name" />
            <input type="type" placeholder="type" name="type" />
            <input type="file" placeholder="file" name="file" required/>
            <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default addMediaPage;