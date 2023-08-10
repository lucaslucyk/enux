import './styles/App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup'
import Login from './containers/auth/Login'
import Activate from './containers/auth/Activate'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='*' element={<Error404/>}></Route>
          <Route exact path='/' element={<Home/>}></Route>

          {/** auth */}
          <Route exact path='/register' element={<Signup/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/activate/:uid/:token' element={<Activate/>}></Route>

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
