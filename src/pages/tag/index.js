import React, { useEffect, useState } from 'react'
import { Select, PageHeader, Button, Tag, message, Modal } from 'antd'
import { get, post } from 'utils/http'
import { Container, TagContainer } from './style'

const { Option } = Select;


export default ({ tagFindAll, tagAdd, tagDelete, title }) => {
    const [tags, setTags] = useState([])
    const [visible, setVisible] = useState(false)
    const [modalState, setModalState] = useState('')
    const [selectValue, setSelectValue] = useState([])

    const loadData = async (tagFindAll) => {
        let res
        try {
            res = await get(tagFindAll)
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error(res.data.msg || '发生未知错误')
            return
        }
        setTags(res.data.data.map(value => value.type))
    }

    const handleChange = (value) => {
        if (modalState === tagDelete) {
            setSelectValue(value.filter(value => {
                return tags.includes(value)
            }))
        } else {
            setSelectValue(value)
        }

    }

    const clear = () => {
        setSelectValue([])
        setVisible(false)
    }

    const showModal = (e) => {
        if (e.target.innerText === '删 除') {
            setModalState(tagDelete)
        } else if (e.target.innerText === '添 加') {
            setModalState(tagAdd)
        }
        setVisible(true)
    };

    const handleOk = async e => {
        if (selectValue.length === 0) {
            message.warn('还未选择标签')
            return
        }
        let res;
        try {
            res = await post(modalState, {
                type: selectValue
            })
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error('操作失败')
            return
        }
        message.success(modalState === tagAdd ? '添加成功' : '删除成功')
        clear()
        loadData(tagFindAll)
    };

    const handleCancel = e => {
        clear()
    };

    useEffect(() => {
        loadData(tagFindAll)
    }, [tagFindAll])
    return (
        <Container>
            <PageHeader
                className="site-page-header"
                title={title}
            />
            <TagContainer>
                {
                    tags.map(value => (
                        <Tag key={value}>
                            {value}
                        </Tag>
                    ))
                }
            </TagContainer>
            <div className="btn">
                <Button type="dashed" onClick={showModal}>添加</Button>
                <Button danger onClick={showModal}>删除</Button>
            </div>
            <Modal
                okText="确认"
                cancelText="取消"
                title={null}
                closable={false}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <span style={{ display: 'block', margin: '10px 0' }}>
                    选择
                    {
                        modalState === tagDelete ? '删除' : '添加'
                    }
                    的标签：
                </span>
                {
                    modalState === tagDelete
                        ?
                        <Select
                            mode="tags"
                            placeholder='选择一个或多个标签'
                            value={selectValue}
                            style={{ width: '100%' }}
                            onChange={handleChange}>
                            {
                                tags.map(value => <Option value={value} key={value}>{value}</Option>)
                            }
                        </Select >
                        :
                        <Select
                            mode="tags"
                            placeholder='输入一个或多个标签以,分割'
                            value={selectValue}
                            open={false}
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            tokenSeparators={[',']}>
                        </Select>
                }
            </Modal>
        </Container >
    )
}
