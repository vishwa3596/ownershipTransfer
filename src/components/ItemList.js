import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const ItemList = ({account}) => {
	console.log(account)
	const [ItemList, onUpdatingItemList] = useState([]);
	useEffect(() => {
		async function getItems() {
			const response = await contract.methods.getItems().send({
				from: account, 
				gas: 3000000})

			console.log(response);
			let itemList = response.events;
			if(Object.keys(itemList).length > 0)
				onUpdatingItemList(response.events.AllItems.returnValues.items)
		}
		getItems();
	},[])

	return (
		<div>
			<p>items</p>
			{ItemList.length > 0?ItemList.map((e) => <Box sx={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				columnGap: "10px"
			}}>
					<p key={e}>{e}</p>
					<Button variant="contained" color="primary" >AskOwnerShip</Button>
					<Button variant="contained" color="secondary">SeeOwnerShipHistory</Button>
				</Box>
				):
				<></>
			}
		</div>
	)
}

export default ItemList;