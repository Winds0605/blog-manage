import React from 'react';
import Sider from './components/sider/index'
import Header from './components/header/index'

import Home from './pages/home/index'

import ArticleList from './pages/article/article-list/index'
import ArticleAdd from './pages/article/article-add/index'
import ArticleComment from './pages/article/article-comment/index'

import MovieList from './pages/movie/movie-list/index'
import MovieAdd from './pages/movie/movie-add/index'
import MovieComment from './pages/movie/movie-comment/index'

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
          {/* 文章路由 */}
          <Route path='/article-list' component={ArticleList}></Route>
          <Route path='/article-add' exact component={ArticleAdd}></Route>
          <Route path='/article-add/:id' exact component={ArticleAdd}></Route>
          <Route path='/article-comment/:id' exact component={ArticleComment}></Route>
          {/* 电影路由 */}
          <Route path='/movie-list' exact component={MovieList}></Route>
          <Route path='/movie-add' exact component={MovieAdd}></Route>
          <Route path='/movie-add/:id' exact component={MovieAdd}></Route>
          <Route path='/movie-comment/:id' exact component={MovieComment}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
