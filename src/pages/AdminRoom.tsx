import toast from 'react-hot-toast'
import LogoImage from '../assets/images/logo.svg'
import deleteImage from '../assets/images/delete.svg'
import checkImage from '../assets/images/check.svg'
import answerImage from '../assets/images/answer.svg'
import emptyImg from '../assets/images/empty-questions.svg'
import '../styles/room.scss'

import { useHistory, useParams } from 'react-router-dom'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
// import { user } from '../hooks/useAuth'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

type RoomParams = {
    id: string
}

export function AdminRoom() {
    // const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id

    const { title, questions } = useRoom(roomId)

    const history = useHistory()

    async function handleEndRoom() { // função para excluir sala
        if(window.confirm('Tem certeza que deseja excluir está sala?')) {
            await database.ref(`rooms/${roomId}`).remove() // exclui sala
            toast.success('Sala excluída!') // mensagem de confirmação de sala excluída

            history.push('/') // retorna à Home
        }else{
            database.ref(`rooms/${roomId}`) // continuar na sala
        }
    }

    async function handleDeleteQuestion(questionId: string) { //função para excluir pergunta
        if(window.confirm('Tem certeza que deseja excluir está pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
            toast.success('Mensagem excluida!')
        }
    }

    async function handleCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightedQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    function backHome() { // esta função faz retornar a página Home quando clica na imagem da Logo sem excluir a sala
        history.push('/')
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImage} alt="Letmeask" title="Voltar a Home" onClick={backHome} />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>
                
                {questions.length > 0 ? (
                                 <div className="question-list">
                                    {questions.map(question => {
                                        return (
                                            <Question
                                                key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                                {!question.isAnswered && (
                                                    <> {/* fraguimento que funciona como container e não atrapalha o css */}
                                                        <button type="button" onClick={() => handleCheckQuestionAnswered(question.id)}>
                                                            <img src={checkImage} alt="Marcar pergunta como respondida" title='Check na pergunta' />
                                                        </button>
                                                        <Button type="button" onClick={() => handleHighlightedQuestion(question.id)}>
                                                            <img src={answerImage} alt="Destacar a pergunta" title="Destacar a pergunta" />
                                                        </Button>
                                                    </>
                                                )}
                                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                                    <img src={deleteImage} alt="Deletar a pergunta" title='Deletar a pergunta' />
                                                </button>
                                            </Question>
                                        )
                                    })}
                                </div>
                ) : (
                    <div className="empty-question">
                        <img src={emptyImg} alt="Imagem simbolizando sem perguntas" />
                        <h2>Nenhuma pergunta por aqui...</h2>
                        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
                    </div>
                )
            }
            </main>
        </div>
    )
}
