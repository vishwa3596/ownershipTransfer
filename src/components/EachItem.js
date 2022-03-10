import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";


const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
   };



const EachItem = ({account, Id, selectedItem, ItemOwner, ItemTempOwner, updatingTamperedDeviceList}) => {
	const [open, setOpen] = useState(false);
  	const handleOpen = () => setOpen(true);
  	const handleClose = () => setOpen(false);
	console.log(Id, " ", ItemOwner);
	const askPermanentOwnerShip = () => {
		selectedItem(Id, 1);
	}
	const askTemporaryOwnerShip = () => {
		selectedItem(Id, 0);
	}

	const onTamperingDevice = async() => {
		console.log("Tampering Device");
		let response = await contract.methods.Deviceresponse(parseInt(Id)).send({
			from: account,
			gas: 3000000
		})
		let deviceResponse = (response.events.AllItems.returnValues.items);
		let length = deviceResponse.length;
		let randomIndex = Math.floor(Math.random()*length);

		let tempResponse = deviceResponse.map((e) => parseInt(e));
		console.log(tempResponse);
		tempResponse[randomIndex] += 1;
		console.log(tempResponse);
		response = await contract.methods.tamperWithDevice(parseInt(Id), tempResponse).send({
			from: account,
			gas: 3000000
		})
		const value = {
			"to": ItemOwner,
			"id": Id,
			"from": account
		}
		updatingTamperedDeviceList(value);
	}



	const onCheckingAuthencity = async() => {
		const response = await contract.methods.checkDeviceTamper(parseInt(Id)).send({
			from: account,
			gas: 3000000
		});

		console.log(response);
		let AuthencityReport = response.events.outputString.returnValues.s;
		console.log(AuthencityReport);
	}

	const showOwnerShip = async() => {
		// show complete ownership.
		const response = await contract.methods.showOwnerShipHistory(parseInt(Id)).send({
			from: account, 
			gas: 3000000
		})
		console.log(response.events.pastOwners.returnValues.pastOwners);
		let owners = response.events.pastOwners.returnValues.pastOwners;
		let Owner = ""
		owners.forEach((e) => {
			Owner = Owner + e +','
		})
		console.log(Owner);
		alert( Owner);
	}
	return(
		<Grid container direction="row" sx={{
			justifyContent: "space-between",
			alignContent: "center",
			marginTop: "10px"
		}}>
			<Grid item xs={1} sx={{
				borderLeft: 1,
			}}>
				<Typography>{Id}</Typography>
			</Grid>
			<Grid item xs={2} sx={{
				borderLeft: 1,
				borderColor: "#DCDCDC"
			}}>
				<Button sx={{
					textTransform: "none",
					
				}} disabled={ItemOwner === account?true:false} onClick={askPermanentOwnerShip} 
				variant="contained" color="primary">Ask Permanent OwnerShip</Button>
			</Grid>
			<Grid item xs={2} sx={{
				borderLeft: 1,
				borderColor: "#DCDCDC"
			}}>
				<Button sx={{
					textTransform: "none",
				}} disabled={ItemTempOwner === account?true:false} onClick={askTemporaryOwnerShip} 
				variant="contained" color="primary">Ask Temporary OwnerShip</Button>
			</Grid>
			<Grid item xs={2} sx={{
				borderLeft: 1,
				borderColor: "#DCDCDC"
			}}>
				<Button sx={{
					textTransform: "none"
				}} onClick={showOwnerShip} variant="contained" color="secondary">SeeOwnerShipHistory</Button>
			</Grid>
			<Grid item xs={2} sx={{
				borderLeft: 1,
				borderColor: "#DCDCDC"
			}}>
				{ItemTempOwner === account && account !== ItemOwner ? <Button sx={{
					textTransform: "none"
				}} onClick={onTamperingDevice} variant="contained" color="secondary">Tamper Device</Button>:
				<Button sx={{
					textTransform: "none"
				}} onClick={onCheckingAuthencity} variant="contained" color="secondary">CheckDeviceAuthencity</Button>}
			</Grid>
		</Grid>
	)
}

export default EachItem;