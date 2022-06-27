import emptyImage from '../assets/images/empty-questions.svg'
import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined? : boolean
}

export function Button({isOutlined = false, ...props} : ButtonProps) {
   return(
       <button className={`button ${isOutlined ? 'outlined' : ''}`} 
       {...props} /> // distribuir todas as propriedades dentro deste props
   )
}

// Button - componentes dentro do React
// button - elementos dentro do prório HTML