import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Provider from './context/Provider'
function App() {
  return (
    <Provider>
      <div className="min-h-screen bg-[#ebf1f6] dark:bg-[#0f1117] text-gray-900 dark:text-slate-200 flex flex-col font-['Josefin_Sans']">
        <Header />
        <Content />
      </div>
    </Provider>
  )
}

export default App
