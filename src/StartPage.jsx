import React from "react";

export default function StartPage(props){
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <h2>Self assessment</h2>
            <button onClick={props.btnClick}>Start quiz</button>
        </div>
    )
}