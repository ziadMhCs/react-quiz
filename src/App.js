import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader"
import Error from "./Error"
import Question from "./Question";
import { startTransition, useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";

const initialState = {
  questions:[], 
  //loading, error, ready, active, finished
  status:"loading"
};
function reducer(state, action){
  switch (action.type) {
    case "dataReceived":
      return({questions:action.payLoad,status:"ready" })

      case "dataFailed":
        return({...state,status:"error" })
        case  "start":
          return {...state, status:"active"}
 
  default:
throw new Error("Action Unknown")}

}
export default function App() {
const[{questions,status},dispatch] = useReducer(reducer , initialState)
const numbQuestions = questions.length;
// useEffect(()=>console.log(state),[state]);

  useEffect(   function(){
    fetch("http://localhost:8800/questions")
    .then((res) => res.json())
    .then(data=>dispatch({type:"dataReceived",payLoad:data}))
    .catch((err) => dispatch({type:"dataFailed"}));
    
  }     
,[])
 
  return (
    <div className="app">
      <Header />
      <Main>
      {status==="isLoading"&& <Loader/>}
      {status==="error"&& <Error/>}
      {status==="ready"&& <StartScreen dispatch={dispatch} numbQuestions={numbQuestions}/>}
      {status==="active"&& <Question />}


      </Main>
    </div>
  );
}
