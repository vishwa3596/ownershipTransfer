// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract A{
    struct Item{
        uint id;
        address owner;
        uint ownershipType;
    }
    
    mapping(uint => Item) Items;
    event changedOwnership(address _to, address _from, uint ownershipType);
    
    function createItem(uint  _id, address _owner, uint  _ownershipType) private {
        Items[_id] = Item(_id, _owner, _ownershipType);
    }
    
    function get(uint _id) private view returns (address , uint){
        Item storage item = Items[_id];
        return (item.owner, item.ownershipType);
    }
    
    function getOwner(uint _idItem) private view returns (address){
        return(Items[_idItem].owner);
    }
    
    function shiftOwnership(uint _idx, address _newOwner, uint _ownershipType) private {
        Item storage item = Items[_idx];
        address _to = item.owner;
        item.owner = _newOwner;
        item.ownershipType = _ownershipType;
        emit changedOwnership(_to, _newOwner, _ownershipType);
    }
    
    function askOwnerShip(uint _idx, address _newOwner, uint _ownershipType) public {
        require(getOwner(_idx) != _newOwner, "You only are the owner");
        shiftOwnership(_idx, _newOwner, _ownershipType);
    }
}
