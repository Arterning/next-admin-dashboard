import UserCard from "@/app/ui/dashboard/user-card/user-card"
import style from "./page.module.css"

const TeamPage = () => {

    const teamMembers = [
        {
            id: 1,
            title: "System Designer",
            description: "Mike Tony",
            detail: "The best designer of the world! He has very beautiful design techologies",
        },
        {
            id: 2,
            title: "Fronted Developer",
            description: "Angela Brown",
            detail: "Fancy developer with good design skills, include good design techologies",
        },
        {
            id: 3,
            title: "UI/UX Designer",
            description: "Linda Kim",
            detail: "Very impressive UI/UX design, she has good design techologies",
        }
    ];

    return (
        <div className={style.container}>
            <div className={style.cards}>
                {teamMembers.map((item) => (
                    <UserCard item={item} key={item.id} />
                ))}
            </div>
        </div>
    )

}

export default TeamPage