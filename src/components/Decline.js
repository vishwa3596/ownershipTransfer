import { Typography } from "@mui/material";
import { Box } from "@mui/system"

const Decline = ({account, from, type, id}) => {
	return (
		<Box sx={{
			bgcolor: "#FFD580"
		}}>
			<Typography>Your request from {from} Declined on Item{id} for type {type}</Typography>
		</Box>
	)
}

export default Decline;