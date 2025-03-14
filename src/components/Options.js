export default function Options({question,answer, dispatch}){
const hasAnswerd = answer!==null;
console.log(answer)
    return(
        <div>
        {question.options.map((option,index) => (
          <button className={`btn btn-option ${index===answer?"answer":""}
          ${hasAnswerd?index===question.correctOption?"correct":"wrong":""}
          ` }
          disabled={hasAnswerd}
           key={option}
          onClick={()=>dispatch({type:"newAnswer",payload:index})}>{option}</button>
        ))}
     </div>
)
}