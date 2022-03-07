var NFT = artifact.require("ShelbyNft");

contract('ShelbyNft', function(){
    it("Chrck Nft_Id is == 1", function(){
        return NFT.deployed().then(function(instance){
            return instance.Nft_Id.call();
        }).then(function(Nft_Id){
            assertIdValue.equal(Nft_Id,1,"first NFT should be indexed");
        })
    });

});