import { Button } from "../Button";
import S from "./styles.module.css"

interface ResultProps {
    correctAnswerCount: number
    quizSize: number
    handleTryAgain: ()=> void
}

export function Result (props: ResultProps){
    return(
        <div className={S.container}>
            <h1 className={S.title}>Resultado</h1>
            <h2 className={S.subtitle}>Você acertou {props.correctAnswerCount} de {props.quizSize} perguntas!</h2>
            <Button onClick={props.handleTryAgain}>Tente Novamente</Button>
        </div>
    )
}