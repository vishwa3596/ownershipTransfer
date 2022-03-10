import { Typography } from "@mui/material";
import { Box } from "@mui/system"

const Confirm = ({to, from, type, id}) => {
	return(
		<Box sx={{
			bgcolor: `rgba(144, 238, 144, 0.2)`,
			width: "100%",
			marginTop: "30px"
		}}>
			<Typography>
				Confirm
			</Typography>
			<p>{to}</p>
			<p>From - {from}</p>
			{type === 1 ? <Typography>You are now permanent Owner of {id}</Typography>:<Typography>You are now Temporary Owner of {id}</Typography>}
			<p>PdtId - {id}</p>
		</Box>
	)
}


export default Confirm;