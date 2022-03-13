// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

import './IERC20.sol';
//0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f

contract ShelbyNft is ERC721{
    
    address admin;
    address titano;
    uint256 private Nft_Id;
    uint256 public totalSupply;
    uint256 mintPrice;
    string ipfsUri = "https://ipfs.io/ipfs/QmWVeRo6ctG8sKvFm2gxyNokXECDU7523Enn9sWrJjA8fA/";
    
    struct offer{
        address buyer;
        uint256 offer;
    }
            // ID   => price
    mapping(uint256 => uint256) forsale;  
    uint256 [] forSalelist;
    uint256 [] forSaleprices;
    mapping(uint256 => offer[]) offersMap;
    //mapping(uint256 => uint256) purchased; 

    //mapping(uint256 => mapping(address => uint256)) offers;
    mapping(address => bool) excludedList;

    IERC20 titanoContract;

    constructor() ERC721("Smart Peeps", "SIN"){
        Nft_Id = 1;
        totalSupply = Nft_Id;
        admin = msg.sender;
        mintPrice = 0.02 ether;
        titano = 0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f;
        titanoContract = IERC20(titano);
    }

    modifier adminOnly(){
        require(msg.sender == admin, "Only admin has access");
        _;
    }
    function airDropTitano(address recipient, uint256 amount) public adminOnly 
        {
        //check contract and reciepnt deposit
        titanoContract.approve(address(this), amount);
        titanoContract.transfer(recipient, amount);
        }

    function payOut(address employee, uint256 amount) public payable adminOnly(){
        require(amount <= address(this).balance, "payout exceeds balance");
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
                ipfsUri,
                Strings.toString(Nft_Id),
                ".json"
                )
            );
        }
    function nftsMinted() public view returns(uint256){
        return Nft_Id - 1;
    }
    
    function ReturnForsaleList() public view returns(uint256[] memory){
        return forSalelist;
    }

    function ReturnForsalePrices() public view returns(uint256[] memory){
        //return forSaleprices;
    }
    function ListSale(uint256 id, uint256 price) public {
        require(ownerOf(id) == msg.sender, "Only the owner can list");
        require(price > 0 ether, "Must add price");
        approve(address(this), id);
        //forSalelist.push() = id;
        //forSaleprices.push() = price;
        forsale[id] = price;
    }

    function RemoveSale(uint256 id) public {
        require(ownerOf(id) == msg.sender, "Only the owner can de-list");
        delete forsale[id];
    }
    //Buy Side
    function BuyNow(uint256 id) public payable{
        require(forsale[id] > 0 && msg.value >=  forsale[id], "must send >= buy now price");
        forsale[id] = 0;
        safeTransferFrom(ownerOf(id),msg.sender,id);
    }
}

    /*function MakeOffer(uint256 id) public payable{
        require(msg.value > 0 ether, "Must add price");
        require(forsale[id] > 0 && msg.value > 0.0, "must send >= buy now price");
        //build new offer
        offer memory newOffer;
        newOffer.buyer = msg.sender;
        newOffer.offer = msg.value;
        //push to mapped array
        offersMap[id].push() = newOffer;
    }
    function ViewOffers(uint256 id) public view returns(offer[] memory){
        require(forsale[id] > 0 ,"item not for sale");
        return offersMap[id];
    }*/
    /*function CollectRoyalty() public {
        require(balanceOf(msg.sender) > 0, "Only Collectors get a royalty payout");
        require(royaltiesList[msg.sender] != true, "You've already collected a royalty");
        royaltiesList[msg.sender] = true;
        uint256 ryt = address(this).balance * 2 / 100;
        ryt = ryt / nftsMinted(); 
        payable(msg.sender).transfer(ryt);
    }*/
