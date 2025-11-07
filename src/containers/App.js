import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameScopa from './Game/Scopa';
import GameWist from './Game/Wist';
import SignUp from './SignUp';
import * as routes from '../constants/routes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<GameScopa />} />
        <Route path={routes.SCOPA} element={<GameScopa />} />
        <Route path={routes.WIST} element={<GameWist />} />
        <Route path={routes.LOGIN} element={<SignUp />} />
      </Routes>
    </Router>
  );
}
