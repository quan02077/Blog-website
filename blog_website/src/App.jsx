import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Provider from './context/Provider'
function App() {
  return (
    <Provider>
      <Header />
      <Content />
    </Provider>
  )
}

export default App
