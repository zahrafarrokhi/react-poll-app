import { Button, Card } from 'antd';
import moment from 'moment';
import { useEffect, useState, useRef } from 'react';
import TestChoice from './TestChoice/TestChoice'
import './App.css';
import QuestionBase from './QuestionBase/QuestionBase';
import MultiChoice from './MultiChoice/MultiChoice';
import TextAnswer from './TextAnswer/TextAnswer';
import TextAreaAnswer from './TextAreaAnswer/TextAreaAnswer';

function App() {  
  const timerRef = useRef(null);
  const [done, setDone] = useState(false)
  const [remaining, setRemaining] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState()

  const questions = [
    {
      id: 1,
      question: 'How are you doing today?',
      answer_field: (props) => (<TestChoice values={[
        {id: 1, text: "Awesome!"},
        {id: 2, text: "Good!"},
        {id: 3, text: "Okay, i guess!"},
        {id: 4, text: "Not good!"},
      ]} {...props}/>)
    },
    {
      id: 2,
      question: 'Which of the frameworks below have you worked with?',
      answer_field: (props) => (<MultiChoice values={[
        {id: 1, text: "React"},
        {id: 2, text: "Vue"},
        {id: 3, text: "Angular"},
        {id: 4, text: "Svelte"},
      ]} {...props}/>)
    },
    {
      id: 3,
      question: 'Describe yourself in 10 words of less!',
      answer_field: (props) => (<TextAnswer {...props}/>)
    },
    {
      id: 4,
      question: 'How are you doing today?',
      answer_field: (props) => (<TextAreaAnswer {...props}/>)
    },
  ]

  const start = () => {
    console.log("Starting...")
    localStorage.setItem('ends_at', moment().add(120, 'seconds').format("YYYY-MM-DD HH:mm:ss"))
    localStorage.setItem('ongoing', true)
    localStorage.setItem('done', false)
    localStorage.setItem('current', 0)

    for(let q of questions) {
      localStorage.setItem(`q_${q.id}`, undefined)
    }
    
    setCurrentQuestion(0)
    setDone(false)

    startTimer()
  };

  const next = () => {
    localStorage.setItem('current', currentQuestion + 1)
    setCurrentQuestion(currentQuestion + 1)
  }
  const previous = () => {
    if(currentQuestion > 0) {
      localStorage.setItem('current', currentQuestion - 1)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const load = () => {
    console.log("Loading...")
    setCurrentQuestion(Number(localStorage.getItem('current')))
    startTimer();
  }

  const stop = () => {
    console.log("Stopping...")
    localStorage.setItem('done', true)
    localStorage.setItem('ongoing', false)
    setDone(true)
    clearInterval(timerRef.current);
    console.log("Answers: ")
    for(let q of questions) {
      console.log(q.text, localStorage.getItem(`q_${q.id}`))
    }
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timerInterval = setInterval(() => {
      if (moment().isAfter(moment(localStorage.getItem('ends_at'), "YYYY-MM-DD HH:mm:ss"))) stop()
      else remainingTime()
    }, 1000);
    timerRef.current = timerInterval;
  };

  useEffect(() => {
    console.log("Hello there!")
    if(JSON.parse(localStorage.getItem('done'))) {
      setDone(true)
      console.log("Oops we're done")
      return;
    }
    if(JSON.parse(localStorage.getItem('ongoing'))) {
      localStorage.setItem('ongoing', true)
      load();
    } else start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [])

  const remainingTime = () => {
    const val = moment(localStorage.getItem('ends_at'), "YYYY-MM-DD HH:mm:ss").diff(moment(), 'seconds')
    setRemaining(`${Math.floor(val / 60)}:${val % 60}`)
  }

  if(done){
    return (
      <div className="App">
        <Button type="primary" onClick={start}>Reset?</Button>
      </div>

    )
  }

  return (
    <div className="App">

      {currentQuestion < questions.length && (
        <QuestionBase 
          id={questions[currentQuestion].id} 
          key={questions[currentQuestion].id} 
          AnswerField={questions[currentQuestion].answer_field} 
          question={questions[currentQuestion].question}/>
      )}

      Time Left: {remaining}
      <div className="actions">
      <Button type="primary" onClick={previous} disabled={currentQuestion === 0}>Previous</Button>
      <Button type="primary" onClick={next} disabled={currentQuestion >= questions.length}>Next</Button>
      </div>
    </div>
  );
}

export default App;
