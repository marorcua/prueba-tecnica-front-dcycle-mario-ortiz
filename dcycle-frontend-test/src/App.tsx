import './App.css';
import { UserInfoForm } from './pages/UserInfoForm';
import CovidDashboard from './pages/CovidDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-600 p-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-info" element={<UserInfoForm />} />
          <Route path="/covid-dashboard" element={<CovidDashboard />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
