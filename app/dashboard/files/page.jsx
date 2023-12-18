import { fetchFiles } from '@/app/lib/data';
import styles from './page.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const MediaPage = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {count, files} = await fetchFiles(q, page);

    return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a files..." />
        <Link href="/dashboard/files/add">
            <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Type</td>
            <td>Size</td>
            <td>Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
            {
                files.map((file) => (
                    <tr key={file.id}>
                        <td>
                        <div className={styles.user}>
                            <Image
                                src="/noavatar.png"
                                alt=""
                                width={40}
                                height={40}
                                className={styles.userImage}
                            />
                            {file.name}
                        </div>
                        </td>
                        <td>{file.type}</td>
                        <td>{file.size} KB</td>
                        <td>{file.createdAt?.toString().slice(4, 16)}</td>
                        <td>
                          <div className={styles.buttons}>
                            <Link href={`/dashboard/files/${file.id}`}>
                              <button className={`${styles.button} ${styles.view}`}>
                                View
                              </button>
                            </Link>
                            <form>
                              <input type="hidden" name="id" value={file.id} />
                              <button className={`${styles.button} ${styles.delete}`}>
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
    )
}

export default MediaPage;