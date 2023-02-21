const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")

describe("Token Creator", function () {
    let deployer
    const SUPPLY = "10000"

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        tokenCreatorFactory = await ethers.getContractFactory("TokenCreator")
        tokenCreator = await tokenCreatorFactory.deploy(SUPPLY, "Brenk Token", "BRE")
    })
    describe("Contract deployment", async function () {
        it("sends the correct amount of tokens to the deployer", async function () {
            const deployerBalance = (await tokenCreator.balanceOf(deployer)).toString()
            expect(deployerBalance).to.equal(SUPPLY)
        })
    })
})
