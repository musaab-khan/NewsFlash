import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import React, { useState } from 'react';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API //loading apiKey from enviromental variables .env.local file so it isn't exposed
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={9} country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={9} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={9} country="us" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={9} country="us" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={9} country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={9} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={9} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={9} country="us" category="technology" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

