import React, { useEffect, useState } from "react";
import StartPage from "./StartPage";
import QuizPage from "./QuizPage";
export default function App(){
    
    const [quizStarted, setQuizStarted] = useState(false)
    

    function setQuizStatus(){
        setQuizStarted(prevStatus => !prevStatus)
    }

    return(
        <div className="main-container">
            {
                quizStarted ?
                <QuizPage btnClick={() => setQuizStatus()}/>
                :
                <StartPage btnClick={() => setQuizStatus()}/>
            }
        </div>
    )
}