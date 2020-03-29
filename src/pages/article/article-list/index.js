import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { get, post } from 'utils/http'
import { MyIcon, formatDate } from 'utils/util'
import { altImg } from 'utils/config'
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

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [total, setTatol] = useState(0)
    const [nowTag, setNowTag] = useState('All')
    const [tags, setTags] = useState([])

    let history = useHistory()

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
            setArticles(articles.data.data)
            setTatol(articles.data.total)
            setTags(['All', ...tags.data.data[0].tags])
        } catch (error) {
            throw error
        }
    }

    // 删除按钮点击事件
    const handleDelete = async (id, index) => {
        try {
            const articleDeleteResult = await post('/articles/delete', {
                articleId: id
            })
            const commentDeleteResult = await post('/comments/deleteByArticleId', {
                articleId: id
            })
            if (articleDeleteResult.data.code !== 200 || commentDeleteResult.data.code !== 200) {
                message.error('删除失败')
            } else {
                message.success('删除成功')
                setArticles(articles.slice(0, index).concat(articles.slice(index + 1)))
                setTatol(total - 1)
            }
        } catch (error) {
            throw error
        }
    }

    // 编辑按钮点击事件
    const handleEdit = async (id) => {
        history.push(`/article-add/${id}`)
    }

    // 查看评论
    const toCommentView = (id) => {
        history.push(`/article-comment/${id}`)
    }

    // 文章图片显示错误时使用其他图片代替
    const setAltImg = (e) => {
        e.target.src = altImg
    }


    // 加载更多数据
    const onLoadMore = async () => {
        try {
            setLoading(true)
            const result = await post('/articles/findByPage', {
                page: page + 1,
                tag: nowTag
            })
            if (result.data.code === 200) {
                setLoading(false)
                setArticles(articles.concat(result.data.data))
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
        !initLoading && !loading && articles.length !== total ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    marginBottom: 20,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore} className="load-more">加载更多文章</Button>
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
                            dataSource={articles}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <Button onClick={handleEdit.bind(this, item.articleId)}>编辑</Button>,
                                        <Button onClick={handleDelete.bind(this, item.articleId, index)}>删除</Button>,
                                        <Button onClick={toCommentView.bind(this, item.articleId)}>查看评论</Button>
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            height={200}
                                            alt="logo"
                                            src={item.banner}
                                            onError={setAltImg}
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
