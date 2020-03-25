import React, { useState, useEffect } from 'react'
import { get, post } from 'utils/http'
import { MyIcon, formatDate } from 'utils/util'
import { ListContainer, StatusContainer, Title } from './style'
import { List, Tag, Button, Tabs, message, BackTop, Skeleton } from 'antd';
const { TabPane } = Tabs;


const Status = ({ date, views, tag }) => {
    return (
        <StatusContainer>
            <span className="time"><MyIcon type="icon-time" />{formatDate(date, 'yyyy-MM-dd hh:mm:ss')}</span>
            <span className="views">阅读数：{views}</span>
            <Tag className="tag">{tag}</Tag>
        </StatusContainer>
    )
}



export default () => {

    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTatol] = useState(0)
    const [nowTag, setNowTag] = useState('All')
    const [tags, setTags] = useState([])

    const loadData = async (tag) => {
        try {
            setInitLoading(true)
            const articles = await post('/articles/findByPage', {
                page: 1,
                tag: tag || 'All'
            })
            const tags = await get('/tags/findAll')
            setInitLoading(false)
            setPage(1)
            setMovie(articles.data.data)
            setTatol(articles.data.total)
            setTags(['All', ...tags.data.data[0].tags])
        } catch (error) {
            throw error
        }
    }


    // 加载更多数据
    const onLoadMore = async () => {
        try {
            setLoading(true)
            const articles = await post('/articles/findByPage', {
                page: page + 1,
                tag: nowTag
            })
            if (articles.data.code === 200) {
                setLoading(false)
                setMovie(movie.concat(articles.data.data))
            } else {
                message.error('载入数据失败')
            }
        } catch (error) {
            throw error
        }
        setPage(page + 1)
    }

    // tab标签切换
    const handleTabsSwitch = (value) => {
        const tag = tags[value]
        loadData(tag)
        setNowTag(tag)
    }

    // 载入更多按钮
    const loadMore =
        !initLoading && !loading && movie.length !== total ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    marginBottom: 20,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore} className="load-more">loading more</Button>
            </div>
        ) : null;


    useEffect(() => {
        loadData()
    }, [])

    return (
        <ListContainer>
            <Tabs defaultActiveKey="1" tabPosition={'top'} onChange={handleTabsSwitch} animated={false}>
                {tags.map((value, index) => (
                    <TabPane tab={value} key={index}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            loading={initLoading}
                            loadMore={loadMore}
                            dataSource={movie}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <Button>Default</Button>,
                                        <Button>Default</Button>,
                                        <Button>Default</Button>
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            height={200}
                                            alt="logo"
                                            src={item.banner}
                                        />
                                    }
                                >
                                    <Skeleton avatar title={false} loading={loading} active>
                                        <List.Item.Meta
                                            title={<Title>{item.title}</Title>}
                                            description={<Status date={item.modifyOn} views={item.views} tag={item.tag} />}
                                        />
                                        {item.desc}
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </TabPane>
                ))}
            </Tabs>
            <BackTop />
        </ListContainer>
    )
}

