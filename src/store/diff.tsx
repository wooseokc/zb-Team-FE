import React, {createContext, useReducer} from "react";

export const DiffContext = createContext<any>(null);

const initialDiff : any = {
  diff : 'Easy'
}

const DiffReducer : any = (state : any, action: any) => {
  if (action.type === 'selectDiff') {
    return {diff : action.text}
  }
}

export default function DiffStore (props : any) {
  const [diff, dispatch] = useReducer(DiffReducer, initialDiff)

  return <DiffContext.Provider value={{dispatch, diff}}>{props.children}</DiffContext.Provider>
}