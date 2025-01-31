import React from 'react'

export default function Card(props) {
    console.log(props)
  return (
    <div onClick={()=>props.clickAction()}>
        <div>
            {props.question}
        </div>
        <div>
            {props.showAnswer && props.answer}
        </div>
    </div>
  )
}
