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
        bool returnInProgress;
        uint256 nft_id;
        uint256 offer;
        uint offerTime;
        address buyer;
    }

    struct sale{
        uint256 nft_id;
        uint256 price;
        uint listTime;
        address owner;
    }
            // ID   => price
    //mapping(uint256 => uint256) forsale2; 
    //forsale_id {nft_id : "uint256" , price : "uint256"}
    mapping(uint256 => sale) public forsale;
    mapping(uint256 => offer) public sold;
    //nft_id {offer : [offer0,offer1,offer2,...,...,...]}
    mapping(uint256 => offer[]) public offerList;
    //nft_id {forsale_id : "uint256"}
    mapping(uint256 => uint256) public forsaleIdtracker;

    //IERC20 autoStakingContract;

    constructor() ERC721("Smart Peeps NFT", "SPN"){
        Nft_Id          = 1;
        totalSupply     = Nft_Id;
        forsale_Count   = 0;
        sold_Count      = 0; 
        admin           = msg.sender;
        mintPrice       = 0.02 ether;
        //auto-staking utility  -> token has get/set function
        //autoStakingName = "Titano";
        //autoStakingAddress  = 0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f;
        //autoStakingContract = IERC20(autoStakingAddress);
    }

    modifier adminOnly(){
        require(msg.sender == admin, "Only admin has access");
        _;
    }
    //bnb payout
    function payOut(address employee, uint256 value) public adminOnly(){
        require(value <= address(this).balance, "payout exceeds balance");
        payable(employee).transfer(value);
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

    function ListSale(uint256 id, uint256 price) public {
        require(ownerOf(id) == msg.sender, "Only the owner can list");
        require(price > 0 ether, "Must add price");
        //may be fixed ... but broken
        require(forsale[forsaleIdtracker[id]].nft_id != id, "item already listed");
        sale memory newList;
        newList.nft_id = id;
        newList.price = price;
        newList.owner = msg.sender;
        newList.listTime = block.timestamp;
        forsale_Count++;
        forsale[forsale_Count] = newList;
        forsaleIdtracker[id] = forsale_Count;
    }

    function RemoveSale(uint256 id) public {
        require(ownerOf(id) == msg.sender, "Only the owner can de-list");
        delete forsale[forsaleIdtracker[id]];
        delete forsaleIdtracker[id];
    }
    
    //Buy Side
    function AcceptOffer(uint256 id, uint256 offerId) public payable {
        require(ownerOf(id) == msg.sender, "Only the owner can accept offer");
        require(forsale[forsaleIdtracker[id]].nft_id == id , "Item not for sale");
        require(offerList[id][offerId].nft_id == id, "Id's do no show a valid offer");
        //delete forsale
        delete forsale[forsaleIdtracker[id]];
        delete forsaleIdtracker[id];
        //list as sold
        sold_Count++;
        sold[sold_Count] = offerList[id][offerId];
        //delete offer
        delete offerList[id][offerId];
        //payment 98%
        payable(msg.sender).transfer(sold[sold_Count].offer);
        safeTransferFrom(msg.sender,sold[sold_Count].buyer,id);
    }

    function MakeOffer(uint256 id) public payable{
        require(forsale[forsaleIdtracker[id]].nft_id == id && forsale[forsaleIdtracker[id]].price != 0, "NFT not for sale");
        require(msg.value > 0 ether, "Must add price");
        offer memory newOffer;
        newOffer.nft_id = id;
        newOffer.offer = msg.value;
        newOffer.buyer = msg.sender;
        newOffer.offerTime = block.timestamp;
        offerList[id].push() = newOffer;
    }

    function WithDrawMakeOffer(uint256 id, uint256 offerId) public payable{
        require(offerList[id][offerId].buyer == msg.sender, "You did not make an offer");
        require(offerList[id][offerId].returnInProgress == false,"return is in progress..");
        offerList[id][offerId].returnInProgress = true;
        //delete offer
        payable(msg.sender).transfer(offerList[id][offerId].offer);
        delete offerList[id][offerId];
        offerList[id][offerId].returnInProgress = false;
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