import React, {createContext, useReducer} from "react";

export const DiffContext = createContext<any>(null);

const initialDiff : any = {
  diff : 'Easy'
}

const initialWidth = {
  width : 0
}

const DiffReducer : any = (state : any, action: any) => {
  if (action.type === 'selectDiff') {
    return {diff : action.text}
  } 
}

const WidthReducer = (state : any, action: any) => {
  if (action.type === 'changeWidth') {
    return {width : action.number}
  }
}

export default function DiffStore (props : any) {
  const [diff, dispatch] = useReducer(DiffReducer, initialDiff)
  const [width, Widthdispatch] = useReducer(WidthReducer, initialWidth)

  return <DiffContext.Provider value={{dispatch, diff, width, Widthdispatch}}>{props.children}</DiffContext.Provider>
}