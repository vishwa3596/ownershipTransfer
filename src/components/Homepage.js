import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";
/**
 * get all the items from the map in the contract.
 * fetching the different address with metamask account.
 * ask for owner ship with only a button and cur account of metamask account as msg.sender.
 * show the ownership request.
*/
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const Homepage = () => {
	const [account, onSetAccount] = useState("");
	const [ownerShipType, onChangeOwnerShipType] = useState("");
	const [id, onChangePublicId] = useState(0);
	const [owner, onChangeOwner] = useState("");
	const [newOwnerType, onNewOwnerType] = useState("");
	const [pdtId, onWhichId] = useState(0);
	const [newOwner, onNewOwner] = useState("");
	const [qID, onqId] = useState(0);
	
	useEffect(() => {
		if(window.ethereum){
			window.Web3 = new Web3(window.ethereum);
			window.ethereum.enable();
			console.log("etherium detected")
			async function getAccounts(){
				const accounts = await web3.eth.getAccounts();
				onSetAccount(accounts[0]);
			}
			getAccounts();
		}
	},[])

	const onChangeAddress = (e) => {
		e.preventDefault();
		onChangeOwner(e.target.value);
	}
	const onChangeOwnershipId = (e) => {
		e.preventDefault();
		onChangeOwnerShipType(e.target.value);
	}
	const onChangePdtId = (e) => {
		e.preventDefault();
		onChangePublicId(e.target.value);
	}
	const onCreateItem = async(e) => {
		e.preventDefault();
		console.log(account);
		const ID = parseInt(id);
		const response = await contract.methods.createItem(ownerShipType, ID).send({from: account, gas: 3000000});
		console.log(response);
	}
	const getVal = async(e) => {
		e.preventDefault();
		const account = await web3.eth.accounts[0];
		console.log(account);
		contract.methods.val().call().then((res) => console.log(res)).catch(err => console.log(err));
	}
	const onChangeAddressshift = (e) => {
		e.preventDefault();
		onNewOwner(e.target.value);
	}
	const onChangeOwnershipIdshift = (e) => {
		e.preventDefault();
		onNewOwnerType(e.target.value);
	}
	const onChangePdtIdshift = (e) => {
		e.preventDefault();
		onWhichId(e.target.value);
	}
	const onShiftOwner = async(e) => {
		e.preventDefault();
		const ID = parseInt(id);
		const response = await contract.methods.askOwnerShip(ID,ownerShipType).send({from: '0x8287cB594058009292D85A6922bd42e296472d3B', gas: 3000000})
		console.log(response);
	}
	const onQuery = async(e) => {
		e.preventDefault();
		const response = await contract.methods.publicView(qID).send({from: account, gas: 3000000})
		console.log(response);
		const history = await contract.methods.showOwnerShipHistory(qID).send({from: account, gas: 3000000})
		console.log(history);
	}
	const queryId = (e) => {
		e.preventDefault();
		onqId(e.target.value);
	}
	return(
		<div>
			{account}
			<br />
			<form onSubmit={onCreateItem}>
			<input onChange={onChangeAddress} value={owner} placeholder="Enter address" />
			<input onChange={onChangeOwnershipId} value={ownerShipType} placeholder="EnterOwnerType" />
			<input onChange={onChangePdtId} value={id} placeholder="pdtID" />
			<button>submit</button>
			</form>
			<button onClick={getVal}>GetVal</button>
			<form onSubmit={onShiftOwner}>
			<input onChange={onChangeAddressshift}  vaue ={newOwner}placeholder="Enter address" />
			<input onChange={onChangeOwnershipIdshift} value={newOwnerType} placeholder="EnterOwnerType" />
			<input onChange={onChangePdtIdshift}  value = {pdtId} placeholder="pdtID" />
			<button>changeOwner</button>
			</form>
			<form onSubmit={onQuery}>
				<input onChange={queryId} value={qID} placeholder="queryID"/>
				<button>query</button>    
			</form>		    
		</div>
	)
}

export default Homepage;