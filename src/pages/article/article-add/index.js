import React, { useEffect, useState } from 'react'
import { FormContainer } from './style'
import { getBase64 } from 'utils/util'
import { Form, Input, Select, Button, Upload, Modal, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
    number: {
        range: 'Must be between 0 and 99',
    },
};

const props = {
    name: 'file',
    action: 'http://192.168.0.100:3030/tools/transform',
    // headers: {
    //     authorization: 'authorization-text',
    // },
    onChange (info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default () => {
    const [visible, setVisible] = useState(false)
    const [fileList, setFileList] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false)
    };

    const onFinish = values => {
        console.log(values);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleUploadCancel = () => setPreviewVisible(false)

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };

    const handleUploadChange = ({ fileList }) => setFileList(fileList);

    return (
        <FormContainer>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['user', 'name']}
                    label="文章标题"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'email']}
                    label="文章分类"
                    rules={[
                        {
                            type: 'email',
                        },
                        {
                            required: true,
                        }
                    ]}
                >
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>

                <Form.Item name='introduction' label="文章内容">
                    <Button onClick={showModal}>
                        编辑
                    </Button>
                    <Upload {...props} className="import">
                        <Button>
                            <UploadOutlined /> Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="文章图片" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        action="http://192.168.0.100:3030/tools/uploadImg"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleUploadChange}
                        className="upload-img"
                    >
                        {fileList.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div className="ant-upload-text">上传文章图片</div>
                            </div>
                        )}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={handleUploadCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Form.Item>

                <Form.Item name="submit" wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" className="submit">
                        发布
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </FormContainer>
    );
}
