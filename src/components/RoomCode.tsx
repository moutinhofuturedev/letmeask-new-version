import toast from 'react-hot-toast'
import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'

type Props = {
    code: string
}

export function RoomCode({ code }: Props) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)

        toast.success('Código copiado')
    }
     
    return(
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" title='Copie o código' onClick={copyRoomCodeToClipboard}/>
            </div>
            <span>Sala {code}</span>
        </button>
    )
}
