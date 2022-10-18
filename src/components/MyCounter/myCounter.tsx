import React from 'react';
import { SiteManager } from '../../siteManager';
import { Button } from 'react-bootstrap';

export function MyCounter({inputSize, stateParam, paramStateSet, className, children}: {inputSize?: number, stateParam: number, paramStateSet: Function, className: string, children?: string;}){
  return (
    <div>
      <Button className={className} variant='dark' type="submit" onClick={() => buttonClickedOutside(stateParam, paramStateSet, inputSize)}> 
        {children || "press me"}
      </Button>
    </div>
  );
}

function buttonClickedOutside(param: number, paramSet: Function, inputSize?: number){
  SiteManager.addDmg(inputSize || 1);
  paramSet(SiteManager.getDmg());
}