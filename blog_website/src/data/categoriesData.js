import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJs, faCss3Alt, faNodeJs } from '@fortawesome/free-brands-svg-icons'

export const featuredCategories = [
    {
        id: 1,
        name: "React",
        icon: faReact,
        posts: 24,
        description: "Component-based UI, hooks, state management và React ecosystem.",
        color: "from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-600",
        badge: "Phổ biến nhất",
        badgeColor: "bg-blue-500 dark:bg-blue-600",
    },
    {
        id: 2,
        name: "JavaScript",
        icon: faJs,
        posts: 38,
        description: "ES6+, async/await, DOM manipulation và các pattern hiện đại.",
        color: "from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600",
        badge: "Nhiều bài nhất",
        badgeColor: "bg-yellow-500 dark:bg-yellow-600",
    },
]

export const popularCategories = [
    {
        id: 1,
        name: "CSS",
        icon: faCss3Alt,
        posts: 17,
        description: "Flexbox, Grid, animations và Tailwind CSS.",
        color: "bg-pink-50 dark:bg-dark-surface border-pink-100 dark:border-pink-900/50",
        iconColor: "text-pink-500 dark:text-pink-400",
        badgeColor: "bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300"
    },
    {
        id: 2,
        name: "Node.js",
        icon: faNodeJs,
        posts: 12,
        description: "Backend, REST API, Express và npm ecosystem.",
        color: "bg-green-50 dark:bg-dark-surface border-green-100 dark:border-green-900/50",
        iconColor: "text-green-600 dark:text-green-400",
        badgeColor: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
    },
    {
        id: 3,
        name: "TypeScript",
        icon: faJs,
        posts: 9,
        description: "Type system, Generics, interfaces và best practices.",
        color: "bg-purple-50 dark:bg-dark-surface border-purple-100 dark:border-purple-900/50",
        iconColor: "text-purple-500 dark:text-purple-400",
        badgeColor: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
    },
    {
        id: 4,
        name: "Next.js",
        icon: faReact,
        posts: 8,
        description: "App router, Server Components, SSR và deployment.",
        color: "bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-700",
        iconColor: "text-gray-700 dark:text-gray-300",
        badgeColor: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
    },
    {
        id: 5,
        name: "Git",
        icon: faLayerGroup,
        posts: 6,
        description: "Version control, branching, merge và GitHub workflow.",
        color: "bg-orange-50 dark:bg-dark-surface border-orange-100 dark:border-orange-900/50",
        iconColor: "text-orange-500 dark:text-orange-400",
        badgeColor: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300"
    },
    {
        id: 6,
        name: "DevOps",
        icon: faLayerGroup,
        posts: 5,
        description: "Docker, CI/CD, Nginx và cloud deployment.",
        color: "bg-indigo-50 dark:bg-dark-surface border-indigo-100 dark:border-indigo-900/50",
        iconColor: "text-indigo-500 dark:text-indigo-400",
        badgeColor: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
    },
]
