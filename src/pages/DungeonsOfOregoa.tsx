import React, { useEffect } from 'react';
import { Container } from "react-bootstrap";
import { MyCounter } from "../components/MyCounter/myCounter";
import { SiteManager } from '../siteManager';
import { Button } from 'react-bootstrap';

// initalize the count counter
function countInitial(): number{
  let temp: number = 0;

  if( window.localStorage.getItem("count") != null){
    temp = JSON.parse(window.localStorage.getItem("count") || "string");
  }else{
    temp = 0;
  }

  SiteManager.setDmg(temp);
  return temp;
}

export function DungeonsOfOregoa({title}: {title?: string;}){
  const [count, countSet] = React.useState<number>(() => countInitial());

  useEffect(() => {
    if( window.localStorage.getItem("count") != null){
      countSet(JSON.parse(window.localStorage.getItem("count") || "string"));
    }else{
      console.log("no worky");
    }
  }, []);
  
  useEffect(() => {
    
    window.localStorage.setItem("count", count.toString());
    
  }, [count]);

  return (
    <Container className="App container-fluid">
      <p>{count}</p>
      <MyCounter className='m-2' inputSize={1} stateParam={count} paramStateSet={countSet}>Add 1</MyCounter>
      <MyCounter className='m-2' inputSize={3} stateParam={count} paramStateSet={countSet}>Add 3</MyCounter>
      <Button className='m-2' variant='dark' type="submit" onClick={() => 
        {
          SiteManager.setDmg(0);
          countSet(SiteManager.getDmg());
        }}> 
          reset
      </Button>
    </Container>
  );
}

