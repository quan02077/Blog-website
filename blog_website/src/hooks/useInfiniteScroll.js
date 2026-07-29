// src/hooks/useInfiniteScroll.js
import { useEffect, useRef } from 'react'

export default function useInfiniteScroll(onLoadMore, hasMore) {
    const observerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Khi phần tử ở đáy màn hình xuất hiện & vẫn còn bài để load
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore()
                }
            },
            { threshold: 1.0 }
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [onLoadMore, hasMore])

    return observerRef
}
