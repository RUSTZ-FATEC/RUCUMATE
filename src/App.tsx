import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SigninPage } from './presentation/signin/components/signup';
import { SignupPage } from './presentation/signup/components/signup';
import { MoisturePage } from './presentation/moisture/components/moisture';
import { TemperaturePage } from './presentation/temperature/components/temperature';
import { NotificationPage } from './presentation/notification/components/notification';
import { ProfilePage } from './presentation/profile/components/profile';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route path="/umidade" element={<MoisturePage />} />
        <Route path="/temperatura" element={<TemperaturePage />} />
        <Route path="/notificacao" element={<NotificationPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}