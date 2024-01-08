import { LandingNavbar } from "@/components/landing-navbar";
import Link from "next/link";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdImage,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdReadMore,
} from "react-icons/md";

// TODO
const Homepage = () => {
  return (
    <div className="p-8">
      <div>Homepage</div>
      <h1 className="text-xl font-bold underline">Hello world!</h1>
      <div className="p-6 flex gap-6">
        <MdDashboard/>
        <MdShoppingBag/>
        <MdSupervisedUserCircle/>
        <MdReadMore/>
        <MdAttachMoney/>
        <MdAnalytics/>
        <Link href={"login"}>
          Log in
        </Link>
        <LandingNavbar/>
      </div>
    </div>
  );
};

export default Homepage;
