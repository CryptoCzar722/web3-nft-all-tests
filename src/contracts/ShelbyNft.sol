// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract ShelbyNft is ERC721{
    
    uint256 private Nft_Id;
    uint256 public totalSupply;
    address public admin;

    constructor() ERC721("Smart Peeps", "SIN"){
        Nft_Id = 1;
        totalSupply = Nft_Id;
        admin = msg.sender;
    }
            //createNft
    function mintNft() public payable returns (uint256){
        require(Nft_Id < 999, "MINT SOLD OUT");
        require(msg.value >= 0.015 ether, "Not enough BNB. Minting Costs 0.015 BNB");
        payable(admin).transfer(msg.value * 15 / 100);
        totalSupply = Nft_Id;
        _mint(msg.sender,Nft_Id++);
        return Nft_Id;
    }

    function tokenURI(uint256 _tokenId) override public pure returns(string memory)
        {
        return string
            (
            abi.encodePacked
                (
                "https://ipfs.io/ipfs/QmWVeRo6ctG8sKvFm2gxyNokXECDU7523Enn9sWrJjA8fA/",
                Strings.toString(_tokenId),
                ".json"
                )
            );
        }
}