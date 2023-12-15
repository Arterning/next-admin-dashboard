import { updateTransaction } from "@/app/lib/actions";
import { fetchTransaction } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/transactions/addTransaction/addTransaction.module.css"

const SingleTransactionPage = async ({ params }) => {
    const { id } = params;
    const transaction = await fetchTransaction(id);
    return (
        <div className={styles.container}>
          <form action={updateTransaction} className={styles.form}>
            <input type="hidden" name="id" value={transaction.id} />
            <input type="text" placeholder={transaction.name} name="name" />
            <input type="amount" placeholder={transaction.amount} name="amount" />
            <select name="status" id="status">
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
    )
}

export default SingleTransactionPage;