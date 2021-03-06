import React, { Component } from "react";
import Header from '../../component/header';

import { Upload, Select, Form, Modal, Input, Button, Layout, message } from 'antd';
import Job from '../../component/Job'
import { UploadOutlined , FileAddOutlined } from '@ant-design/icons';
import db from '../../common/firebase/db';
import { FormInstance } from 'antd/lib/form';
import { baseUrl } from '../../utils'
import axios from 'axios';
import './index.css';

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

class Home extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            form: null,
            visible: false,
            loading: false,
            jobs: [],
            allJobs: []
        }
        this.onSearch = this.onSearch.bind(this);
    }
    async getJobs(url) {
        let jobs
        let res = await axios(url,  {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        return res.data;
    }

    async componentDidMount() {
        let data = await this.getJobs(baseUrl);
        this.setState({jobs: data, allJobs: data});
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        const cvInfo = this.formRef.current.getFieldsValue();
        db.postCVInfo(cvInfo);
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };

    onSearch(value){
        this.setState({jobs: this.state.allJobs.filter(job => job.title.toLowerCase().includes(value.toLowerCase()))});
    }

    render() {
        const { visible, loading } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                    <Option value="84">+84</Option>
                </Select>
            </Form.Item>
        );

        const upload = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
            progress: {
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
              },
              strokeWidth: 3,
              format: percent => `${parseFloat(percent.toFixed(2))}%`,
            },
          };

        
        
        const CVModal = (
            <Modal
                visible={visible}
                title="Add CV"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                <Button key="back" onClick={this.handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                    Submit
                </Button>,
                ]}
            >
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    name="CV Info"
                    initialValues={{
                        prefix: '84',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="fullname"
                        label="Full Name"
                        rules={[{required: true, message: 'Please input your full name!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'required',
                                message: 'The input is not valid email!'
                            },
                            {
                                required: true,
                                message: 'Please input your email!',
                            }
                        ]}
                    >
                        <Input defaultValue={localStorage.email} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="file"
                        label="CV File"
                        rules={[{ required: true, message: 'Please input your CV file!' }]}
                    >
                        <Upload {...upload}>
                            <Button icon={<UploadOutlined />}>Upload CV</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="jobtype"
                        label="Job Working Type"
                    >
                        <Select defaultValue="All working type">
                            <Option value="All working type">All working type</Option>
                            <Option value="Full-time">Full-time</Option>
                            <Option value="Part-time">Part-time</Option>
                            <Option value="Internship">Internship</Option>
                            <Option value="Freelancer">Freelancer</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="jobcategory"
                        label="Job Category"
                    >
                        <Select defaultValue="All categories">
                            <Option value="All categories">All categories</Option>
                            <Option value="Doctor">Doctor</Option>
                            <Option value="Sale">Sale</Option>
                            <Option value="Developer">Developer</Option>
                            <Option value="Education">Education</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
        return (
            <div>
                <Header>
                    {localStorage.accounttype === '0' && <Button style={{margin: '12px'}} icon={<FileAddOutlined />} onClick={this.showModal}>
                        Add CV
                    </Button>}
                    {CVModal}
                    <Search placeholder="search job" onSearch={this.onSearch} style={{ position: 'absolute', left: 200, top: '50%', transform: 'translateY(-50%)' ,width: 200 }} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <div className="job-list">
                            <h3 className="job-list__text"> Top Jobs </h3>
                            <div className="job-listing">
                                {this.state.jobs.map(job => <Job key={job.id} job={job} />)}
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Home;
