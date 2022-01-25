// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzepplin/contracts/token/ERC721/ERC721.sol"

contract SibmNFT is ERC721{
    string public name = "SIBM: NFT Minter";

    event Mint(address indexed _to, uint256 indexed _tokenId, string _ipfsHash);
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    mapping(uint256 => address) internal idToOwner;
    address admin;

    mapping(address => string) public OwnerToHash;
    uint256 public nftCounter = 0;
    //
    //mapping(address => address) internal forSaleByowner;
    //mapping(uint256 => uint256) internal PurchaseOffer;
    constructor(){
        admin = msg.sender;
    }

    function mint(string memory _ipfsHash) public payable {
        //require(msg.value >= 0.001 ether, "Minting Costs 0.001 bnb");
        //payable(admin).transfer(msg.value);
        uint256 tokenId = nftCounter;
        idToOwner[tokenId] = msg.sender;
        OwnerToHash[msg.sender] = _ipfsHash;
        nftCounter++;
        emit Mint(msg.sender, tokenId, _ipfsHash);
    }

    function transfer(address _to, uint256 _tokenId) public {
        require(msg.sender == idToOwner[_tokenId]);
        idToOwner[_tokenId] = _to;
        emit Transfer(msg.sender, _to, _tokenId);
    }
}

