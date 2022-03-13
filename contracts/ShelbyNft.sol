// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
//import './IERC20.sol';

contract ShelbyNft is ERC721{
    
    address admin;
    //change to generic and give string for name
    //address public autoStakingAddress;
    //string  public autoStakingName;
    uint256 public Nft_Id;
    uint256 public forsale_Count;
    uint256 public sold_Count;
    uint256 public totalSupply;
    uint256 public mintPrice;
    
    struct offer{
        address buyer;
        uint256 offer;
    }

    struct sale{
        uint256 nft_id;
        uint256 price;
    }
            // ID   => price
    //mapping(uint256 => uint256) forsale2; 
    //forsale(sold)_id {nft_id : "uint256" , price : "uint256"}
    mapping(uint256 => sale) public forsale;
    mapping(uint256 => sale) public sold;
    //nft_id {forsale_id : "uint256"}
    mapping(uint256 => uint256) public forsaleIdtracker;

    //IERC20 autoStakingContract;

    constructor() ERC721("Smart Peeps", "SIN"){
        Nft_Id          = 1;
        totalSupply     = Nft_Id;
        forsale_Count   = 0;
        sold_Count      = 0; 
        admin           = msg.sender;
        mintPrice       = 0.02 ether;
        
        //auto-staking utility  -> first run titano
        //autoStakingName = "Titano";
        //autoStakingAddress  = 0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f;
        //autoStakingContract = IERC20(autoStakingAddress);
    }

    modifier adminOnly(){
        require(msg.sender == admin, "Only admin has access");
        _;
    }
    
    //bnb payout
    function payOut(address employee, uint256 amount) public payable adminOnly(){
        require(amount <= address(this).balance, "payout exceeds balance");
        payable(employee).transfer(amount);
    }
            //createNft
    function mintNft() public payable returns (uint256){
        require(msg.value >=  mintPrice, "Not enough BNB. Minting Costs 0.02 BNB");
        require(Nft_Id < 1001, "MINT SOLD OUT");
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
    
    function ReturnForsaleList() public view returns(uint256[] memory){
        //return forSalelist;
    }

    function ReturnForsalePrices() public view returns(uint256[] memory){
        //return forSaleprices;
    }

    function ListSale(uint256 id, uint256 price) public {
        require(ownerOf(id) == msg.sender, "Only the owner can list");
        require(price > 0 ether, "Must add price");
        require(forsale[forsaleIdtracker[id]].nft_id == id, "item already listed");
        approve(address(this), id);

        sale memory newList;
        newList.nft_id = id;
        newList.price = price;
        forsale_Count++;
        forsale[forsale_Count] = newList;
        forsaleIdtracker[id] = forsale_Count;
    }
    function RemoveSale(uint256 id) public {
        require(ownerOf(id) == msg.sender, "Only the owner can de-list");
        require(forsale[forsaleIdtracker[id]].nft_id != id, "item not listed");
        delete forsale[forsaleIdtracker[id]];
        delete forsaleIdtracker[id];
        forsale_Count--;
    }
    //Buy Side
    function BuyNow(uint256 id) public payable{
        require(forsale[forsaleIdtracker[id]].nft_id == id && msg.value >= forsale[forsaleIdtracker[id]].price, "must send >= buy now price");
        sale memory newPurchase;
        newPurchase.nft_id = id;
        newPurchase.price = msg.value;
        sold_Count++;
        sold[sold_Count] = newPurchase;
        //////////////////////////////////////
        delete forsale[forsaleIdtracker[id]];
        delete forsaleIdtracker[id];
        forsale_Count--;
        //transfer is pre-approved
        //payment 98%
        payable(ownerOf(id)).transfer(msg.value * 98 / 100);
        safeTransferFrom(ownerOf(id),msg.sender,id);
    }
}


/*
function AutoStakingPayment(address recipient, uint256 amount) public adminOnly 
        {
        //check contract and reciepnt deposit
        autoStakingContract.approve(address(this), amount);
        autoStakingContract.transfer(recipient, amount);
        }
    function AutoStakingChangeToken(address contractAddress, string calldata name) public adminOnly 
        {
        autoStakingName = name;
        autoStakingAddress = contractAddress;
        autoStakingContract = IERC20(autoStakingAddress);
        } 


*/