import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FormContainer } from './style'
import { getBase64 } from 'utils/util'
import { get, post } from 'utils/http'
import { Form, Input, Select, Button, Upload, Modal, message, Row, Col, PageHeader } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { TAarticleTagsfindAll } from 'route/tags'
import { ARfindById } from 'route/article'
import Editor from 'for-editor'

const { Option } = Select
const { TextArea } = Input

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const validateMessages = {
    required: '此项未填写'
};



export default () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [article, setArticle] = useState('')
    const [imageFileList, setImageFileList] = useState([])
    const [articleFileList, setArticleFileList] = useState([])
    const [selectOptions, setSelectOptions] = useState([])

    const history = useHistory()
    const routerParams = useParams()
    const [form] = Form.useForm()

    const loadData = async (params, form) => {
        try {
            if (params.id) {
                let articleInfo
                try {
                    articleInfo = await post(ARfindById, {
                        articleId: params.id
                    })
                } catch (error) {
                    throw error
                }
                if (articleInfo.data.code !== 200) {
                    message.error('载入数据失败')
                }
                form.setFieldsValue({
                    title: articleInfo.data.data.title,
                    desc: articleInfo.data.data.desc,
                    banner: articleInfo.data.data.banner,
                    tag: articleInfo.data.data.tag,
                    content: articleInfo.data.data.content,
                })
                setArticle(articleInfo.data.data.content)
                setImageFileList([{
                    uid: '1',
                    name: articleInfo.data.data.banner.slice(articleInfo.data.data.banner.lastIndexOf('/') + 1),
                    status: 'done',
                    url: articleInfo.data.data.banner
                }])
            }

            let tags
            try {
                tags = await get(TAarticleTagsfindAll)
            } catch (error) {
                throw error
            }
            if (tags.data.code !== 200) {
                message.error('载入数据失败')
            }
            tags = tags.data.data.map(value => {
                return value.type
            })
            setSelectOptions(tags)
        } catch (error) {
            message.error(error)
        }
    }

    // 发布/编辑事件
    const onSumbit = async values => {
        try {
            let result
            if (routerParams.id) {
                result = await post('/articles/edit', {
                    articleId: routerParams.id,
                    ...values
                })
            } else {
                result = await post('/articles/add', values)
            }

            if (result.data.code !== 200) {
                message.error(routerParams.id ? `保存失败：${result.data.msg}` : `发布失败：${result.data.msg}`)
            } else {
                message.success(routerParams.id ? '保存成功' : '发布成功')
                if (routerParams.id) {
                    history.push('/home/article-list')
                } else {
                    form.resetFields()
                    setImageFileList([])
                    setArticleFileList([])
                }
            }
        } catch (error) {
            throw error
        }
    };

    // 文件上传事件
    const fileUploadChange = ({ file, fileList }) => {
        setArticleFileList(fileList)
        if (file.status === 'done') {
            message.success('导入文件内容成功');
            setArticle(article.concat(file.response.data))
        } else if (file.status === 'error') {
            message.error('导入文件内容失败');
        }
    }

    // 图片上传改变事件
    const handleUploadChange = ({ file, fileList }) => {
        setImageFileList(fileList)
        if (file.status === 'done') {
            message.success('上传图片成功');
        } else if (file.status === 'error') {
            message.error('上传图片失败');
        }
    };

    // 文章内容改变事件
    const handleContentChange = (value) => {
        setArticle(value)
        // 将编辑框里面的值更新进form字段
        form.setFieldsValue({
            ...form.getFieldsValue(),
            content: value
        })
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

    // 从回调数据中获取图片路径
    const getImageUrl = ({ file }) => {
        if (file.status === 'done') {
            return file.response.data
        } else if (file.status === 'error') {
            message.error('上传图片失败');
        }
    }

    // 从回调数据中获取文件内容
    const getFileContent = ({ file }) => {
        if (file.status === 'done') {
            return article + file.response.data
        } else if (file.status === 'error') {
            message.error('导入文件失败');
        }
    }

    // 返回上一个页面
    const back = () => {
        history.goBack()
    }

    // 表单字段对应值变化事件
    // const formInfoChange = (changedValues, allValues) => {
    //     console.log(allValues)
    // }

    useEffect(() => {
        loadData(routerParams, form)
    }, [routerParams, form])
    return (
        <>
            {
                routerParams.id ?
                    <PageHeader
                        className="site-page-header"
                        onBack={back}
                        title="返回文章列表"
                        subTitle="文章修改"
                    /> : null
            }
            <FormContainer>
                <Form {...layout} name="nest-messages" onFinish={onSumbit} validateMessages={validateMessages} form={form}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name='title'
                                label="文章标题"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入文章标题'
                                    },
                                    {
                                        min: 5,
                                        message: '不能少于5个字符'
                                    },
                                    {
                                        max: 30,
                                        message: '不能多于30个字符'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name='tag'
                                label="文章分类"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择文章分类'
                                    }
                                ]}
                            >
                                <Select defaultValue="请选择标签" style={{ width: 200 }}>
                                    {
                                        selectOptions.map(value => {
                                            return <Option value={value} key={value}>{value}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="文章内容"
                                name='content'
                                getValueFromEvent={getFileContent}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入文章内容'
                                    }
                                ]}>
                                <Upload
                                    name='file'
                                    action='http://localhost:3030/tools/transform'
                                    className="import"
                                    onChange={fileUploadChange}
                                    fileList={articleFileList}
                                    rules={[
                                        {
                                            required: true,
                                        }
                                    ]}
                                >
                                    <Button>
                                        <UploadOutlined /> 导入文件
                                </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                label="文章图片"
                                name="banner"
                                getValueFromEvent={getImageUrl}
                                rules={[
                                    {
                                        required: true,
                                        message: '请上传文章图片'
                                    }
                                ]}>
                                <Upload
                                    action="http://localhost:3030/tools/uploadImg"
                                    listType="picture-card"
                                    fileList={imageFileList}
                                    onPreview={handlePreview}
                                    // onRemove={}
                                    onChange={handleUploadChange}
                                    className="upload-img"
                                >
                                    {imageFileList.length >= 1 ? null : (
                                        <div>
                                            <PlusOutlined />
                                            <div className="ant-upload-text">上传图片</div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="文章简介"
                                name="desc"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入文章简介'
                                    },
                                    {
                                        min: 5,
                                        message: '不能少于5个字符'
                                    },
                                    {
                                        max: 100,
                                        message: '不能多于200个字符'
                                    }
                                ]}>
                                <TextArea rows={4} maxLength={200} />
                            </Form.Item>
                            <Modal visible={previewVisible} footer={null} onCancel={handleUploadCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit" className="submit">
                                    {
                                        routerParams.id ? "保存编辑" : "发布"
                                    }
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Editor value={article} onChange={handleContentChange} height={500} placeholder='在此输入文章内容...' />
                        </Col>
                    </Row>
                </Form>
            </FormContainer >
        </>
    );
}
