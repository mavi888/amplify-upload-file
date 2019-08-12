import React, { Component } from 'react';
import { PageHeader, ListGroup, FormGroup, FormControl, ControlLabel  } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.file = null;

		this.state = {
			isLoading: null
		};
	}

	handleFileChange = event => {
		this.file = event.target.files[0];
	}

	handleSubmit = async event => {
		event.preventDefault();
	  
		if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
		  alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
		  return;
		}
	  
		this.setState({ isLoading: true });
	  
		try {
		  await s3Upload(this.file);  
		  this.props.history.push("/");
		} catch (e) {
		  alert(e);
		  this.setState({ isLoading: false });
		}
	}

	renderLoggedIn() {
		return (
		  <div className="Home">
			<form onSubmit={this.handleSubmit}>
			  <FormGroup controlId="file">
				<ControlLabel>Upload a file</ControlLabel>
				<FormControl onChange={this.handleFileChange} type="file" />
			  </FormGroup>
			  <LoaderButton
				block
				bsStyle="primary"
				bsSize="large"
				type="submit"
				isLoading={this.state.isLoading}
				text="Upload!"
				loadingText="Uploading..."
			  />
			</form>
		  </div>
		);
	}

	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>You are logged in</PageHeader>
				<ListGroup>{!this.state.isLoading && this.renderLoggedIn()}</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
