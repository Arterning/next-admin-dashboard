import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer"
import { Toaster } from "sonner"
import { QueryProvider } from "../providers/query-provider"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <QueryProvider>
        <div className={styles.menu}>
          <Sidebar/>
        </div>
        <div className={styles.content}>
          <Navbar/>
          <Toaster />
          {children}
          <Footer/>
        </div>
      </QueryProvider>
    </div>
  )
}

export default Layout