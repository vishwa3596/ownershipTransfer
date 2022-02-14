import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";
import AskOwnerShip from "./AskOwnerShip";
import CreateItem from "./CreateItem";
import ItemList from "./ItemList";
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

	const createItem = async (id, type) => {
		console.log(id, type);
		const response = await contract.methods.createItem(type, id).send({
			from:account,
			gas: 3000000
		})
		console.log(response);
	}
	return(
		<div>
			{account}
			{account.length > 0 ? <ItemList account = {account}/> : <></>}
			<CreateItem createItem = {createItem}/>
			<AskOwnerShip/>   
		</div>
	)
}

export default Homepage;