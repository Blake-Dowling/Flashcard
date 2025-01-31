import React from 'react'
import './Card.css'

export default function Card(props) {
  return (
    <div 
        className={'card'}
        onClick={()=>props.clickAction()}>
        <div className={'card-section'}>
            {props.question}
        </div>
        <div className={'card-section'}>
            {props.showAnswer && props.answer}
        </div>
    </div>
  )
}
