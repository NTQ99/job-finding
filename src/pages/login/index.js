import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import auth from '../../common/firebase/auth';
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/select2/select2.min.css";
import "./css/util.css";
import "./css/main.css";
import img01 from "./images/img-01.png";

const { TabPane } = Tabs;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			accounttype: '0'
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount() {
        if (localStorage.uid) this.props.history.push('/home');
    }

	handleChange(event) {
		switch (event.target.name) {
			case 'email':
				this.setState({email: event.target.value});
				break;
			case 'password':
				this.setState({password: event.target.value});
				break;
			case 'accounttype':
				this.setState({accounttype: event.target.value});
				break;
			default:
				break;
		}
	}

	async handleLogin(event) {
		event.preventDefault();
		let userData = await auth.loginAccount(this.state);
		if (userData !== undefined) {
			console.log(userData);
			localStorage.setItem('uid', userData.uid);
			localStorage.setItem('accounttype', userData.accounttype);
			if (userData.accounttype === '0') {
				this.props.history.push('/home');
			} else {
				this.props.history.push('/recruiter');
			}
		}
	}

	async handleRegister(event) {
		event.preventDefault();
		let uid = await auth.createNewAccount(this.state);
		if (uid !== undefined) {
			localStorage.setItem('uid', uid);
			localStorage.setItem('accounttype', this.state.accounttype);
			this.props.history.push('/recruiter');
		}
	}

	render() {
		return (
			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-pic js-tilt" data-tilt>
							<img src={img01} alt="IMG" />
						</div>
						<div className="login100-form validate-form">
							<span className="login100-form-title">
								Job Finding
							</span>
							<Tabs defaultActiveKey="1" centered>
								<TabPane tab="Login" key="1">
									<form onSubmit={this.handleLogin}>
										<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
											<input className="input100" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
											<span className="focus-input100"></span>
											<span className="symbol-input100">
												<i className="fa fa-envelope" aria-hidden="true"></i>
											</span>
										</div>

										<div className="wrap-input100 validate-input" data-validate = "Password is required">
											<input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
											<span className="focus-input100"></span>
											<span className="symbol-input100">
												<i className="fa fa-lock" aria-hidden="true"></i>
											</span>
										</div>
										
										<div className="container-login100-form-btn">
											<button className="login100-form-btn">
												Login
											</button>
										</div>

										<div className="text-center p-t-12">
											<span className="txt1">
												Forgot&nbsp;
											</span>
											<a className="txt2" href="#">
												Email / Password?
											</a>
										</div>

									</form>
								</TabPane>
								<TabPane tab="Register" key="2">
									<form onSubmit={this.handleRegister}>
										<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
											<input className="input100" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
											<span className="focus-input100"></span>
											<span className="symbol-input100">
												<i className="fa fa-envelope" aria-hidden="true"></i>
											</span>
										</div>

										<div className="wrap-input100 validate-input" data-validate = "Password is required">
											<input className="input100" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
											<span className="focus-input100"></span>
											<span className="symbol-input100">
												<i className="fa fa-lock" aria-hidden="true"></i>
											</span>
										</div>

										<div className="wrap-radio-input" onChange={this.handleChange.bind(this)}>
											<span className="txt3" style={{margin: "0 20px", fontWeight: "bold"}}>
												I am:&nbsp;
											</span>
											<input className="radio-input" type="radio" name="accouttype" value="1" />
											<label className="txt3" style={{marginRight: "10px"}}>recruiter</label>
											<input className="radio-input" type="radio" name="accouttype" value="0" defaultChecked={true}/>
											<label className="txt3">candidate</label>
										</div>
										
										<div className="container-login100-form-btn">
											<button className="login100-form-btn">
												Register
											</button>
										</div>


									</form>
								</TabPane>
							</Tabs>
							
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);