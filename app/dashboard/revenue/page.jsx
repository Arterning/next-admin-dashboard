import Card from "@/app/ui/dashboard/card/card"
import style from "./page.module.css"

const RevenuePage = () => {

    const item = {
        id: 3,
        title: "Revenue",
        number: 6.642,
        change: 18,
    }

    return (
        <div className={style.container}>
            <Card item={item} key={item.id} />
        </div>
    )
}

export default RevenuePage