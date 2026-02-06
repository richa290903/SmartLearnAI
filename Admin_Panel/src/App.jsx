import './App.css'
import Dashboard from './components/DashBoard'
import Student from './components/Student'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  )
}

export default App
