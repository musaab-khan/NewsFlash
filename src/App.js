import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react'

export class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API //loading apiKey from enviromental variables .env.local file so it isn't exposed
  state = {
    porgress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar color="#f11946" progress={this.state.progress}/>
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={9} country="us" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={9} country="us" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={9} country="us" category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={9} country="us" category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={9} country="us" category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={9} country="us" category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={9} country="us" category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={9} country="us" category="technology"/>} />
        </Routes>
      </BrowserRouter>
      </div>
    )
  }
}

export default App

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <NavBar/>
//         <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
//         <Routes>
//           <Route exact path="/" element={<News key='general' pageSize={9} country="us" category="general"/>} />
//           <Route exact path="/business" element={<News key='business' pageSize={9} country="us" category="business"/>} />
//           <Route exact path="/entertainment" element={<News key='entertainment' pageSize={9} country="us" category="entertainment"/>} />
//           <Route exact path="/general" element={<News  key='general' pageSize={9} country="us" category="general"/>} />
//           <Route exact path="/health" element={<News key='health' pageSize={9} country="us" category="health"/>} />
//           <Route exact path="/science" element={<News key='science' pageSize={9} country="us" category="science"/>} />
//           <Route exact path="/sports" element={<News key='sports' pageSize={9} country="us" category="sports"/>} />
//           <Route exact path="/technology" element={<News  key='technology' pageSize={9} country="us" category="technology"/>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
