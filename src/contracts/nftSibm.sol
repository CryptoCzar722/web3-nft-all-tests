// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract nftSibm is ERC721URIStorage{
    uint256 public Nft_Id;
    
    address public admin;
    mapping (uint256 => mapping(address => uint256)) internal nftsFsBo; //for sale by owner
    mapping (uint256 => mapping(address => uint256)) internal nftsObU;  // offer by users

    uint256 daysLeft;

    struct NftOrderBook {     
        //for sale
        uint256 nftId;
        uint256 price;
        address owner;
        //
    }

    NftOrderBook[] internal orderBook;

    constructor() ERC721URIStorage() ERC721("SIBM: NFT Mint", "SIBM"){
        Nft_Id = 0;
        admin = msg.sender;
        daysLeft = block.timestamp + 50 days;
    }
            //createNft
    function mintNft(string memory tokenUri) public returns (uint256){
        //require(msg.value >= 0.001 ether, "Minting Costs 0.001 bnb");
        //payable(admin).transfer(msg.value);
        uint256 newItem_Id = Nft_Id;
        _safeMint(msg.sender,newItem_Id);
        _setTokenURI(newItem_Id, tokenUri);
        Nft_Id++;
        return newItem_Id;
    }
    
    function mintDays() public view returns(uint256){
        return daysLeft;
    }

    function ListNftForSale(uint256 Id, uint256 price) public returns (uint256){
        require(msg.sender == ownerOf(Id), "You must own an NFT to list");
       // require(nftsFsBo[Id] != msg.sender, "NFT already listed");
       // nftsFsBo[Id] = msg.sender;
         nftsFsBo[Id][msg.sender] = price;
        return 1;
    }

    function RemoveNftSale(uint256 Id) public returns (uint256){
        address owner = ownerOf(Id);
        require(msg.sender == owner, "You must own an NFT to list");
       // require(nftsFsBo[Id] == msg.sender, "NFT NOT listed");
        delete nftsFsBo[Id][owner];
        return 1;
    }
    
}