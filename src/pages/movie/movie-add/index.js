import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Rate, Transfer, message, Upload, Modal, PageHeader } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from 'utils/util'
import { get, post } from 'utils/http'
import { TAmovieTagsfindAll } from 'route/tags'
import { MOadd, MOfindById, MOedit } from 'route/movie'
import { FormContainer } from './style'

const { TextArea } = Input;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

export default () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [tags, setTags] = useState([])
    const [targetKeys, setTargetKeys] = useState([])
    const [imageFileList, setImageFileList] = useState([])

    const routerParams = useParams()
    const history = useHistory()
    const [form] = Form.useForm()

    const loadData = async (params, form) => {
        let tags;
        if (params.id) {
            const res = await post(MOfindById, {
                movieId: params.id
            })
            const movieInfo = res.data.data
            form.setFieldsValue({
                name: movieInfo.name,
                director: movieInfo.director,
                rate: movieInfo.rate,
                country: movieInfo.country.join('/'),
                type: movieInfo.type,
                introduction: movieInfo.introduction,
                image: movieInfo.image
            })
            setTargetKeys(movieInfo.type)
            setImageFileList([{
                uid: '1',
                name: movieInfo.image.slice(movieInfo.image.lastIndexOf('/') + 1),
                status: 'done',
                url: movieInfo.image
            }])
        }
        try {
            tags = await get(TAmovieTagsfindAll)
        } catch (error) {
            message.error('发生未知错误')
            throw error
        }
        if (tags.data.code !== 200) {
            message.error(tags.data.msg || '发生未知错误')
            return
        }

        setTags(tags.data.data.map(value => {
            return {
                key: value.type,
                title: value.type,
            }
        }))
    }

    const filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    const handleChange = targetKeys => {
        setTargetKeys(targetKeys)
    };

    const handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    const back = () => {
        history.goBack()
    }

    const onFinish = async values => {
        let result;
        try {
            if (routerParams.id) {
                result = await post(MOedit, {
                    ...values,
                    movieId: routerParams.id,
                    country: values.country.split('/')
                })
            } else {
                result = await post(MOadd, {
                    ...values,
                    country: values.country.split('/')
                })
            }
        } catch (error) {
            throw error
        }
        if (result.data.code !== 200) {
            message.error(routerParams.id ? "保存失败" : "发布失败")
        } else {
            message.success(routerParams.id ? "保存成功" : '发布成功')
            if (routerParams.id) {
                history.goBack()
            } else {
                form.setFieldsValue({
                    name: '',
                    director: '',
                    rate: 0,
                    introduction: '',
                    type: [],
                    country: []
                })
            }
        }
    };

    // 从回调数据中获取图片路径
    const getImageUrl = ({ file }) => {
        if (file.status === 'done') {
            return file.response.data
        } else if (file.status === 'error') {
            message.error('上传图片失败');
        }
    }

    // 图片缩略图
    const handleUploadPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    const handleUploadRemove = (file) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            image: ''
        })
    }

    // 图片缩略图关闭
    const handleUploadCancel = () => setPreviewVisible(false)

    // 图片上传改变事件
    const handleUploadChange = ({ file, fileList }) => {
        setImageFileList(fileList)
        if (file.status === 'done') {
            message.success('上传图片成功');
        } else if (file.status === 'error') {
            message.error('上传图片失败');
        }
    };


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
                        title="返回电影列表"
                        subTitle="电影修改"
                    /> : null
            }
            <FormContainer>
                <Form
                    {...layout}
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="电影名称："
                        name="name"
                        rules={[{ required: true, message: '请输入电影名称' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="电影导演："
                        name="director"
                        rules={[{ required: true, message: '请输入导演名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="电影评分："
                        name="rate"
                        rules={[{ required: true, message: '请打上电影评分' }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>

                    <Form.Item
                        label="电影类型"
                        name="type"
                        rules={[{ required: true, message: '请选择电影类型' }]}
                    >
                        <Transfer
                            dataSource={tags}
                            showSearch
                            filterOption={filterOption}
                            targetKeys={targetKeys}
                            onChange={handleChange}
                            onSearch={handleSearch}
                            render={item => item.title}
                        />
                    </Form.Item>

                    <Form.Item
                        label="电影简介"
                        name="introduction"
                        rules={[{ required: true, message: '请选择电影简介' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="制作国家："
                        name="country"
                        rules={[{ required: true, message: '请输入国家名称' }]}
                    >
                        <Input placeholder="输入多个国家以 / 隔开" />
                    </Form.Item>
                    <Form.Item
                        label="电影图片"
                        name="image"
                        getValueFromEvent={getImageUrl}
                        rules={[
                            {
                                required: true,
                                message: '请上传电影图片'
                            }
                        ]}>
                        <Upload
                            action="http://localhost:3030/tools/uploadImg"
                            listType="picture-card"
                            fileList={imageFileList}
                            onPreview={handleUploadPreview}
                            onRemove={handleUploadRemove}
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
                    <Modal visible={previewVisible} footer={null} onCancel={handleUploadCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <Form.Item {...tailLayout}>
                        {

                            <Button type="primary" htmlType="submit">
                                {
                                    routerParams.id ? '保存' : '发布'
                                }
                            </Button>
                        }
                    </Form.Item>
                </Form >
            </FormContainer>
        </>

    )
}
