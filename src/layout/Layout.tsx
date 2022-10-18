import { Outlet} from "react-router-dom";
import { Header } from "./MyHeader/Header";

const Layout = () => {
  return (
    <>
      <Header/>

      <Outlet />

    </>
  )
};

export default Layout;