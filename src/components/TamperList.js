import { Box } from "@mui/material"
import TamperItem from "./TamperItem"

const TamperList = ({account, deviceTamperList, onRevokingTempOwnerShip}) => {
	let newArray = []
	deviceTamperList.forEach((e) => {
		if(e.to === account) {
			newArray = [...newArray, e]
		}
	})

	const revokeTamperItemOwnerShip = (value) => {
		onRevokingTempOwnerShip(value);
	}

	return (
		<Box>
			{newArray.length > 0 ? newArray.map((e,index) => 
			<TamperItem revokeTamperItemOwnerShip={revokeTamperItemOwnerShip} key={index} account={account} from={e.from} Id={e.id}/>) : <></>}
		</Box>
	)
}

export default TamperList;