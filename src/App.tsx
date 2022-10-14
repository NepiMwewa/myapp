import ReactDOM from "react-dom/client";
import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import './App.css';
import { MyCounter } from './components/MyCounter/myCounter';
import { MyHeader } from './layout/MyHeader/myHeader';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<NoPage />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}
//<MyHeader title={SiteManager.getTitle()}/>
export default App;

/*
Temp functions to know how to write them.

  

*/


// conventional props
function Heading({title}: {title: string;}){
  return <h1>{title}</h1>
}
function HeadingWithContent({children}: {children: ReactNode;}): ReactElement{
  return <h1>{children}</h1>
}

//default props
const defaultContainerProps ={
  heading: <strong>My Heading</strong>
}

type ContainerProps = {children: ReactNode} & typeof defaultContainerProps;
function Container({heading, children}: ContainerProps): ReactElement{
  return <div><h1>{heading}</h1>{children}</div>;
}

Container.defaultProps = defaultContainerProps;

//functional props
function TextWithNumber({ header, children}: { header?: (num: number) => ReactNode, children: (num: number) => ReactNode }) {
  const [state, stateSet] = React.useState<number>(1);

  return(
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>
        {children(state)}
      </div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  )
}


//list

function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}
/*
<Heading title="hello there"/>

      <HeadingWithContent>
        <strong>Hi!</strong>
      </HeadingWithContent>

      <Container>foo</Container>

      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is: {num}</div>}
      </TextWithNumber>

      <List 
        items={["Jack", "Sadie", "oso"]}
        render={(item: string) => <div>{item.toLocaleLowerCase()}</div> }
      ></List>
*/