import React, { Component } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "../config";

class Homepage extends Component{
	constructor(props){
		super(props);
		this.state={
			account:"",
			taskCount:0
		}
	}
	componentDidMount(){
		this.loadBlockChain();
	}
	async loadBlockChain(){
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
		const network = await web3.eth.net.getNetworkType()
		console.log("network ", network);
		const account = await web3.eth.getAccounts()
		this.setState({
			account: account
		})
		const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
		const taskCount = await todoList.methods.taskCount().call()
		this.setState({
			taskCount: taskCount
		})
	}
	render(){
		return(
			<div>
				Loading Blockchain
				{this.state.account}
				<br/>
				{this.state.taskCount}
			</div>
		)
	}
}

export default Homepage;