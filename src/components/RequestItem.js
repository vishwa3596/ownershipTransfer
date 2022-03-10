import { Button, Grid, Typography } from "@mui/material";
import Web3 from "web3";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);
const RequestItem = ({currentAccount, from, type, item, requestConfirm, requestDeclined}) => {
	const confirmRequest = async () => {
		// ownership transfer.
		const response = await contract.methods.askOwnerShip(parseInt(item), type).send({from: from, gas: 3000000});
		const value = {
			type: type,
			from: currentAccount,
			to: from,
			id: item,
		}
		requestConfirm(value);
	}

	const declineRequest = () => {
		// show to the to user that the request is cancelled.
		const value = {
			type: type,
			from: currentAccount,
			to: from,
			id: item,
		}
		requestDeclined(value);
	}
	return(
		<Grid container direction="row" justifyContent="flex-start" sx={{
			marginTop: "20px",
			alignContent: "center"
		}}>
			<Grid item xs={4}>
				<Typography>From - {from}</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography>{item}</Typography>
			</Grid>
			<Grid item xs={3}>
				{type === 1? <Typography>Permanent OwnerShip</Typography>: <Typography>Temporary OwnerShip</Typography>}
			</Grid>
			<Grid item xs={2}>
				<Button onClick={confirmRequest} variant="outlined" color="success" sx={{
					textTransform: "none",
					fontWeight: "600"
				}}>Confirm</Button>
			</Grid>
			<Grid item xs={2}>
				<Button onClick={declineRequest} variant="outlined" color="error" sx={{
					textTransform: "none",
					fontWeight: "600"
				}}>Decline</Button>	
			</Grid>
		</Grid>
	)
}

export default RequestItem;