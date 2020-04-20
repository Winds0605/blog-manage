import React, { useEffect, useState } from 'react'
import { Table, Tag, Popconfirm, Spin, message, Button, Modal, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { TableContainer } from './style'
import { post, get } from 'utils/http'
import { getBase64 } from 'utils/util'
import { PHadd, PHdelete, PHfindAll } from 'route/photo'
import Zmage from 'react-zmage'



export default () => {

    const [photo, setPhoto] = useState([])
    const [spin, setSpin] = useState(false)
    const [visible, setVisible] = useState(false)
    const [imageFileList, setImageFileList] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)

    const columns = [
        {
            title: '图片',
            dataIndex: 'url',
            key: 'url',
            width: '40%',
            render: url => <Zmage src={url} style={{ width: '30%' }} />,
        },
        {
            title: '宽度',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: '高度',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) =>
                photo.length >= 1 ? (
                    <>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(text, record)}>
                            <Tag>Delete</Tag>
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];

    // 删除图片事件
    const handleDelete = async (text, record) => {
        setSpin(true)
        let res;
        try {
            res = await post(PHdelete, {
                url: record.url
            })
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error('删除失败')
            return
        }
        loadData()
        setSpin(false)
        message.success('删除成功')
    }

    // 缩略图取消
    const handleUploadCancel = () => setPreviewVisible(false)

    // 图片缩略图
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    // 图片上传监听改变
    const handleUploadChange = ({ file, fileList }) => {
        if (file.status === 'done') {
            // 创建对象
            var img = new Image()
            // 改变图片的src
            img.src = `https://markdowncun.oss-cn-beijing.aliyuncs.com/movie/photo_2.jpg`
            // 判断是否有缓存
            if (img.complete) {
                fileList[fileList.length - 1].width = img.width
                fileList[fileList.length - 1].height = img.height
            } else {
                // 加载完成执行
                img.onload = function () {
                    fileList[fileList.length - 1].width = img.width
                    fileList[fileList.length - 1].height = img.height
                }
            }
        }
        setImageFileList(fileList)
        if (file.status === 'done') {
            message.success('上传图片成功');
        } else if (file.status === 'error') {
            message.error('上传图片失败');
        }
    };

    // 加载数据
    const loadData = async () => {
        setSpin(true)
        let res
        try {
            res = await get(PHfindAll)
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error('删除失败')
            return
        }
        setPhoto(res.data.data)
        setSpin(false)
    }

    // 展示数据条数
    const showTotal = (total) => `Total ${total} items`

    // 添加图片
    const handleOk = async e => {
        setVisible(false)
        let _ = imageFileList.map(value => {
            return {
                width: value.width,
                height: value.height,
                url: value.response.data
            }
        })
        let res
        try {
            res = await post(PHadd, {
                imgList: _
            })
        } catch (error) {
            throw error
        }
        if (res.data.code !== 200) {
            message.error('新增图片失败')
            return
        }
        message.success('添加图片成功')
    };

    // 模态框取消
    const handleCancel = e => {
        setVisible(false)

    };

    const showModal = () => {
        setVisible(true)
    }

    useEffect(() => {
        loadData()
    }, [])
    return (
        <TableContainer>
            <Spin spinning={spin} />
            <Table columns={columns} dataSource={photo} pagination={{ showQuickJumper: true, showTotal, size: 'small' }} />
            <Button type="primary" className='add' onClick={showModal}>添加</Button>
            <Modal
                title="上传图片"
                okText="添加"
                cancelText="取消"
                closable={false}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Upload
                    action="http://localhost:3030/tools/uploadImg"
                    listType="picture-card"
                    fileList={imageFileList}
                    onPreview={handlePreview}
                    // onRemove={}
                    onChange={handleUploadChange}
                    className="upload-img"
                >
                    <div>
                        <PlusOutlined />
                        <div className="ant-upload-text">上传图片</div>
                    </div>
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleUploadCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Modal>
        </TableContainer>
    )
}
