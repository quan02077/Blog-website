import { useContext, useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArchive, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ArchiveMonthCard from '../components/ArchiveMonthCard'
import Blog_context from '../context/Blog_Context'
import { getAllPost } from '../api/post'

function Archives() {
    const [state] = useContext(Blog_context)
    const { posts } = state
    const [selectedYear, setSelectedYear] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [archivedPosts, setArchivedPosts] = useState([])
    const [archiveLoading, setArchiveLoading] = useState(false)

    const navigate = useNavigate()

    const handleGoDetail = (id) => {
        navigate(`/post/${id}`)
    }

    // Tự động tải lại bài viết khi có tìm kiếm hoặc đổi bộ lọc năm
    useEffect(() => {
        const fetchArchived = async () => {
            setArchiveLoading(true);
            try {
                const y = selectedYear === 'all' ? '' : selectedYear;
                const data = await getAllPost(searchTerm, y);
                setArchivedPosts(data);
            } catch (error) {
                console.error("Lỗi khi tải lưu trữ bài viết:", error);
            } finally {
                setArchiveLoading(false);
            }
        };
        fetchArchived();
    }, [searchTerm, selectedYear]);

    // Tạo danh sách các năm không trùng lặp từ danh sách bài viết gốc
    const uniqueYears = useMemo(() => {
        const years = posts.map(post => {
            const dateVal = post.date || post.createdAt
            if (!dateVal) return null
            const parts = String(dateVal).split('/')
            if (parts.length === 3) {
                return parseInt(parts[2], 10)
            }
            const d = new Date(dateVal)
            return !isNaN(d.getTime()) ? d.getFullYear() : null
        }).filter(y => y !== null)
        return [...new Set(years)].sort((a, b) => b - a)
    }, [posts])

    // 🔄 Nhóm bài viết theo NĂM và THÁNG động từ danh sách bài viết đã lọc từ API
    const archiveData = useMemo(() => Object.values(
        archivedPosts.reduce((acc, post) => {
            let year = new Date().getFullYear()
            let monthName = `Tháng ${new Date().getMonth() + 1}`

            const dateVal = post.date || post.createdAt
            if (dateVal) {
                const parts = String(dateVal).split('/')
                if (parts.length === 3) {
                    monthName = `Tháng ${parseInt(parts[1], 10)}`
                    year = parseInt(parts[2], 10)
                } else {
                    const d = new Date(dateVal)
                    if (!isNaN(d.getTime())) {
                        year = d.getFullYear()
                        monthName = `Tháng ${d.getMonth() + 1}`
                    }
                }
            }

            if (!acc[year]) {
                acc[year] = { year, monthsMap: {} }
            }

            if (!acc[year].monthsMap[monthName]) {
                acc[year].monthsMap[monthName] = { month: monthName, posts: [] }
            }

            acc[year].monthsMap[monthName].posts.push(post)

            return acc
        }, {}),
    ).map((yearBlock) => ({
        year: yearBlock.year,
        months: Object.values(yearBlock.monthsMap)
    })).sort((a, b) => b.year - a.year), [archivedPosts])

    // 📊 Thống kê động
    const totalPosts = posts.length
    const yearsCount = archiveData.length || 1
    const categoriesCount = new Set(posts.map(p => p.category)).size || 1
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0)

    const dynamicStats = [
        { label: "Tổng bài viết", value: totalPosts },
        { label: "Năm viết", value: yearsCount },
        { label: "Chuyên mục", value: categoriesCount },
        { label: "Lượt thích", value: totalLikes },
    ]

    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* Page Header */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faArchive} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none mb-0.5">Lưu trữ</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toàn bộ bài viết được sắp xếp theo thời gian</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dynamicStats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-center hover:shadow-md transition-shadow">
                        <p className="text-2xl font-black text-blue-500 dark:text-blue-400 mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-48">
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400 text-sm" />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-dark-bg text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl outline-none placeholder-gray-300 dark:placeholder-gray-600"
                    />
                </div>
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 pr-8 outline-none bg-white dark:bg-dark-bg cursor-pointer"
                    >
                        <option value="all">Tất cả năm</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-3 text-gray-400 text-xs pointer-events-none" />
                </div>
            </div>

            {/* Timeline */}
            {archiveLoading ? (
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 text-center text-gray-500">
                    Đang tải dữ liệu lưu trữ...
                </div>
            ) : archiveData.length === 0 ? (
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-8 text-center text-gray-500">
                    Chưa có bài viết nào trong lưu trữ.
                </div>
            ) : (
                archiveData.map((yearBlock) => (
                    <div key={yearBlock.year} className="flex flex-col gap-4">
                        {/* Year Heading */}
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-gray-900 dark:text-white">{yearBlock.year}</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                        </div>

                        {yearBlock.months.map((monthBlock) => (
                            <ArchiveMonthCard key={monthBlock.month} monthBlock={monthBlock} handleGoDetail={handleGoDetail} />
                        ))}
                    </div>
                ))
            )}

        </div>
    )
}

export default Archives
