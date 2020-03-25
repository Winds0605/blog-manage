import React from 'react';
import Sider from './components/sider/index'
import Header from './components/header/index'

import Home from './pages/home/index'

import ArticleList from './pages/article/article-list/index'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import './App.css';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sider />
        <div className="main">
          <Redirect path="/" to="/home" />
          <Route path='/home' exact component={Home}></Route>
          <Route path='/article-list' exact component={ArticleList}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
