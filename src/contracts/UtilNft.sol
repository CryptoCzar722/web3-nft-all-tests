// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract ShelbyNft is ERC721{
    
    uint256 private Nft_Id;
    uint256 public totalSupply;
    uint256 txFeeAmount;
    address txFeeToken;
    address admin;
    mapping(address => bool) excludedList;


    constructor() ERC721("Smart Peeps", "SIN"){
        Nft_Id = 1;
        totalSupply = Nft_Id;
        admin = msg.sender;
    }
            //createNft
    function mintNft() public payable returns (uint256){
        require(Nft_Id < 1001, "MINT SOLD OUT");
        require(msg.value >= 0.02 ether, "Not enough BNB. Minting Costs 0.02 BNB");
        payable(admin).transfer(msg.value * 40 / 100);
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
    function payout(address recipient, uint256 amount) public {
        require(msg.sender == admin, "Omly admin can give payouts");
        require(amount <= address(this).balance, "Omly admin can give payouts");
        IERC20 token = IERC20(txFeeToken);
        token.approve(address(this), amount);
        token.transfer(recipient, amount);
        }

    function transferFrom(address from, address to, uint256 tokenId) public override{
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: not approved or not owner" );
        if (excludedList[from] == false){
            _payTxFee(from);
        }
        _transfer(from, to , tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override{
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: not approved or not owner" );
        if (excludedList[from] == false){
            _payTxFee(from);
        }
        safeTransferFrom(from, to , tokenId, '');
    }
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override{
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: not approved or not owner" );
        if (excludedList[from] == false){
            _payTxFee(from);
        }
        safeTransferFrom(from, to , tokenId, data);
    }

    function _payTxFee(address from) internal {
        IERC20 token = IERC20(txFeeToken);
        token.transferFrom(from, admin, txFeeAmount);
    }
}