import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { get, post } from 'utils/http'
import { MyIcon, formatDate, getPageStartAndEnd } from 'utils/util'
import { altImg } from 'utils/config'
import { ListContainer, StatusContainer, Title } from './style'
import { List, Tag, Button, Tabs, message, BackTop, Pagination } from 'antd';
import { TAarticleTagsfindAll } from 'route/tags'
import { ARfindAll, ARdelete } from 'route/article'
import { ACdeleteByArticleId } from 'route/articleComments'

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
    const [currentTabsArticles, setCurrentTabsArticles] = useState([])
    const [displayArticles, setDisplayArticles] = useState([])

    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [tags, setTags] = useState([])

    const INIT_PAGE_SIZE = 10;

    let history = useHistory()

    const loadData = async () => {
        let articles, tags
        try {
            articles = await get(ARfindAll)
            tags = await get(TAarticleTagsfindAll)
        } catch (error) {
            throw error
        }

        if (articles.data.code !== 200 || tags.data.code !== 200) {
            message.error('载入数据失败')
        }
        setTotal(articles.data.total)
        setArticles(articles.data.data)
        setCurrentTabsArticles(articles.data.data)
        setDisplayArticles(articles.data.data.slice(0, INIT_PAGE_SIZE))

        tags = tags.data.data.map(value => {
            return value.type
        })
        setTags(['全部', ...tags])
    }

    // 删除按钮点击事件
    const handleDelete = async (id, index) => {
        try {
            const articleDeleteResult = await post(ARdelete, {
                articleId: id
            })
            const commentDeleteResult = await post(ACdeleteByArticleId, {
                articleId: id
            })
            if (articleDeleteResult.data.code !== 200 || commentDeleteResult.data.code !== 200) {
                message.error('删除失败')
            } else {
                message.success('删除成功')
                setDisplayArticles(displayArticles.slice(0, index).concat(displayArticles.slice(index + 1)))
                setTotal(total - 1)
            }
        } catch (error) {
            message.error('发生错误')
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

    // tab标签切换
    const handleTabsSwitch = (value) => {
        const { start, end } = getPageStartAndEnd(page, pageSize)

        if (value === '全部') {
            setTotal(articles.length)
            setCurrentTabsArticles(articles)
            setDisplayArticles(articles.slice(start, end))
            return
        }
        const display = articles.filter((item) => item.tag === value)
        setTotal(display.length)
        setCurrentTabsArticles(display)
        setDisplayArticles(display.slice(start, end))
    }

    const showTotal = total => {
        return `Total ${total} items`;
    }

    const onPageChange = (page, pageSize) => {
        setPage(page)
        const { start, end } = getPageStartAndEnd(page, pageSize)
        setDisplayArticles(currentTabsArticles.slice(start, end))
    }

    const onShowSizeChange = (current, size) => {
        setPageSize(size)
        const { start, end } = getPageStartAndEnd(current, size)
        setDisplayArticles(currentTabsArticles.slice(start, end))
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
                            dataSource={displayArticles}
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
                                    <List.Item.Meta
                                        title={<Title>{item.title}</Title>}
                                        description={<Status date={item.modifyOn} views={item.views} tag={item.tag} />}
                                    />
                                    {item.desc}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                ))}
            </Tabs>
            {
                displayArticles.length > 0 ? <Pagination
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
