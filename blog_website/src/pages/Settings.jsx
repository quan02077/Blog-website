import { useContext, useState } from 'react'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

function Settings() {
    const [state, dispatch] = useContext(Blog_context)
    const [fontSize, setFontSize] = useState(16)
    if (!state.btnSettings) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => dispatch(action.toggleSettingsAction(false))}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md p-6 animate-in slide-in-from-top-2 fade-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-4 my-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cài đặt</h3>
                </div>
                <div className='my-6'>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="fontSize" className="auth-label">Cỡ chữ</label>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{fontSize}px</span>
                    </div>
                    <input type="range" min="14" max="22" step="1"
                        value={fontSize} onChange={(e) => {
                            const newSize = Number(e.target.value)
                            setFontSize(newSize)
                            document.documentElement.style.fontSize = `${newSize}px`
                        }}
                        className='w-full bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer' />
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 mt-3">
                        <p className="text-gray-600 dark:text-gray-300 transition-all duration-150" style={{ fontSize: `${fontSize}px` }}>
                            Trải nghiệm đọc sẽ thay đổi tùy theo cỡ chữ bạn chọn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings