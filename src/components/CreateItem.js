import { useState } from "react";

const CreateItem = ({createItem}) => {
	const [pdtId, changePdtId] = useState(0);
	const [ownerShipType, changeType] = useState(1);
	const onChangingOwnerShipType=(e) => {
		e.preventDefault();
		changeType(e.target.value);
	}
	const onChangingPdtId = (e) => {
		e.preventDefault();
		changePdtId(e.target.value);
	}
	const onCreatingItem = (e) => {
		console.log(pdtId, ownerShipType);
		createItem(pdtId, ownerShipType);
	}
	return (
		<div>
			<p>CreateIem</p>
			<input placeholder="Enter the pdtId" onChange={onChangingPdtId}/>
			<input placeholder="Enter the ownerShipType" onChange={onChangingOwnerShipType}/>
			<button onClick={onCreatingItem}> Create </button>
		</div>
	)
}

export default CreateItem;