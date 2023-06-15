import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SigninPage } from './presentation/signin/components/signin';
import { SignupPage } from './presentation/signup/components/signup';
import { MoisturePage } from './presentation/home/components/moisture';
import { TemperaturePage } from './presentation/home/components/temperature';
import { NotificationPage } from './presentation/notification/components/notification';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/umidade" element={<MoisturePage />} />
        <Route path="/temperatura" element={<TemperaturePage />} />
        <Route path="/notificacao" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}