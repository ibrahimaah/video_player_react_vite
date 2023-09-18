import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import VideoPlayer from './components/VideoPlayer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoPlayer/>
  </React.StrictMode>,
)
