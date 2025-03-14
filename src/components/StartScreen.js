export default function StartScreen({numbQuestions,dispatch}) {
  return (
    <div className="start">
      <h3>welcome to the react quiz!</h3>
      <p>{numbQuestions} questions to teset your react mastery </p>
    <button className="btn btn-ui"
    onClick={()=>dispatch({type:"start"})}>let's start</button>
    </div>
  );
}
