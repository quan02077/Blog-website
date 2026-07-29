import { useEffect } from 'react'

/**
 * Custom Hook xử lý đồng bộ cả 2 nút Quay lại (Back ←) và Tiến tới (Forward →) của trình duyệt cho Modal/Popup.
 * - Bấm Back (←): Tự động đóng Modal
 * - Bấm Forward (→): Tự động mở lại Modal
 */
export default function useModalBackHandler(isOpen, onClose, onOpen) {
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.modalOpen) {
                if (onOpen) onOpen()
            } else {
                if (onClose) onClose()
            }
        }

        window.addEventListener('popstate', handlePopState)
        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [onClose, onOpen])

    useEffect(() => {
        if (isOpen) {
            if (!window.history.state || !window.history.state.modalOpen) {
                window.history.pushState({ modalOpen: true }, '')
            }
        }
    }, [isOpen])
}
