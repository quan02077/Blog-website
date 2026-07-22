import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Provider from './context/Provider'
import AuthForm from './pages/AuthForm'
import Info from './pages/Info'
import Notifications from './pages/Notifications'
import MyBlogs from './pages/MyBlogs'
import Bookmarks from './pages/Bookmarks'
import Settings from './pages/Settings'

function App() {
  return (
    <Provider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-slate-200 flex flex-col font-['Josefin_Sans']">
        <Header />
        <Content />
        <AuthForm />
        <Info />
        <Notifications />
        <MyBlogs />
        <Bookmarks />
        <Settings />
      </div>
    </Provider>
  )
}

export default App
