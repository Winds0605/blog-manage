import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Pagination, Modal, Input, message, Empty, PageHeader } from 'antd';
import { CommentContainer } from './style'
import { post } from 'utils/http'
import { MEfindAll, MEdeleteByMessageId, MEdeleteSubMessageBySubId, MEaddSubMessage } from 'route/message'
import { formatDate } from 'utils/util'


const ExampleComment = ({ children, value, handleDelete, toggleComment, showModal, handleSubDelete }) => (
    <Comment
        actions={[
            handleSubDelete ? null : <span key="comment-nested-reply-to" onClick={showModal.bind(this, value)}>评论</span>,
            <span key="comment-nested-reply-to" onClick={handleDelete ? handleDelete.bind(this, value) : handleSubDelete.bind(this, value)}>删除</span>,
            handleSubDelete ? null : <span key="comment-nested-reply-to" onClick={toggleComment.bind(this, value)}>{value.sub.length > 0 ? (value.show ? "收起评论" : `查看${value.sub.length}条评论`) : ''}</span>
        ]}
        author={value.author}
        avatar={
            <Avatar
                src={value.avatar}
                alt="author"
            />
        }
        content={
            <p>
                {value.content}
            </p>
        }
        datetime={<span>{formatDate(value.modifyOn, "yyyy-MM-dd hh:mm:ss")}</span>}
    >
        {value.show ? children : null}
    </Comment>
);

export default () => {
    const [commentList, setCommentList] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [comment, setComment] = useState('')
    const [currentMessageId, setCurrentMessageId] = useState('')
    const [visible, setVisible] = useState(false)
    const [total, setTatol] = useState(0)

    const loadData = async (page, pageSize) => {
        let result
        try {
            result = await post(MEfindAll, {
                page,
                pageSize
            })
        } catch (error) {
            throw error
        }
        if (result.data.code !== 200) {
            message.error('载入数据失败')
        }
        setCommentList(result.data.data)
        setTatol(result.data.total)
    }

    // 评论回复事件
    const handleReplyCommit = async () => {
        if (!comment || !currentMessageId) {
            message.warn('发表评论失败')
            return
        }
        let result;
        try {
            result = await post(MEaddSubMessage, {
                messageId: currentMessageId,
                content: comment,
                author: 'Zephyr',
                avatar: 'https://markdowncun.oss-cn-beijing.aliyuncs.com/markdown/avata.png'
            })
        } catch (error) {
            throw error
        }
        if (result.data.code !== 200) {
            message.warn('发表留言失败')
        } else {
            setVisible(false)
            setComment('')
            loadData(page, pageSize)
            message.success('发表留言成功')
        }
    }

    // 评论删除事件
    const handleDelete = async (value) => {
        let result;
        try {
            result = await post(MEdeleteByMessageId, {
                messageId: value.messageId
            })
        } catch (error) {
            throw error
        }
        if (result.data.code !== 200) {
            message.error('删除评论失败')
        } else {
            message.success('删除评论成功')
            loadData(page, pageSize)
        }
    }

    // 子评论删除事件
    const handleSubDelete = async (value) => {
        let result;
        try {
            result = await post(MEdeleteSubMessageBySubId, {
                subId: value.subId
            })
        } catch (error) {
            throw error
        }
        if (result.data.code !== 200) {
            message.error('删除失败')
        } else {
            message.success('删除成功')
            loadData(page, pageSize)
        }
    }

    // 取消评论事件
    const handleCancel = e => {
        setVisible(false)
    };

    // 展示分页器的数据总量
    const showTotal = total => {
        return `Total ${total} items`;
    }

    // 展示回复评论模态框
    const showModal = (value) => {
        setVisible(true)
        setCurrentMessageId(value.messageId)
    }

    // 展开/收起评论
    const toggleComment = (item) => {
        let _ = commentList.map(value => {
            if (value.messageId === item.messageId) {
                console.log(value)
                value.show = value.show ? false : true
            }
            return value
        })
        setCommentList(_)
    }

    // 评论内容改变事件
    const commentContentChange = e => {
        setComment(e.target.value)
    }

    // 页码改变
    const pageChange = async (current) => {
        setPage(current)
    }

    // pageSize改变
    const onShowSizeChange = (current, size) => {
        setPageSize(size)
    }

    useEffect(() => {
        loadData(page, pageSize)
    }, [page, pageSize])


    return (
        <>
            <PageHeader
                className="site-page-header"
                title="留言"
                subTitle="留言列表"
            />
            <CommentContainer>
                {
                    commentList.map(item =>
                        (
                            <ExampleComment
                                value={item}
                                showModal={showModal}
                                handleDelete={handleDelete}
                                toggleComment={toggleComment}
                                key={item.modifyOn}
                                commentContentChange={commentContentChange}
                            >
                                {
                                    item.sub.map(subItem => (
                                        <ExampleComment value={subItem} handleSubDelete={handleSubDelete} key={subItem.modifyOn} />
                                    ))
                                }
                            </ExampleComment>
                        )
                    )
                }
                <Modal
                    visible={visible}
                    okText="发表评论"
                    cancelText="取消"
                    onOk={handleReplyCommit}
                    onCancel={handleCancel}
                    closable={false}
                >
                    <Input placeholder="请输入评论" onChange={commentContentChange} />
                </Modal>
                {
                    commentList.length > 0
                        ? <Pagination
                            size="small"
                            className="pageination"
                            total={total}
                            showQuickJumper
                            showSizeChanger
                            pageSizeOptions={[5, 10, 15, 20]}
                            onChange={pageChange}
                            onShowSizeChange={onShowSizeChange}
                            showTotal={showTotal}
                            defaultPageSize={pageSize} />
                        : <Empty description="暂无评论数据" />
                }
            </CommentContainer>
        </>

    )
}
