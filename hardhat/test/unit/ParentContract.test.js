const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const helpers = require("@nomicfoundation/hardhat-network-helpers")

const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { weeks } = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time/duration")

// TO TEST
// Testing if PURE functions function correctly
// 1. calculateClaimableAmount should return the correct claimable amount based on the input
//    - test for input of daily with input of 100
//    - test for input of weekly with input of 100
//    - test for input of monthly with input of 100
// 2. TO DO: if/else function for inputing claimperiod and setting the next claim period accordingly
//    -
// Parent Tests
// 1. Creating a new token
//    - Test if the total supply is sent to the parent contract
//    - Test if the parent is added to the mapping of parent -> token
//    - Test if it is possible to mint multiple tokens and these are all stored to it's mapping
// 2. Adding a child
//  + before each needs a minted token
//    - Test if a parent can create a new child with a token it hasn't minted
//    - Test if a child is added to the parentToChildMappingNested with the input given as arguments
//    - Test if a child is added to the parentToChildMappingNested with the correct: nextclaimperiod + nextclaimamount
//    - Test if it's possible for a parent to hold multiple children
//    - Test if the child is added to the childToParentMapping
// Child Tests
// 1. Claiming Tokens
//    -
//    -
//    -
//    -
//    -
// 2. Test the setter functions which set the childs claim moment daily, weekly, monthly

describe("Parent Contract", function () {
    let deployer, parent, parent2, child, child2, parentContract, parentConnectedContract, parent2ConnectedContract, childConnectedContract, tokenCreatorContract
    const ONE_DAY_UNIX = 86400 // 1 day in UNIX time (seconds)
    const ONE_WEEK_UNIX = 604800 // 1 week in UNIX time (seconds)
    const ONE_MONTH_UNIX= 2419200 // 4 weeks in UNIX time (seconds)


    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["parentcontract"])
        parentContract = await ethers.getContract("ParentContract")
    })
    describe("Pure Functions", async function () {
        const BASE_AMOUNT = 10000
        const EXPECTED_RESULT_DAILY = 1285
        const EXPECTED_RESULT_MONTHLY = 44000
        describe("calculateClaimableAmount", async function () {
            it("for a daily claim period return the correct claimable amount", async function () {
                const claimableAmount = (await parentContract.calculateClaimableAmount(BASE_AMOUNT, 0)).toString()

                expect(claimableAmount).to.equal(EXPECTED_RESULT_DAILY.toString())
            })
            it("for a weekly claim period return the correct claimable amount", async function () {
                const claimableAmount = (await parentContract.calculateClaimableAmount(BASE_AMOUNT, 1)).toString()

                expect(claimableAmount).to.equal(BASE_AMOUNT.toString())
            })
            it("for a monthly claim period return the correct claimable amount", async function () {
                const claimableAmount = (await parentContract.calculateClaimableAmount(BASE_AMOUNT, 2)).toString()

                expect(claimableAmount).to.equal(EXPECTED_RESULT_MONTHLY.toString())
            })
        })
    })
    describe("Parent Functions", async function () {
        let tokenAddress
        const TOKEN_NAME = "Test Token"
        const TOKEN_SYMBOL = "TT"
        const TOTAL_SUPPLY = ethers.utils.parseEther("1000") // = 1000000000000000000000 wei
        const CHILD_NAME = "Bram"
        const TOKEN_PREFERENCE = tokenAddress
        const BASE_AMOUNT = ethers.utils.parseEther("1")

        beforeEach(async () => {
            parent = (await getNamedAccounts()).parent
            parent2 = (await getNamedAccounts()).parent2
            child = (await getNamedAccounts()).child
            child2 = (await getNamedAccounts()).child2

            parentConnectedContract = await ethers.getContract("ParentContract", parent)
            parent2ConnectedContract = await ethers.getContract("ParentContract", parent2)
            childConnectedContract = await ethers.getContract("ParentContract", child)

            const tx = await parentConnectedContract.createNewToken(TOTAL_SUPPLY, TOKEN_NAME, TOKEN_SYMBOL)
            const receipt = await tx.wait(1)
            tokenAddress = receipt.events[0].address
            tokenCreatorContract = await ethers.getContractAt("TokenCreator", tokenAddress)
        })
        describe("createNewToken", async function () {
            it("after creating a new token transfers the total amount to the parentContract", async function () {
                const parentContractBalance = await tokenCreatorContract.balanceOf(parentContract.address)

                // checks if the total supply of the newly created token is transfered to the parentContract
                expect(parentContractBalance).to.equal(TOTAL_SUPPLY)
            })
            it("parent's address is mapped to the token address after having created it", async function () {
                const tokenFromMapping = await parentConnectedContract.parentToTokensMapping(parent, 0)

                expect(tokenFromMapping.tokenAddress).to.equal(tokenAddress)
            })
            it("parent's address is able to hold multiple tokens in it's mapping", async function () {
                const tx = await parentConnectedContract.createNewToken(TOTAL_SUPPLY, "TOKEN2", "T2")
                const receipt = await tx.wait(1)
                const tokenAddress2 = receipt.events[0].address

                const tokenFromMapping1 = await parentConnectedContract.parentToTokensMapping(parent, 0)
                const tokenFromMapping2 = await parentConnectedContract.parentToTokensMapping(parent, 1)

                expect(tokenFromMapping1.tokenAddress).to.equal(tokenAddress)
                expect(tokenFromMapping2.tokenAddress).to.equal(tokenAddress2)
            })
        })
        describe("addChild", async function () {
            it("reverts if a parent creates a new child with a token it hasn't minted", async function () {
                const tx = await parent2ConnectedContract.createNewToken(TOTAL_SUPPLY, TOKEN_NAME, TOKEN_SYMBOL)
                const receipt = await tx.wait(1)
                const tokenAddress2 = receipt.events[0].address

                // reverts if the parent tries to add a child with a token which has been minted by parent2
                await expect(parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress2, BASE_AMOUNT)).to.be.revertedWith(`NotOwnerOfToken`)
            })
            it("Test if a child is added to the parentToChildMappingNested with the input given as arguments", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)

                const createdChild = await parentConnectedContract.parentToChildMappingNested(parent, child)

                expect(createdChild.name).to.equal(CHILD_NAME)
                expect(createdChild.childAddress).to.equal(child)
                expect(createdChild.tokenPreference).to.equal(tokenAddress)
                expect(createdChild.baseAmount).to.equal(BASE_AMOUNT)
            })
            it("Test if a child is added to the parentToChildMappingNested with the correct: nextclaimperiod + nextclaimamount", async function () {
                // todo
            })
            it("Test if it's possible for a parent to hold multiple children", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
                await parentConnectedContract.addChild(CHILD_NAME, child2, tokenAddress, BASE_AMOUNT)

                const createdChild = await parentConnectedContract.parentToChildMappingNested(parent, child)
                const createdChild2 = await parentConnectedContract.parentToChildMappingNested(parent, child2)

                expect(createdChild.childAddress).to.equal(child)
                expect(createdChild2.childAddress).to.equal(child2)
            })
            it("Test if the child is added to the childToParentMapping", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
                const parentsChild = await parentConnectedContract.childToParentMapping(child)

                expect(parentsChild).to.equal(parent)
            })
            it("should have a default claim period of 1 week after adding", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
                const [nextClaimPeriod, claimPeriod] = await childConnectedContract.getChildsNextClaimPeriod()

                const timestamp = parseInt(await helpers.time.latest())

                // checks if the result is close to the expected result with a maximum difference of 5 (seconds)
                expect(nextClaimPeriod.toNumber()).to.closeTo(timestamp + ONE_WEEK_UNIX, 5)
                // 1 means the second spot in the enum ClaimPeriod = WEEKLY
                expect(claimPeriod).to.equal(1)
            })
        })
    })
    describe("Child Functions", async function () {
        let tokenAddress, createdChild
        const TOKEN_NAME = "Test Token"
        const TOKEN_SYMBOL = "TT"
        const TOTAL_SUPPLY = ethers.utils.parseEther("1000") // = 1000000000000000000000 wei
        const CHILD_NAME = "Bram"
        const TOKEN_PREFERENCE = tokenAddress
        const BASE_AMOUNT = ethers.utils.parseEther("1")
        beforeEach(async () => {
            parent = (await getNamedAccounts()).parent
            parent2 = (await getNamedAccounts()).parent2
            child = (await getNamedAccounts()).child
            child2 = (await getNamedAccounts()).child2

            parentConnectedContract = await ethers.getContract("ParentContract", parent)
            parent2ConnectedContract = await ethers.getContract("ParentContract", parent2)
            childConnectedContract = await ethers.getContract("ParentContract", child)

            const tx = await parentConnectedContract.createNewToken(TOTAL_SUPPLY, TOKEN_NAME, TOKEN_SYMBOL)
            const receipt = await tx.wait(1)
            tokenAddress = receipt.events[0].address
            tokenCreatorContract = await ethers.getContractAt("TokenCreator", tokenAddress)

            await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
            createdChild = await parentConnectedContract.parentToChildMappingNested(parent, child)
        })
        describe("claim", async function () {
            it("reverts when trying to claim when nextClaimPeriod hasn't been reached", async function () {
                await helpers.time.increase(ONE_DAY_UNIX)

                await expect(childConnectedContract.claim(tokenAddress, tokenAddress)).to.revertedWith("Sorry your claim period is not valid")
            })
            it("reverts when trying to claim a token which isn't owned by their parent", async function () {
                // mint a token by a parent which isn't the child's parent
                const tx = await parent2ConnectedContract.createNewToken(TOTAL_SUPPLY, TOKEN_NAME, TOKEN_SYMBOL)
                const receipt = await tx.wait(1)
                const tokenAddress2 = receipt.events[0].address

                await helpers.time.increase(ONE_WEEK_UNIX)

                await expect(childConnectedContract.claim(tokenAddress2, tokenAddress2)).to.revertedWith("Token is not owned by your parent")
            })
            // TODO Implement this check in contract
            it("reverts when trying to claim a token which isn't saved as their preference token", async function () {
                // mint a second token from the child's parent
                const tx = await parentConnectedContract.createNewToken(TOTAL_SUPPLY, TOKEN_NAME, TOKEN_SYMBOL)
                const receipt = await tx.wait(1)
                const tokenAddressNotPrefered = receipt.events[0].address

                await helpers.time.increase(ONE_WEEK_UNIX)

                await expect(childConnectedContract.claim(tokenAddressNotPrefered, tokenAddressNotPrefered)).to.revertedWith("The claimed token is not your selected token")
            })
            it.only("reverts after trying to claim again after just having claimed", async function () {
                await helpers.time.increase(ONE_WEEK_UNIX)
                await childConnectedContract.claim(tokenAddress, tokenAddress);

                let childsBalance = await tokenCreatorContract.balanceOf(child)
                let claimableAmount = (await createdChild.claimableAmount).toString()

                expect(childsBalance).to.equal(claimableAmount)

                await expect(childConnectedContract.claim(tokenAddress, tokenAddress)).to.revertedWith("Sorry your claim period is not valid")
            })
            it("claim token when one week has passed", async function () {
                await helpers.time.increase(ONE_WEEK_UNIX)
                await childConnectedContract.claim(tokenAddress, tokenAddress)

                const childsBalance = await tokenCreatorContract.balanceOf(child)
                const claimableAmount = (await createdChild.claimableAmount).toString()

                expect(childsBalance).to.equal(claimableAmount)
            })
        })
        describe("setClaimMoment", async function () {
            it("change the child's claimPeriod and nextClaimPeriod to daily", async function () {
                await childConnectedContract.setChildClaimMomentDaily()

                const createdChildAfter = await parentConnectedContract.parentToChildMappingNested(parent, child)
                const claimMomentAfter = await createdChildAfter.claimPeriod

                expect(claimMomentAfter).to.equal(0)
            })
            it("change the child's claimPeriod and nextClaimPeriod to weekly", async function () {
                await childConnectedContract.setChildClaimMomentWeekly()

                const createdChildAfter = await parentConnectedContract.parentToChildMappingNested(parent, child)
                const claimMomentAfter = await createdChildAfter.claimPeriod

                expect(claimMomentAfter).to.equal(1)
            })
            it("change the child's claimPeriod and nextClaimPeriod to Monthly", async function () {
                await childConnectedContract.setChildClaimMomentMonthly()

                const createdChildAfter = await parentConnectedContract.parentToChildMappingNested(parent, child)
                const claimMomentAfter = await createdChildAfter.claimPeriod

                expect(claimMomentAfter).to.equal(2)
            })
            it("reverts when trying to claim after a week when claimperiod has been set to monthly", async function () {
                await childConnectedContract.setChildClaimMomentMonthly()
                await helpers.time.increase(ONE_WEEK_UNIX)

                await expect(childConnectedContract.claim(tokenAddress, tokenAddress)).to.revertedWith("Sorry your claim period is not valid")        
            })
            it("able to claim after a day after the claim moment has been set to daily", async function () {
                await childConnectedContract.setChildClaimMomentDaily()
                await helpers.time.increase(ONE_DAY_UNIX)

                await childConnectedContract.claim(tokenAddress, tokenAddress)

                const childsBalance = await tokenCreatorContract.balanceOf(child)
                const claimableAmount = (await createdChild.claimableAmount).toString()

                expect(childsBalance).to.equal(claimableAmount)
            })
            it("able to claim after a month after the claim moment has been set to monthly", async function () {
                await childConnectedContract.setChildClaimMomentMonthly()
                await helpers.time.increase(ONE_MONTH_UNIX)

                await childConnectedContract.claim(tokenAddress, tokenAddress)

                const childsBalance = await tokenCreatorContract.balanceOf(child)
                const claimableAmount = (await createdChild.claimableAmount).toString()

                expect(childsBalance).to.equal(claimableAmount)
            })
        })
    })
})
