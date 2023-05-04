import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SinginPage } from './presentation/signin/components/signin';
import { SignUpPage } from './presentation/signup/components/signup';
import { HomePage } from './presentation/home/components/home';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SinginPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}