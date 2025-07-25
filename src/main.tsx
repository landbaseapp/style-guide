import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

dayjs.extend(relativeTime);
dayjs.extend(utc);

(async () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
