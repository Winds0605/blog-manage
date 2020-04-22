import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { get, post } from 'utils/http'
import { getPageStartAndEnd, movieAarryFormat } from 'utils/util'
import { altImg } from 'utils/config'
import { ListContainer, StatusContainer, Title, StatusItem } from './style'
import { List, Rate, Button, Tabs, message, BackTop, Pagination } from 'antd';
import { TAmovieTagsfindAll } from 'route/tags'
import { MOfindAll, MOdelete } from 'route/movie'
import { MCdeleteByMovieId } from 'route/movieComments'

const { TabPane } = Tabs;


const Status = ({ name, country, type, director, rate, introduction }) => {
    return (
        <StatusContainer>
            <div className="other">
                <StatusItem>
                    <b>评分：</b><Rate disabled allowHalf defaultValue={rate} />
                </StatusItem>
                <StatusItem>
                    <b>导演：</b><span>{director}</span>
                </StatusItem>
                <StatusItem>
                    <b>地区：</b><span>{movieAarryFormat(country)}</span>
                </StatusItem>
                <StatusItem>
                    <b>类型：</b><span>{movieAarryFormat(type)}</span>
                </StatusItem>
            </div>
            <div className="desc">
                <StatusItem>
                    <b>简介：</b>
                    <span style={{ display: "block" }}>{introduction}</span>
                </StatusItem>
            </div>
        </StatusContainer>
    )
}



export default () => {
    const [movie, setMovie] = useState([])
    const [currentTabsMovie, setCurrentTabsMovie] = useState([])
    const [displayMovie, setDisplayMovie] = useState([])

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [tags, setTags] = useState([])

    const INIT_PAGE_SIZE = 10;

    let history = useHistory()

    const loadData = async () => {
        let movies, tags
        try {
            movies = await get(MOfindAll)
            tags = await get(TAmovieTagsfindAll)
        } catch (error) {
            throw error
        }

        if (movies.data.code !== 200 || tags.data.code !== 200) {
            message.error('载入数据失败')
        }
        setTotal(movies.data.total)
        setMovie(movies.data.data)
        setCurrentTabsMovie(movies.data.data)
        setDisplayMovie(movies.data.data.slice(0, INIT_PAGE_SIZE))

        tags = tags.data.data.map(value => {
            return value.type
        })
        setTags(['全部', ...tags])
    }

    // 删除按钮点击事件
    const handleDelete = async (id, index) => {
        console.log(id)
        let movieDeleteResult, commentDeleteResult
        try {
            movieDeleteResult = await post(MOdelete, {
                movieId: id
            })
            commentDeleteResult = await post(MCdeleteByMovieId, {
                movieId: id
            })
        } catch (error) {
            throw error
        }
        if (movieDeleteResult.data.code !== 200 || commentDeleteResult.data.code !== 200) {
            message.error('删除失败')
        } else {
            message.success('删除成功')
            setDisplayMovie(displayMovie.slice(0, index).concat(displayMovie.slice(index + 1)))
            setTotal(total - 1)
        }
    }

    // 编辑按钮点击事件
    const handleEdit = async (id) => {
        history.push(`/home/movie-add/${id}`)
    }

    // 查看评论
    const toCommentView = (id) => {
        history.push(`/home/movie-comment/${id}`)
    }

    // 文章图片显示错误时使用其他图片代替
    const setAltImg = (e) => {
        e.target.src = altImg
    }

    // tab标签切换
    const handleTabsSwitch = (value) => {
        const { start, end } = getPageStartAndEnd(page, pageSize)

        if (value === '全部') {
            setTotal(movie.length)
            setCurrentTabsMovie(movie)
            setDisplayMovie(movie.slice(start, end))
            return
        }
        const display = movie.filter((item) => item.type.includes(value))
        setTotal(display.length)
        setCurrentTabsMovie(display)
        setDisplayMovie(display.slice(start, end))
    }

    const showTotal = total => {
        return `Total ${total} items`;
    }

    const onPageChange = (page, pageSize) => {
        setPage(page)
        const { start, end } = getPageStartAndEnd(page, pageSize)
        setDisplayMovie(currentTabsMovie.slice(start, end))
    }

    const onShowSizeChange = (current, size) => {
        setPageSize(size)
        const { start, end } = getPageStartAndEnd(current, size)
        setDisplayMovie(currentTabsMovie.slice(start, end))
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <ListContainer>
            <Tabs defaultActiveKey="1" tabPosition={'top'} onChange={handleTabsSwitch} animated={false}>
                {tags.map((value, index) => (
                    <TabPane tab={value} key={value}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={displayMovie}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <Button onClick={handleEdit.bind(this, item.movieId)}>编辑</Button>,
                                        <Button onClick={handleDelete.bind(this, item.movieId, index)}>删除</Button>,
                                        <Button onClick={toCommentView.bind(this, item.movieId)}>查看评论</Button>
                                    ]}
                                    extra={
                                        <img
                                            width={220}
                                            height={280}
                                            alt="logo"
                                            src={item.image}
                                            onError={setAltImg}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        title={<Title>{item.name}</Title>}
                                    />
                                    <Status country={item.country} type={item.type} director={item.director} rate={item.rate} introduction={item.introduction}></Status>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                ))}
            </Tabs>
            {
                displayMovie.length > 0 ? <Pagination
                    size="small"
                    showSizeChanger
                    showQuickJumper
                    total={total}
                    pageSizeOptions={['5', '10', '15', '20']}
                    showTotal={showTotal}
                    onShowSizeChange={onShowSizeChange}
                    onChange={onPageChange}
                /> : null
            }
            <BackTop />
        </ListContainer>
    )
}
