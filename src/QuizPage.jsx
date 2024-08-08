import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid"
import Quiz from "./Quiz"
import he from "he"

export default function QuizPage(props){
    
    const [quizData, setQuizData] = useState([])
    const [lwQuizData, setLwQuizData] = useState([])
    const [quizElements, setQuizElements] = useState([])
    const [isVerified, setIsVerified] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    
    useEffect(()=> {
        if (!quizData.length){
            fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple")
                .then(res => res.json())
                .then(data => {
                    setQuizData(data.results)
                })
            
        }

    }, [])
    
    useEffect(()=> {
        
        if (quizData.length) {
            const quizArr = quizData.map(quiz => {
                const id = nanoid()
                const quizInfo = {
                    id: id,
                    question: he.decode(quiz.question),
                    correctAnswer: he.decode(quiz.correct_answer),
                    incorrectAnswers: quiz.incorrect_answers.map(incAns => he.decode(incAns)),
                    selectedOption: "",
                    isPrevAnsCrct: false,
                    optionsOrder: []
                    }
                setLwQuizData(prevLwQuizData => {
                    return [...prevLwQuizData, quizInfo]
                })
                return (
                    <Quiz key={quizInfo.id} 
                    quizDetails = {quizInfo}
                    storeAnswerFn = {storeAnswer}
                    showResult = {false}
                    setOrderFn = {setOrder}
                    />
                )
            })
            setQuizElements(quizArr)
        }
    }, [quizData])
    
    function setOrder(quizId, order) {
        setLwQuizData(prevLwQuizDataArr => {
            prevLwQuizDataArr.map((prevLwQuizData) => {
                if (prevLwQuizData.id === quizId) {
                    return prevLwQuizData.optionsOrder = order
                } else {
                    return prevLwQuizData
                }
            })
            return prevLwQuizDataArr
        })
    }

    function storeAnswer(quizId, answer){
        setLwQuizData(prevLwQuizDataArr => {
            prevLwQuizDataArr.map((prevLwQuizData) => {
                if (prevLwQuizData.id === quizId) {
                    
                    if (prevLwQuizData.isPrevAnsCrct){
                        prevLwQuizData.isPrevAnsCrct = false
                        setScore(prevScore => prevScore - 1)
                    }
                    if (answer === prevLwQuizData.correctAnswer){
                        setScore(prevScore => prevScore + 1)
                        prevLwQuizData.isPrevAnsCrct = true
                    }
                    prevLwQuizData.selectedOption = answer
                    return prevLwQuizData
                    
                } else {
                    return prevLwQuizData
                }
            })
            return prevLwQuizDataArr
        })
    }


    function verifyAnswers(){
        const quizArr = lwQuizData.map(quiz => {
            return (
                <Quiz key={quiz.id} 
                quizDetails = {quiz}
                showResult = {true}
                />
            )
        })
        setIsVerified(true)
        setQuizElements(quizArr)
    }

    function restartQuiz(){
        props.btnClick()
    }

    return(
        <>
        <div className="quiz-container">
            {quizElements}
                { 
                isVerified ? 
                <div className="result">
                    <h3>You scored {score}/5 correct answers</h3>
                    <button className="verify-btn" onClick={restartQuiz}>Play again</button>
                </div>
                :
                <button className="verify-btn" onClick={verifyAnswers}>Check answers</button>
                }

        </div>
        
        </>
    )
}