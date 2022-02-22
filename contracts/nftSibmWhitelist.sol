// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


contract WhitelistV2 {
    
    address public admin;
    //address payable[] whitelist;
    //address[] whitelist;
    mapping(uint256 => address) whitelist;
    uint256 public whiteListCount;
    uint256 whiteListMax;

    uint256 endDate;

    constructor() {
        admin = msg.sender;
        endDate = block.timestamp + 50 days;
        whiteListMax = 100;
        whiteListCount = 0;
    }
            //createNft
    function JoinWhitelist(address addr) public {
        //require(block.timestamp < endDate, "Whitelist has Closed"); 
        //require(whiteListCount < whiteListMax, "Whitelist ha reached capacity");
        if (MintuesLeft() > 0 && whiteListCount < whiteListMax)
            {
            whitelist[whiteListCount++] = addr;
            //whiteListCount++
            //whitelist.push(addr);
            }
    }
    
    function MintuesLeft() public view returns(uint256){
        if (endDate > block.timestamp)
            {
            return (endDate - block.timestamp) / 60;
            }
        return 0;
    }

    function WhiteListRank(address addr) public view returns(uint){
        for (uint i = 0; i < whiteListCount; i++)
            {   
            if (whitelist[i] == addr)
                {
                return i + 1;
                }
            }
        revert("Address not found");
    }
    
}