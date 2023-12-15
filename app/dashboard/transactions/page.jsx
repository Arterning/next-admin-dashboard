import { fetchTransactions } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/transactions/transactions.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { deleteTransaction } from "@/app/lib/actions";
import Search from "@/app/ui/dashboard/search/search";

const TransactionsPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {count, transactions} = await fetchTransactions(q, page);
    // console.log(transactions);
    return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a transactions..." />
        <Link href="/dashboard/transactions/add">
            <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
            {
                transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>
                        <div className={styles.user}>
                            <Image
                                src="/noavatar.png"
                                alt=""
                                width={40}
                                height={40}
                                className={styles.userImage}
                            />
                            {transaction.name}
                        </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                {transaction.status}
                            </span>
                        </td>
                        <td>{transaction.createdAt?.toString().slice(4, 16)}</td>
                        <td>${transaction.amount}</td>
                        <td>
                          <div className={styles.buttons}>
                            <Link href={`/dashboard/transactions/${transaction.id}`}>
                              <button className={`${styles.button} ${styles.view}`}>
                                View
                              </button>
                            </Link>
                            <form action={deleteTransaction}>
                              <input type="hidden" name="id" value={transaction.id} />
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


export default TransactionsPage