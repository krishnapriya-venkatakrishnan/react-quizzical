import React, {useEffect, useState} from "react";

export default function Quiz(props){

    let optionsOrder = []
    let array = []

    useEffect(()=> {
        props.setOrderFn(props.quizDetails.id, array)
    }, [])

    function highlightOption(event){
        const parent = event.target.parentNode
        const children = parent.children
        
        for(let i=0; i<children.length; i++){
            if (children[i] !== event.target)
                children[i].classList.remove("highlight")
        }

        event.target.classList.toggle("highlight")

        if (event.target.classList.contains("highlight")){
            props.storeAnswerFn(props.quizDetails.id, event.target.textContent, optionsOrder)
        } else {
            props.storeAnswerFn(props.quizDetails.id, "", optionsOrder)
        }
    }

    function shuffleOptions(){
        array = [props.quizDetails.incorrectAnswers[0],
        props.quizDetails.incorrectAnswers[1],
        props.quizDetails.incorrectAnswers[2],
        props.quizDetails.correctAnswer]

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        const optionElements = array.map(option => {
            return <h2 key={props.quizDetails.id+"-"+option} className="option" onClick={highlightOption}>{option}</h2>
        })
        
        return optionElements
    }

    function showResult(){

        optionsOrder = props.quizDetails.optionsOrder
        const correctAnswer = props.quizDetails.correctAnswer
        const selectedOption = props.quizDetails.selectedOption
        
        if (selectedOption === correctAnswer){
            const optionElements = optionsOrder.map(option => {
                if (option === selectedOption) {
                    return <h2 key={props.quizDetails.id+"-"+option} className="option green">{option}</h2>
                } else {
                    return <h2 key={props.quizDetails.id+"-"+option} className="option grey">{option}</h2>
                }
            })
            return optionElements
        } else {
            const optionElements = optionsOrder.map(option => {
                if (option === selectedOption) {
                    return <h2 key={props.quizDetails.id+"-"+option} className="option red">{option}</h2>
                } else if (option === correctAnswer) {
                    return <h2 key={props.quizDetails.id+"-"+option} className="option green">{option}</h2>
                } else {
                    return <h2 key={props.quizDetails.id+"-"+option} className="option grey">{option}</h2>
                }
            })
            return optionElements
        }
        
    }

    return (
        <div className="quiz">
            <div className="question-container">
                <h1 className="question">{props.quizDetails.question}</h1>
            </div>
            <div className="options-container">
                {props.showResult ? showResult() : shuffleOptions()}
            </div>
        </div>

    )
}