import { Box } from "@mui/material";
import Web3 from "web3";
import Confirm from "./Confirm";
import { OWNERSHIP_ABI, OWNERSHIP_ADDRESS } from "../config";
const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
const contract = new web3.eth.Contract(OWNERSHIP_ABI, OWNERSHIP_ADDRESS);

const RequestConfim = ({account, requestArray}) => {
	let newArray = [];
	requestArray.forEach((e) => {
		if(e.to === account){
			newArray.push(e);
		} 
	})
	console.log(newArray);
	return(
		<Box>
			{newArray.length > 0 ? newArray.map((e, index) => <Confirm key = {index} to={e.to} from={e.from} type={e.type} id={e.id} />):<p></p>}
		</Box>
	)
}

export default RequestConfim;