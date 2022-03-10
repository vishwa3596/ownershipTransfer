import { Grid } from "@mui/material";
import RequestItem from "./RequestItem";

const Request = ({account, requestArray, confirmingRequest, declineRequest}) => {
	let newArray = [];
	requestArray.forEach((e) => {
		if(e.to === account){
			newArray.push(e);
		} 
	})
	const requestConfirm=(value)=>{
		confirmingRequest(value);
	}
	const requestDeclined = (value) => {
		declineRequest(value);
	}
	return (
		<Grid container direction="row">
			{newArray.length>0 ? newArray.map((e, index)  => <RequestItem 
			key={index}
			requestConfirm={requestConfirm}
			requestDeclined={requestDeclined}
			currentAccount = {account} 
			from={e.from} 
			type={e.type} 
			item={e.id}
			/>):<></>}
		</Grid>
	)
}

export default Request;