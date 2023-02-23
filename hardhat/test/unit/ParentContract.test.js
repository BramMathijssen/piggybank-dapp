const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

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

                expect(createdChild.name).to.equal(CHILD_NAME);
                expect(createdChild.childAddress).to.equal(child);
                expect(createdChild.tokenPreference).to.equal(tokenAddress);
                expect(createdChild.baseAmount).to.equal(BASE_AMOUNT);
            })
            it("Test if a child is added to the parentToChildMappingNested with the correct: nextclaimperiod + nextclaimamount", async function () {
                // todo
            })
            it.only("Test if it's possible for a parent to hold multiple children", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
                await parentConnectedContract.addChild(CHILD_NAME, child2, tokenAddress, BASE_AMOUNT)

                const createdChild = await parentConnectedContract.parentToChildMappingNested(parent, child)
                const createdChild2 = await parentConnectedContract.parentToChildMappingNested(parent, child2)

                expect(createdChild.childAddress).to.equal(child)
                expect(createdChild2.childAddress).to.equal(child2)
            })
            it("Test if the child is added to the childToParentMapping", async function () {
                await parentConnectedContract.addChild(CHILD_NAME, child, tokenAddress, BASE_AMOUNT)
                const parentsChild = await parentConnectedContract.childToParentMapping(child);

                expect(parentsChild).to.equal(parent)
            })
        })
    })
    // describe("Child Functions", async function () {
    //     describe("Contract deployment", async function () {
    //         it("sends the correct amount of tokens to the deployer", async function () {
    //             console.log(parentContract.address)
    //         })
    //     })

    //     it("sends the correct amount of tokens to the deployer", async function () {
    //         console.log(parentContract.address)
    //     })
    // })
})
