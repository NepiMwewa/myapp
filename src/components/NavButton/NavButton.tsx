import React,{ ReactElement, ReactNode } from 'react';

export function NavButton({currentSelection, children}: {currentSelection?: number, children?: string;}){
  const [state, stateSet] = React.useState<number>(1);

  return (
    <div>
      <button className="nav-link" type="submit" onClick={() => stateSet(state + 1)}> 
        {children || "Mising Text"} {state}
      </button>
    </div>
  );
}