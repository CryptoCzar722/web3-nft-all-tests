// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract ShelbyNft is ERC721{
    
    address admin;
    uint256 private Nft_Id;
    uint256 public totalSupply;
    uint256 mintPrice;
    mapping(address => bool) royaltiesList;

    constructor() ERC721("Smart Peeps", "SIN"){
        Nft_Id = 1;
        totalSupply = Nft_Id;
        admin = msg.sender;
        mintPrice = 0.02 ether;
    }

    modifier adminOnly(){
        require(msg.sender == admin, "Only admin has access");
        _;
    }

    function payOut(address employee, uint256 amount) public payable adminOnly(){
        require(amount < address(this).balance, "payout exceeds balance");
        payable(employee).transfer(amount);
    }

    function clearRoyalty(address owner) public adminOnly(){
        royaltiesList[owner] = false;
    }
            //createNft
    function mintNft() public payable returns (uint256){
        require(Nft_Id < 1001, "MINT SOLD OUT");
        require(msg.value >=  mintPrice, "Not enough BNB. Minting Costs 0.02 BNB");
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

    function tokenURINextMint() public view returns(string memory)
        {
        return string
            (
            abi.encodePacked
                (
                "https://ipfs.io/ipfs/QmWVeRo6ctG8sKvFm2gxyNokXECDU7523Enn9sWrJjA8fA/",
                Strings.toString(Nft_Id),
                ".json"
                )
            );
        }
    function nftsMinted() public view returns(uint256){
        return Nft_Id - 1;
    }

    function CollectRoyalty() public {
        require(balanceOf(msg.sender) > 0, "Only Collectors get a royalty payout");
        require(royaltiesList[msg.sender] != true, "You've already collected a royalty");
        royaltiesList[msg.sender] = true;
        uint256 ryt = address(this).balance * 2 / 100;
        ryt = ryt / nftsMinted(); 
        payable(msg.sender).transfer(ryt);
    }

}