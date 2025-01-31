
import './App.css';
import { useState, useEffect } from 'react'
import Card from './Card'



function App() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    //******************** fetch text file ********************/
    fetch(`${process.env.PUBLIC_URL}/file1.txt`)
      .then(response => response.text())
      .then(text => {
        let newQuestions = []
        let newAnswers = []
        // console.log(text.replace(/\r/g, '\\r').replace(/\n/g, '\\n'))
        text?.split(/\s+(?=\d+\. )/g).forEach((entry, index) => {
          // console.log(entry)
          const [question, ...answer] = entry.split(/\r\n(.*)/s)
          newQuestions.push(question)
          newAnswers.push(answer)
        })
        setQuestions(newQuestions)
        setAnswers(newAnswers)
      })
      .catch(error => console.error('Error loading file:', error))
  }, [])

  //******************** initialize question after txt loaded ********************/
  useEffect(() => {
    clickAction()
  }, [questions])

  //******************** click action ********************/
  function clickAction(){
    //Answer already revealed, go to next question
    //(or initial setting of questionNumber)
    if(questionNumber === null || showAnswer){
      setQuestionNumber(Math.floor(Math.random()*questions.length))
      setShowAnswer(false)
    }
    //Answer not revealed, simply show answer
    else{
      setShowAnswer(true)
    }
  }

  return (
    <div className="App">
      <Card
          question={questions[questionNumber]}
          answer={answers[questionNumber]}
          showAnswer={showAnswer}
          clickAction={clickAction}
      />
    </div>
  );
}

export default App;
