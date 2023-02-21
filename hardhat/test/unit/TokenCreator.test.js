const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")

describe("Token Creator", function () {
    let deployer

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        console.log(deployer)
        tokenCreatorFactory = await ethers.getContractFactory("TokenCreator")
        tokenCreator = await tokenCreatorFactory.deploy(10000, "Brenk Token", "BRE")
    })
    describe("constructor", async function () {
        it("sets the aggregator address correctly", async function () {
            console.log(`yeeeboiii`)
        })
    })
})
