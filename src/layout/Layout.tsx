import { Outlet, Link } from "react-router-dom";
import { MyHeader } from "./MyHeader/myHeader";

const Layout = () => {
  return (
    <>
      <MyHeader/>

      <Outlet />
      
    </>
  )
};

export default Layout;