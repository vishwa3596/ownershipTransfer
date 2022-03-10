import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";


const CreateItem = ({createItem}) => {
	const [pdtId, changePdtId] = useState(0);
	
	const onChangingPdtId = (e) => {
		e.preventDefault();
		changePdtId(e.target.value);
	}
	const onCreatingItem = (e) => {
		console.log(pdtId, 1);
		createItem(pdtId, 1);
	}
	return (
		<Grid container direction="row" sx={{
			justifyContent: "center",
			alignItems: "center"
		}}>
			<Grid item xs={12} sx={{
				marginTop: "5px"
			}}>
				<Typography sx={{
					textTransform: "none",
					fontWeight: "600"
				}}>
					CreateItem
				</Typography>
			</Grid>
			<Grid item xs={12} sx={{
				marginTop: "5px"
			}}>
				<TextField onChange={onChangingPdtId} id="outlined-basic" label="PdtId" variant="outlined" />
			</Grid>
			{/* <Grid item xs={12} sx={{
				marginTop: "5px"
			}}>
				<TextField onChange={onChangingOwnerShipType} id="outlined-basic" label="ownerShipType" variant="outlined" />
			</Grid> */}
			<Grid item xs={12} sx={{
				marginTop: "5px"
			}}>
				<Button variant="contained" onClick={onCreatingItem} sx={{
					textTransform: "none"
				}}> Create </Button>
			</Grid>
		</Grid>
	)
}

export default CreateItem;