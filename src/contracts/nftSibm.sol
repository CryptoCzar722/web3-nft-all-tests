// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

abstract contract nftSibm is ERC721URIStorage{
    uint256 public Nft_Id;
    
    address public admin;

    constructor() public ERC721("SIBM: Nfts","SIBM"){
        Nft_Id = 0;
    }

    function createNft(string memory tokenUri) public returns (uint256){
        uint256 newItem_Id = Nft_Id;
        _safeMint(msg.sender,newItem_Id);
        _setTokenURI(newItem_Id, tokenUri);
        Nft_Id++;
        return newItem_Id;
    }
    
}