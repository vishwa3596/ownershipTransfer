// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract A{

    struct Item{
        uint publicID;
        address owner;
        uint ownershipType;
        address[] pastowners;
        address tempOwner;
        // challenge and response for per device and a random number which helps us to map the challenge with response.
        uint[] challenge;
        // hardware response when the device is first challenged.
        uint[] hardwareResponse;
        // mapping of response here it will be challenge*hardwareResponse;
        uint[] Deviceresponse;
        // temp hardware Response. 
        uint[] tempHardwareResponse;
        // how the check will be monitored.
        // deviceResponse[i] = tempHardwareResponse[i] * challenge[i];
        // if deviceResponse[i] is not equal then there is option to accept the device or just update it. hardwareResponse[i] = tempHardwareResponse[i];
    }
    
    mapping(uint => Item) public Items;
    
    uint [] ItemsArray;
    event changedOwnership(address _to, address _from, uint ownershipType);
    event shiftBetweenOwner(address _to, address _from);
    event AllItems(uint [] items);
    event getCurrentOwner(address owner);
    event pastOwners(address [] pastOwners);
    event outputString(string s);

    function createItem(uint  _ownershipType, uint _id, uint[] memory challenge, uint[] memory hardwareResponse) public  {
        Items[_id].publicID = _id;
        Items[_id].owner = msg.sender;
        Items[_id].tempOwner = msg.sender;
        Items[_id].ownershipType=_ownershipType;
        Items[_id].pastowners.push(msg.sender);
        Items[_id].challenge = challenge;
        Items[_id].hardwareResponse = hardwareResponse;
        Items[_id].tempHardwareResponse = hardwareResponse;
        uint len = challenge.length;
        for(uint i=0;i<len;i++) {
            uint val = Items[_id].challenge[i]*Items[_id].hardwareResponse[i];
            Items[_id].Deviceresponse.push(val);
        }
        ItemsArray.push(_id);
        emit AllItems(ItemsArray);
    }
    
    function get(uint _id) private view returns (address , uint){
        Item storage item = Items[_id];
        return (item.owner, item.ownershipType);
    }
    
    function getOwner(uint _idItem) public returns (address){
        emit getCurrentOwner(Items[_idItem].owner);
        return(Items[_idItem].owner);
    }

    function getTempOwner(uint _idItem) public {
        emit getCurrentOwner(Items[_idItem].tempOwner);
    }
    
    function shiftOwnership(uint _idx, address _newOwner, uint _ownershipType) private {
        Item storage item = Items[_idx];
        address _to = item.owner;
        if(_ownershipType == 1) {
            item.owner = _newOwner;
            item.tempOwner = _newOwner;
            item.ownershipType = _ownershipType;
        }
        if(_ownershipType == 0) {
            item.tempOwner = _newOwner;
        }
        item.pastowners.push(_newOwner);
        emit changedOwnership(_to, _newOwner, _ownershipType);
    }
    
    function askOwnerShip(uint _idx, uint _ownershipType) public {
        emit shiftBetweenOwner(getOwner(_idx), msg.sender);
        require(getOwner(_idx) != msg.sender, "You only are the owner");
        shiftOwnership(_idx, msg.sender, _ownershipType);
    }

    function publicView(uint _id) public view returns (address, uint){
        return (Items[_id].owner, Items[_id].ownershipType);
    }

    function showOwnerShipHistory(uint _idx) public{
       emit pastOwners(Items[_idx].pastowners);
    }

    function getItems()public{
        emit AllItems(ItemsArray);
    }
    function Deviceresponse(uint id) public {
        emit AllItems(Items[id].Deviceresponse);
    }

    function tamperWithDevice(uint id, uint[] memory tempHardwareResponse) public {
        Items[id].tempHardwareResponse = tempHardwareResponse;
    }

    function checkDeviceTamper(uint id) public {
        if(msg.sender != Items[id].owner) {
            emit outputString("You cannot check this you don't have ownership right");
        }
        else {
            checkIfDeviceIsNotAltered(id);
        }
    }

    function checkIfDeviceIsNotAltered(uint id) private {
        uint len = Items[id].challenge.length;
        uint flag = 0;
        for(uint i=0;i<len;i++) {
            if(Items[id].Deviceresponse[i] != (Items[id].tempHardwareResponse[i]*Items[id].challenge[i])) {
                flag = 1;
            }
        }
        if(flag == 1) {
            emit outputString("Device is Tampered");
        }
        else {
            emit outputString("Device is Not Tampered");
        }
    }

    function updateTheDeviceResponse(uint id) public {
        Items[id].hardwareResponse = Items[id].tempHardwareResponse;
        uint len = Items[id].challenge.length;

        for(uint i=0;i<len;i++) {
            Items[id].Deviceresponse[i] = Items[id].hardwareResponse[i]*Items[id].challenge[i];
        }
        emit outputString("Device Status Updated");
    }

    function revokeOwnerShip(uint id) public {
        Items[id].tempOwner = Items[id].owner;
        emit outputString("TempOwnerShip revoked");
    }
}