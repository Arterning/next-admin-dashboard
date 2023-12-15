import { fetchTransactions } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/transactions/transactions.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const TransactionsPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const {count, transactions} = await fetchTransactions(q, page);
    console.log(transactions);
    return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <div className={styles.top}>
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