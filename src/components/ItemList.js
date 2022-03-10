import EachItem from "./EachItem";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";
import CreateItem from "./CreateItem";
import { Grid, Typography } from "@mui/material";
import RequestDeclined from "./RequestDeclined";
import RequestConfim from "./RequestConfim";
import Request from "./Request";
import TamperList from "./TamperList";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const ItemList = ({account}) => {
	const [ItemList, onUpdatingItemList] = useState([]);
	const [requestArray, onUpdatingRequestArray] = useState([])
	const [requestConfim, onConfirmRequest] = useState([]);
	const [requestDeclined, onDeclineRequest] = useState([]);
	const [deviceTamperList, onTamperingDevice] = useState([]);
	useEffect(() => {
		async function getItems() {
			const response = await contract.methods.getItems().send({
				from: account, 
				gas: 3000000
			})
			console.log(response);
			let itemList = response.events;
			if(Object.keys(itemList).length > 0) {
				let ItemList = []
				const Items = response.events.AllItems.returnValues.items;
				Items.forEach(async(e) => {
					const response = await contract.methods.getOwner(parseInt(e)).send({
						from: account, 
						gas: 3000000})
					const currentOwner = response.events.getCurrentOwner.returnValues.owner;
					const tempOwnerresponse = await contract.methods.getTempOwner(parseInt(e)).send({
						from: account,
						gas: 3000000
					})
					const tempOwner = tempOwnerresponse.events.getCurrentOwner.returnValues.owner;
					console.log(e, " ", currentOwner);
					const item = {
						"id": e,
						"owner": currentOwner,
						"tempOwner": tempOwner
					}
					onUpdatingItemList(prevState => [...prevState, item])
				})
				
			}
		}
		getItems();
	},[])

	console.log("here");
	
	const selectedItem = async(Id, type) => {
		const response = await contract.methods.getOwner(Id).send({from: account, gas: 3000000})
		const currentOwner = response.events.getCurrentOwner.returnValues.owner;
		console.log(currentOwner);
		/***
		 * pushInto the request Object.
		 */

		const value = {
			"from" : account,
			"to" : currentOwner,
			"type": type,
			"id": Id
		}
		appendToRequestArray(value);
	}

	const createItem = async (id, type) => {
		console.log(ItemList.length);
		if(ItemList.length > 0){
			if(ItemList.includes(id)) {
				alert("Item is already present with this Id");
			}else{
				console.log(id, type);
				if(parseInt(type) === 1){
					let challenge = Array.from({length: 5}, () => Math.floor(Math.random()*1000));
					let hardwareResponse = Array.from({length: 5}, () => Math.floor(Math.random()*1000));
					console.log(account);
					const response = await contract.methods.createItem(type, id, challenge, hardwareResponse).send({
						from:account,
						gas: 3000000
					})
					console.log(response);
					const item = {
						"id" : id,
						"owner": account,
						"tempOwner": account,
					}
					onUpdatingItemList(prevState => [...prevState, item]);
				}else{
					alert("OwnerShipType Should be premanent for first user");
				}
			}
		}
		else{
			if(parseInt(type) === 1){
				console.log(account);
				let challenge = Array.from({length: 5}, () => Math.floor(Math.random()*1000));
				let hardwareResponse = Array.from({length: 5}, () => Math.floor(Math.random()*1000));
				const response = await contract.methods.createItem(type, id, challenge, hardwareResponse).send({
					from:account,
					gas: 3000000
				})
				console.log(response);
				const item = {
					"id" : id,
					"owner": account,
					"tempOwner": account,
				}
				onUpdatingItemList(prevState => [...prevState, item]);
			}else{
				alert("OwnerShipType Should be premanent for first user");
			}
		}
	}

	const confirmingRequest = (value) => {
		let itemList = [...ItemList];
		itemList.forEach((e) => {
			if(e.id === value.id) {
				if(value.type === 1) {
					e.owner = value.to
					e.tempOwner = value.to
				}
				if(value.type === 0) {
					e.tempOwner = value.to;
				}
				
			}
		})
		onConfirmRequest(prevState => [...prevState, value]);
		onUpdatingItemList(itemList);
	}
	const declineRequest = (value) => {
		onDeclineRequest(prevState => [...prevState, value]);
	}
	const appendToRequestArray = (request) => {
		onUpdatingRequestArray(prevState => [...prevState, request]);
	}

	const updatingTamperedDeviceList = (value) => {
		onTamperingDevice(prevState => [...prevState, value]);
	}

	const onRevokingTempOwnerShip = (value) => {
		let itemList = [...ItemList];
		itemList.forEach((e) => {
			if(e.id === value.id) {
				e.owner = value.to
				e.tempOwner = value.to
			}
		})
		onUpdatingItemList(itemList);
	}

	return (
		<Grid container direction="column" justifyContent="space-between" sx={{
			marginTop: "10px"
		}}>
			<Grid item xs={12}>
				<Typography sx={{
					fontWeight: "600",
					fontSize: "1.5rem"
				}}>Item</Typography>
			</Grid>
			<Grid item xs={12} sx={{
				height: "500px"
			}}>
				{ItemList.length > 0?ItemList.map((e) =><EachItem 
					updatingTamperedDeviceList={updatingTamperedDeviceList} 
					account={account} 
					key = {e.id} 
					selectedItem={selectedItem} 
					Id={e.id} 
					ItemOwner={e.owner} 
					ItemTempOwner={e.tempOwner}/>):<></>
				}
			</Grid>
			<Grid container direction="row" justifyContent="space-between" >
				<Grid item xs={4} align="center">
					<CreateItem createItem = {createItem}/>
				</Grid>
				<Grid item xs={7} sx={{
					border: 1,
					borderRadius: "10px",
					borderColor: "#DCDCDC",
					marginTop: "10px",
					marginRight:"10px"
				}}>
					<Grid item xs={12} align = "center">
						<Request account={account} requestArray={requestArray} confirmingRequest={confirmingRequest}  declineRequest={declineRequest} />
					</Grid>
					<Grid item xs={12} align = "center">
						<RequestDeclined account={account} requestArray={requestDeclined} />
					</Grid>
					<Grid item xs={12} align = "center">
						<RequestConfim account={account} requestArray={requestConfim} />
					</Grid>
					<Grid item xs={12} align="center">
						<TamperList onRevokingTempOwnerShip={onRevokingTempOwnerShip} account={account} deviceTamperList={deviceTamperList} />
					</Grid>
				</Grid>		
			</Grid>
		</Grid>
	)
}

export default ItemList;