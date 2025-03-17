// implement timer
import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0, // tracks the question to be displayed
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining:null
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, secondsRemaining: action.payload.length*30,status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        // points: action.payload===question.correctOption?"T":"f"
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

      case "restart":
        return { ...state, status: "ready", index: 0, answer: null, points: 0 };

        case "tick":
          return { ...state, secondsRemaining: state.secondsRemaining -1};

    default:
      throw new Error("Action Unknown");
  }
}
export default function App() {
  const [{ questions, status, index, answer, points, highScore,secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const numbQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, next) => prev + next.points,
    0
  );
  // useEffect(()=>console.log(state),[state]);

  useEffect(function () {
    fetch("http://localhost:8800/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "isLoading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numbQuestions={numbQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numbQuestions={numbQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions.at(index)}
            />

<footer>
          <NextButton
            dispatch={dispatch}
            status={status}
            answer={answer}
            numQuestions={numbQuestions}
            index={index}
          />

          <Timer secondsRemaining={secondsRemaining}dispatch={dispatch} />
        </footer>

          </>
        )}

        {status === "finished" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
            points={points}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
