import Image from "next/image";
import styles from "./page.module.css"
import { fetchFile } from "@/app/lib/data";
import { updateFile } from "@/app/lib/actions";


const FilePage = async ({ params }) => {
    const { id } = params;

    const file = await fetchFile(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={file.url} alt="" fill />
                </div>
                {file.name}
            </div>
            <div className={styles.formContainer}>
                <form action={updateFile} className={styles.form}>
                    <input type="hidden" name="id" value={file.id} />
                    <label>Name</label>
                    <input type="text" placeholder={file.name} name="name" />
                    <label>Type</label>
                    <input type="type" placeholder={file.type} name="type" />
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default FilePage;