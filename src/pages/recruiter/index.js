import React, { Component } from "react";
import Header from '../../component/header';

import AddJob from '../../component/AddJobModal';

import { Upload, Select, Form, Modal, Input, Button, Layout, message } from 'antd';
import CVInfo from '../../component/CVInfo'
import { UploadOutlined , FileAddOutlined } from '@ant-design/icons';
import db from '../../common/firebase/db';
import { FormInstance } from 'antd/lib/form';
import { baseUrl } from '../../utils'
import axios from 'axios';
import './index.css';

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

class Recruiter extends Component {
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
        const data = [{
            "email" : "thinhlv@gmail.com",
            "fullname" : "Lê Văn Thịnh",
            "jobcategory" : "Developer",
            "jobtype" : "Full-time",
            "phone" : "0344561299"
          },
          {
            "email" : "quoca2cvp@gmail.com",
            "fullname" : "Nguyễn Tuấn Quốc",
            "jobcategory" : "All Job Category",
            "jobtype" : "All working type",
            "phone" : "0344561299"
          }];
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
                <AddJob />
            </Modal>
        )
        return (
            <div>
                <Header>
                    {localStorage.accounttype === '1' && <Button style={{margin: '12px'}} icon={<FileAddOutlined />} onClick={this.showModal}>
                        Add Job
                    </Button>}
                    {CVModal}
                    <Search placeholder="search CV" onSearch={this.onSearch} style={{ position: 'absolute', left: 200, top: '50%', transform: 'translateY(-50%)' ,width: 200 }} />
                </Header>
                <Content>
                    <div className="site-layout-content">
                        <div className="job-list">
                            <h3 className="job-list__text"> CVs Info </h3>
                            <div className="job-listing">
                                {data.map(adata => <CVInfo job={adata} />)}
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Recruiter;
