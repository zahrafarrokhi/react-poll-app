import { Card } from 'antd';
import react, {useState, useEffect} from 'react';
// import './QuestionBase.css'

const QuestionBase = (props) => {
  const {question, AnswerField, id} = props;
  const [answer, setAnswer] = useState();
  const qid = `q_${id}`

  const answerQuestion = async (value) => {
    console.log(value, qid)
    const nans = {question, id, value}
    setAnswer(nans)
    localStorage.setItem(qid, JSON.stringify(nans));
  }

  const loadAnswer = async () => {
    const ans = JSON.parse(localStorage.getItem(qid));
    setAnswer(ans)
    console.log(ans)
  }

  useEffect(() => {
    loadAnswer()
  }, [id])

  return (
    <Card title={`${id}: ${question}`} bordered={true} style={{width: "30%"}}>
      <AnswerField key={`q_${id}_ans`} value={answer?.value} onChange={answerQuestion}/>
    </Card>
  )

}

export default QuestionBase;

