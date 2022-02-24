import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";

export const SideBarData = [
  {
    title: "Home",
    icon: <AiFillHome />,
    link: "/",
  },
  {
    title: "My Orders",
    icon: <BiFoodMenu />,
    link: "/myorders",
  },
  {
    title: "My Cart",
    icon: <BsFillCartFill />,
    link: "/mycart",
  },
  {
    title: "My Wishlist",
    icon: <AiFillHeart />,
    link: "/mywishlist",
  },
];
