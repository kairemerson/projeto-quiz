import S from "./styles.module.css"
import {QuestionAnswer} from "../QuestionAnswer/index"
import { MouseEvent, useState } from "react"
import { Button } from "../Button"
import { Result } from "../Result"
import { ProgressBar } from "../ProgressBar"

export interface Question {
    id: number
    question: string
    answers: string[]
    correctAnswer: string
}

const QUESTIONS: Question[] =[
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
        correctAnswer: "Desenvolvedor"
    },
    {
        id:4,
        question: "Qual o nome da minha filha?",
        answers: ["Joao", "Ana", "Remerson"],
        correctAnswer: "Ana"
    }
]



export function Quiz (){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
    const [isTankingQuiz, setIsTankingQuiz] = useState(true)

    const currentQuestionNumber = currentQuestionIndex + 1
    const quizSize = QUESTIONS.length
    
    const handleAnswerQuestion = (event: MouseEvent<HTMLButtonElement>, question: Question, answer: string)=>{
        if(isCurrentQuestionAnswered){
            return
        }
        const isCorrectAnswer = question.correctAnswer === answer
        
        const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
        event.currentTarget.parentNode.classList.toggle(resultClassName)
        
        if(isCorrectAnswer){
            setCorrectAnswerCount(correctAnswerCount +1)
        }
        setIsCurrentQuestionAnswered(true)
    }

    const handleNextQuestion = ()=> {
        if (currentQuestionIndex + 1 < quizSize){
            setCurrentQuestionIndex(index => index + 1)
        }else{
            setIsTankingQuiz(false)
        }
        setIsCurrentQuestionAnswered(false)
    }

    const handleTryAgain = () => {
        setIsTankingQuiz(true)
        setCorrectAnswerCount(0)
        setCurrentQuestionIndex(0)
    }
    
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    const navigationButtonText = currentQuestionIndex + 1 === quizSize ? "Ver Resultado" : "Próxima Pergunta"
    
    return(
        <div className={S.container}>
            <div className={S.card}>
                {isTankingQuiz ? (
                    <div className={S.quiz}>
                        <ProgressBar size={quizSize} currentStep={currentQuestionNumber}/>
                    <header className={S.quizHeader}>
                        <span className={S.questionCount}>Pergunta {currentQuestionNumber}/{quizSize}</span>
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
                    {isCurrentQuestionAnswered && (
                        <Button onClick={handleNextQuestion}>
                            {navigationButtonText}
                        </Button>

                    )}
                </div>
                ) : (
                    <Result correctAnswerCount={correctAnswerCount} quizSize={quizSize} handleTryAgain={handleTryAgain}/>
                )}

            </div>
        </div>
    )
}