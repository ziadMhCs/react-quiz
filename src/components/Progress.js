export default function Progress({index,numbQuestions,points,maxPossiblePoints,answer    }){

    return(
 

            <header
            className="progress"
            >
                <progress style={{"color":"red"}} max={numbQuestions} value={index+Number(answer!=null)}> </progress>
<p>Question <strong>{index+1}</strong>/{numbQuestions}</p>
          <p><strong>{points}</strong>/{maxPossiblePoints}</p>
            </header>

    )
}