require("dotenv").config()
const fs = require("fs")
const { ethers } = require("hardhat")

//const frontEndContractsFile = "../frontend/constants/networkMapping.json"
const frontEndAbiLocation = "../frontend/src/constants/"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        // await updateContractAddresses()
        // await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const tokenCreator = await ethers.getContract("TokenCreator")
    console.log(tokenCreator)
    // fs.writeFileSync(
    //     `${frontEndAbiLocation}TokenCreator.json`,
    //     tokenCreator.interface.format(ethers.utils.FormatTypes.json)
    // )
}

// async function updateContractAddresses() {
//     const chainId = network.config.chainId.toString()
//     const nftMarketplace = await ethers.getContract("NftMarketplace")
//     const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
//     if (chainId in contractAddresses) {
//         if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
//             contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
//         }
//     } else {
//         contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
//     }
//     fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
//     fs.writeFileSync(frontEndContractsFile2, JSON.stringify(contractAddresses))
// }
module.exports.tags = ["all", "frontend"]
