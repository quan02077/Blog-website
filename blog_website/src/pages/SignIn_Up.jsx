import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faCheckCircle, faBlog, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

function SignIn_Up() {
    const [state, dispatch] = useContext(Blog_context)
    if (!state.btnSignInUp) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => dispatch(action.btnSignInUpAction(false))}>
            <div>

            </div>
        </div>
    )
}

export default SignIn_Up