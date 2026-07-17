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
            <div className='grid grid-cols-2 bg-light-bg dark:bg-dark-bg rounded-lg p-8 shadow-xl w-full max-w-md mx-auto relative'>
                <button
                    onClick={() => dispatch(action.btnSignInUpAction(false))}
                    className='absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className='flex items-center gap-4 text-center mb-4'>
                    <div>
                        <button
                            onClick={() => dispatch(action.btnSignInUpAction(true))}
                            className='flex-1 py-3 border-b-2 font-semibold transition-colors'
                        >
                            Đăng nhập
                        </button>
                        <button
                            onClick={() => dispatch(action.btnSignInUpAction(false))}
                            className='flex-1 py-3 border-b-2 font-semibold transition-colors'
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignIn_Up