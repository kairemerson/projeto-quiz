import { Button } from "../Button";
import S from "./styles.module.css"

export function Result (props){
    return(
        <div className={S.container}>
            <h1 className={S.title}>Resultado</h1>
            <h2 className={S.subtitle}>Você acertou {props.correctAnswerCount} de {props.quizSize} perguntas!</h2>
            <Button onClick={props.handleTryAgain}>Tente Novamente</Button>
        </div>
    )
}