import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";

import ItemList from "./ItemList";
import { Grid, Typography } from "@mui/material";

/**
 * get all the items from the map in the contract.
 * fetching the different address with metamask account.
 * ask for owner ship with only a button and cur account of metamask account as msg.sender.
 * show the ownership request.
 * make request in ui and update the ui depending on that.
 * request: [
 * 'AbhiOwnerKonhai' : [{"ownerShipKonMangRahahai": '', itemId: 0}]
 * ]
 * fullfilled: [
 * 'ownerShipMangRahatha' : [{konFullfillKiya: '', itemId: 0}]
 * ]
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
			async function initialAccount() {
				const account = await web3.eth.getAccounts();
				let address = account[0];
				const EthereumAddress = web3.utils.toChecksumAddress(address);
				console.log(EthereumAddress);
				onSetAccount(EthereumAddress);
			}
			initialAccount();
			window.ethereum.on('accountsChanged', function (accounts) {
				let address = accounts[0];
				const EthereumAddress = web3.utils.toChecksumAddress(address);
				console.log(EthereumAddress);
				onSetAccount(EthereumAddress);
			})
		}
	},[])
	
	
	
	
	return(
		<Grid container direction="row" justify="center">
			<Grid item xs={12} align="center" sx={{
				margin: "10px",
				border: 1,
				borderRadius: "10px",
				borderColor: "#DCDCDC"
			}}>
				<Typography sx={{
					fontWeight: "600"
				}}>Active Account</Typography>
				<Typography>{account}</Typography>	
			</Grid>
			<Grid item xs={12} align="center">
				{account.length > 0 ? <ItemList account = {account}/> : <></>}
			</Grid>
			
		</Grid>
	)
}

export default Homepage;