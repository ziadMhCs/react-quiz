// build question , option components + option selecting mechanism 
import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader"
import Error from "./Error"
import Question from "./Question";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";

const initialState = {
  questions:[], 
  status:"loading",
  index:0, // tracks the question to be displayed
  answer: null,
  points:0
};
function reducer(state, action){
  switch (action.type) {
    case "dataReceived":
      return({...state,questions:action.payload,status:"ready" })

      case "dataFailed":
        return({...state,status:"error" })
        case  "start":
          return {...state, status:"active"}

          case  "newAnswer":
            const question =  state.questions.at(state.index);
            return {...state, answer:action.payload,
              points:action.payload===question.correctOption?state.points + question.points:state.points
              // points: action.payload===question.correctOption?"T":"f" 
  
            } 
  
  default:
throw new Error("Action Unknown")}

}
export default function App() {
const[{questions,status,index,answer},dispatch] = useReducer(reducer , initialState)
const numbQuestions = questions.length;
// useEffect(()=>console.log(state),[state]);

  useEffect(   function(){
    fetch("http://localhost:8800/questions")
    .then((res) => res.json())
    .then(data=>dispatch({type:"dataReceived",payload:data}))
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
      {status==="active"&& <Question dispatch={dispatch} answer={answer} question={questions.at(index)} />}


      </Main>
    </div>
  );
}
