import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getPageStartAndEnd } from 'utils/util'
import { get } from 'utils/http'
import { ListContainer } from './style'
import { List, Button, Tabs, Pagination, message } from 'antd';

const { TabPane } = Tabs;


export default ({ getDataUrl, getTagsUrl, dataDelete, router, Extra, Status, content }) => {
    const [data, setData] = useState([])
    const [tags, setTags] = useState([])
    const [currentTabsData, setCurrentTabsData] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const INIT_PAGE_SIZE = 10;

    let history = useHistory()

    const loadData = async () => {
        let _data, _tags
        try {
            _data = await get(getDataUrl)
            _tags = await get(getTagsUrl)
        } catch (error) {
            throw error
        }

        if (_data.data.code !== 200 || _tags.data.code !== 200) {
            message.error('载入数据失败')
        }
        setData(_data.data.data)
        setTotal(_data.data.total)
        setCurrentTabsData(_data.data.data)
        setDisplayData(_data.data.data.slice(0, INIT_PAGE_SIZE))
        setTags(['全部', _tags.data.data.map(value => value.type)])
    }


    // 编辑按钮点击事件
    const handleEdit = async (id) => {
        history.push(`/${router}-add/${id}`)
    }

    const handleDelete = async (id, index) => {
        const res = await dataDelete(id, index)
        if (res) {
            message.success('删除成功')
            setDisplayData(displayData.slice(0, index).concat(data.slice(index + 1)))
            setTotal(total - 1)
        } else {
            message.error('删除失败')
        }
    }

    // 查看评论
    const toCommentView = (id) => {
        history.push(`/${router}-comment/${id}`)
    }

    // tab标签切换
    const handleTabsSwitch = (value) => {
        const { start, end } = getPageStartAndEnd(page, pageSize)

        if (value === '全部') {
            setTotal(data.length)
            setCurrentTabsData(data)
            setDisplayData(data.slice(start, end))
            return
        }
        const display = data.filter((item) => item.tag === value)
        setTotal(display.length)
        setCurrentTabsData(display)
        setDisplayData(display.slice(start, end))
    }

    const showTotal = total => {
        return `Total ${total} items`;
    }

    const onPageChange = (page, pageSize) => {
        setPage(page)
        const { start, end } = getPageStartAndEnd(page, pageSize)
        setDisplayData(currentTabsData.slice(start, end))
    }

    const onShowSizeChange = (current, size) => {
        setPageSize(size)
        const { start, end } = getPageStartAndEnd(current, size)
        setDisplayData(currentTabsData.slice(start, end))
    }

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ListContainer>
            <Tabs defaultActiveKey="1" tabPosition={'top'} onChange={handleTabsSwitch} animated={false}>
                {tags.map((value, index) => (
                    <TabPane tab={value} key={value}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={displayData}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <Button onClick={handleEdit.bind(this, item.articleId)}>编辑</Button>,
                                        <Button onClick={handleDelete.bind(this, item.articleId, index)}>删除</Button>,
                                        <Button onClick={toCommentView.bind(this, item.articleId)}>查看评论</Button>
                                    ]}
                                    extra={<Extra></Extra>}
                                >
                                    <List.Item.Meta
                                        title={'asdsadsa'}
                                        description={<Status date={item.modifyOn} views={item.views} tag={item.tag} />}
                                    />
                                    {content}
                                </List.Item>
                            )}
                        />
                    </TabPane>
                ))}
            </Tabs>
            {
                displayData.length > 0 ? <Pagination
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
        </ListContainer>
    )
}
