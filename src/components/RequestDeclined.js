import { Box } from "@mui/material";
import Decline from "./Decline";

const RequestDeclined = ({account, requestArray}) => {
	let newArray = [];
	requestArray.forEach((e) => {
		if(e.to === account){
			newArray.push(e);
		} 
	})
	return (
		<Box>
			{newArray.length > 0 ? newArray.map((e) => 
			<Decline account={account} from={e.from} type={e.type} id={e.id} />)
			:<p></p>}
		</Box>
	)
}


export default RequestDeclined;