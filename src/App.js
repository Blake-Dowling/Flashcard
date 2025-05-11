
import './App.css';
import { useState, useEffect } from 'react'
import Card from './Card'



function App() {
  const [notesFiles, setNotesFiles] = useState(["Networks Ch1.txt", "Networks Ch2.txt", "Networks Ch3.txt", "Networks Ch4.txt", "Networks Ch5.txt", "Networks Ch6.txt", "Reinforcement Learning.txt"])
  const [selectedFile, setSelectedFile] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [random, setRandom] = useState(true)

  useEffect(() => {
    loadFile()
  }, [selectedFile, random])

  //******************** initialize question after txt loaded ********************/

  useEffect(() => {

    setShowAnswer(questionNumber % 2 == 1)

    
  }, [questionNumber])
  function loadFile(){
    //******************** fetch text file ********************/
    fetch(`${process.env.PUBLIC_URL}/${notesFiles[selectedFile]}`)
      .then(response => response.text())
      .then(text => {
        let newQuestions = []
        let newAnswers = []
        // console.log(response)
        // console.log(JSON.stringify(text))
        // console.log(text.replace(/\r/g, '\\r').replace(/\n/g, '\\n'))
        text?.split(/\s+(?=\d+\. )/g).forEach((entry, index) => {
          // console.log(JSON.stringify(entry))
          const [question, ...answer] = entry.split(/\r\n(.*)/s)
          if(question.length && answer.length){
            // console.log(question)
            newQuestions.push(question)
            newAnswers.push(answer)
          }
        })
        setQuestionNumber(0)
        if(random){
          for (let i = newQuestions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let tempNewQuestions = newQuestions[i]
            newQuestions[i] = newQuestions[j]
            newQuestions[j] = tempNewQuestions

            let tempNewAnswers = newAnswers[i]
            newAnswers[i] = newAnswers[j]
            newAnswers[j] = tempNewAnswers
          }
        }
        setQuestions(newQuestions)
        setAnswers(newAnswers)
      })
      .catch(error => console.error('Error loading file:', error))
  }
  //******************** click action ********************/
  function clickAction(direction){ //direction == -1 or 1

    setQuestionNumber(prevQuestionNumber => {
      let newQuestionNumber = ((prevQuestionNumber + direction) + (2*questions.length)) % (2*questions.length)
      setShowAnswer(newQuestionNumber % 2 == 1)
      return newQuestionNumber
    })

  }

  return (
    <div className="App">
      <button onClick={() => {
        clickAction(-1)}}>
        ←
      </button>
      <select
        value={notesFiles[selectedFile]}
        onChange={(e) => setSelectedFile(e.target.selectedIndex)}
      >
        {notesFiles.map(notesFile => {
          return <option value={notesFile}>{notesFile}</option>
        })}
      </select>
      <button
        onClick={() => setRandom(!random)}
      >
        {random ? <p1>sequential</p1> : <p1>random</p1>}
      </button>
      {parseInt(questionNumber/2)+1}/{questions.length}
      <Card
          question={questions[parseInt(questionNumber/2)]}
          answer={answers[parseInt(questionNumber/2)]}
          showAnswer={showAnswer}
          clickAction={clickAction}
      />
    </div>
  );
}

export default App;
