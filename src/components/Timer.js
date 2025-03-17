import { useEffect } from "react";
export default function Timer({dispatch,secondsRemaining}){
    useEffect(
        function(){
            const interval = setInterval(() => {
                if (secondsRemaining<=0){dispatch({type:"finish"});return}
 
                dispatch({type:"tick"})
                
            }, 1000);

            return () => clearInterval(interval);

        },[dispatch,secondsRemaining])

    return(
        <div className="timer">
            {secondsRemaining}
        </div>
    )
}