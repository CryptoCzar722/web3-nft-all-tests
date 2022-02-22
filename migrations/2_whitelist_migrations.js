let nftSibmWhitelist = artifacts.require("./nftSibmWhitelist.sol")

module.exports = function(deployer){
    deployer.deploy(nftSibmWhitelist);
};
