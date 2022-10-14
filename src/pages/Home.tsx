import App from "../App";
import { MyCounter } from "../components/MyCounter/myCounter";
import { MyHeader } from "../layout/MyHeader/myHeader";

const Home = () => {
  return (
    <div className="App container-fluid">
      
      <hr></hr>
      <MyCounter/>
  </div>
  )
};

export default Home;