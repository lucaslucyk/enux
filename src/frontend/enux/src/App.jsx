import './styles/App.css'
import { Provider } from 'react-redux'
import store from './store'

function App() {

  return (
    <Provider store={store}>
      <div className="text-blue-600">
        <h1 className="text-3xl font-bold">Vite + React</h1>
      </div>
    </Provider>
  )
}

export default App
