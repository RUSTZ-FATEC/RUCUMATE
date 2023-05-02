import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SinginPage } from './presentation/singin/components/singin';
import { SingupPage } from './presentation/singup/components/singup';
import { HomePage } from './presentation/home/components/home';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SinginPage />} />
        <Route path="/cadastro" element={<SingupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}