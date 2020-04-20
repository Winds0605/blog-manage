import React from 'react'
import Sider from 'components/sider/index'
import Header from 'components/header/index'
import { Route, Switch, Redirect } from 'react-router-dom'

import Index from 'pages/index/index'
import noMatch from 'pages/common/notPage'
// 文章
import ArticleList from 'pages/article/article-list/index'
import ArticleAdd from 'pages/article/article-add/index'
import ArticleComment from 'pages/article/article-comment/index'
// 电影
import MovieList from 'pages/movie/movie-list/index'
import MovieAdd from 'pages/movie/movie-add/index'
import MovieComment from 'pages/movie/movie-comment/index'
// 其他
import MovieTag from 'pages/tag/movie-tag/index'
import ArticleTag from 'pages/tag/article-tag/index'
import Message from 'pages/message/index'
import Photo from 'pages/photo/index'

import { HomeContainer, Container } from './style'
import { isLogin } from 'utils/util'


export default () => {

    if (!isLogin()) {
        return <Redirect to="/login" />
    }

    return (
        <>
            <Header />
            <Sider />
            <HomeContainer>
                <Container>
                    <Switch>
                        <Route exact path='/home' component={Index} />
                        <Route exact path='/home/article-list' component={ArticleList} />
                        <Route exact path='/home/article-add' component={ArticleAdd} />
                        <Route exact path='/home/article-add/:id' component={ArticleAdd} />
                        <Route exact path='/home/article-comment/:id' component={ArticleComment} />
                        <Route exact path='/home/movie-list' component={MovieList} />
                        <Route exact path='/home/movie-add' component={MovieAdd} />
                        <Route exact path='/home/movie-add/:id' component={MovieAdd} />
                        <Route exact path='/home/movie-comment/:id' component={MovieComment} />
                        <Route exact path='/home/movie-tag' component={MovieTag} />
                        <Route exact path='/home/article-tag' component={ArticleTag} />
                        <Route exact path='/home/message' component={Message} />
                        <Route exact path='/home/photo' component={Photo} />
                        <Route component={noMatch} />
                    </Switch>
                </Container>
            </HomeContainer>
        </>
    )
}
