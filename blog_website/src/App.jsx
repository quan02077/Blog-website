import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Provider from './context/Provider'
import SignIn_Up from './pages/SignIn_Up'

function App() {
  return (
    <Provider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-slate-200 flex flex-col font-['Josefin_Sans']">
        <Header />
        <Content />
        <SignIn_Up />
      </div>
    </Provider>
  )
}

export default App
