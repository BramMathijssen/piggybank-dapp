require("dotenv").config()
const fs = require("fs")
const { ethers } = require("hardhat")

const frontEndContractsFile = "../frontend/src/constants/contractAddresses.json"
const frontEndAbiLocation = "../frontend/src/constants/"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const tokenCreator = await ethers.getContract("ParentContract")
    console.log(tokenCreator)
    fs.writeFileSync(`${frontEndAbiLocation}parentContract.abi.json`, tokenCreator.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const parentContract = await ethers.getContract("ParentContract")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["ParentContract"].includes(parentContract.address)) {
            contractAddresses[chainId]["ParentContract"].push(parentContract.address)
        }
    } else {
        contractAddresses[chainId] = { ParentContract: [parentContract.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
