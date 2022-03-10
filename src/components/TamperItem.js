import { Button, Grid, Typography } from "@mui/material";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";


const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const TamperItem = ({account, from, Id, revokeTamperItemOwnerShip}) => {
	const onUpdatingDevice = async() => {
		const response = await contract.methods.updateTheDeviceResponse(Id).send({
			from: account,
			gas: 3000000
		})
		console.log(response.events.outputString.returnValues.s);
	}
	const onRevokeTempOwnerShip = async() => {
		const response = await contract.methods.revokeOwnerShip(Id).send({
			from: account,
			gas: 3000000
		})
		const value = {
			"id": Id,
			"to": account,
		}
		revokeTamperItemOwnerShip(value)
	}

	return (
		<Grid container direction="row" sx={{
			margin: "5px"
		}}>
			<Grid item xs={12}>
				<Typography>Device {Id} Tampered from {from}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Button onClick={onUpdatingDevice} variant="outlined" color="success">Update Device</Button>
			</Grid>
			<Grid item xs={6}>
				<Button onClick={onRevokeTempOwnerShip} variant="outlined" color="error">Revoke Temp Ownership</Button>
			</Grid>
		</Grid>
	)
}

export default TamperItem;