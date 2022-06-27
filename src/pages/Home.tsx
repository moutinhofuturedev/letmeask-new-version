import toast from 'react-hot-toast'
import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleImg from '../assets/images/google-icon.svg'

import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { database } from '../services/firebase'

export function Home() {
    const history = useHistory() //toda função que começa com 'use' é um hook e sempre deve estar dentro do contexto da função
    const { user, signInWithGoogle } = useAuth()
    const [ roomCode, setRoomCode ] = useState('')

    async function handleCreateRoom() { // função que faz a navegação de páginas ao clicar no button Google
        if (!user) {
            await signInWithGoogle()
        }
       
        history.push('/rooms/new') // rota para página new room
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get() 
        if(!roomRef.exists()) { // se a sala não existir retorna o erro
            toast.error('Sala não encontrada!')
            return
        }else{
            toast('É  bom ter você de volta!', {icon: '😀',});
        }

        history.push(`rooms/${roomCode}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="Ilustração da página de perguntas e respostas" title="Ilustração da página de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={LogoImg} alt="Logo Letmeask" title='Logo Letmeask' />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={GoogleImg} alt="Logo do Goolge" title="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder='Digite o código da sala'
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}