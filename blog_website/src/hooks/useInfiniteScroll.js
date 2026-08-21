import { useEffect, useRef } from 'react'

export default function useInfiniteScroll(onLoadMore, hasMore, { threshold = 0.5, rootMargin = '100px' } = {}) {
    const observerRef = useRef(null)
    const callbackRef = useRef(onLoadMore)

    useEffect(() => {
        callbackRef.current = onLoadMore
    }, [onLoadMore])

    useEffect(() => {
        if (!hasMore) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callbackRef.current()
            }
        }, { threshold, rootMargin })

        const currentTarget = observerRef.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
            observer.disconnect()
        }
    }, [hasMore, rootMargin, threshold])

    return observerRef
}
