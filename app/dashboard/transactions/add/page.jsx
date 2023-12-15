import { createTransaction } from "@/app/lib/actions"
import styles from "@/app/ui/dashboard/transactions/addTransaction/addTransaction.module.css"

const AddTransactionPage = () => {
    return (
        <div className={styles.container}>
          <form action={createTransaction} className={styles.form}>
            <input type="text" placeholder="name" name="name" required />
            <input type="amount" placeholder="amount" name="amount" required />
            <select name="status" id="status">
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default AddTransactionPage