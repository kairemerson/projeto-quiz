import S from "./styles.module.css"
import {QuestionAnswer} from "../QuestionAnswer/index"
import { useState } from "react"

const QUESTIONS =[
    {
        id:1,
        question: "Qual é o meu nome?",
        answers: ["Joao", "Ana", "Remerson"],
        correctAnswer: "Remerson"
    },
    {
        id:2,
        question: "Qual é a minha idade?",
        answers: ["37", "30", "40"],
        correctAnswer: "37"
    },
    {
        id:3,
        question: "Qual minha profissão?",
        answers: ["Médico", "Desenvolvedor", "Engenheiro"],
        correctAnswer: "Remerson"
    },
    {
        id:4,
        question: "Qual o nome da minha filha?",
        answers: ["Joao", "Ana", "Remerson"],
        correctAnswer: "Ana"
    }
]

export function Quiz (){
    const currentQuestion = QUESTIONS[0]
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)

    const handleAnswerQuestion = (event, question, answer)=>{
        console.log(event, question, answer);
        if(isCurrentQuestionAnswered){
            return
        }
        const isCorrectAnswer = question.correctAnswer === answer
        
        const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
        event.currentTarget.classList.toggle(resultClassName)

        if(isCorrectAnswer){
            setCorrectAnswerCount(correctAnswerCount +1)
        }
        setIsCurrentQuestionAnswered(true)
    }
    return(
        <div className={S.container}>
            <div className={S.card}>
                <div className={S.quiz}>
                    <header className={S.quizHeader}>
                        <span className={S.questionCount}>Pergunta 1/3</span>
                        <p className={S.question}>{currentQuestion.question}</p>
                    </header>
                    <ul className={S.answers}>
                        {currentQuestion.answers.map((answer)=>(
                            <li key={answer} className={S.answerItem} >
                                <QuestionAnswer 
                                    answer={answer} 
                                    question={currentQuestion}
                                    handleAnswerQuestion={handleAnswerQuestion}
                                />
                            </li>

                        ))}
                        
                    </ul>
                </div>

            </div>
        </div>
    )
}