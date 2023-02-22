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
    let deployer, parent, child, parentContract, parentConnectedContract

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
        const TOKEN_NAME = "Test Token"
        const TOKEN_SYMBOL = "TT"
        const TOTAL_SUPPLY = ethers.utils.parseEther("1000") // = 1000000000000000000000 wei
        beforeEach(async () => {
            parent = (await getNamedAccounts()).parent
            child = (await getNamedAccounts()).child
            parentConnectedContract = await ethers.getContract("ParentContract", parent)
            childConnectedContract = await ethers.getContract("ParentContract", child)
        })
        describe("createNewToken", async function () {
            it("tests if the total supply is sent to the parentContract", async function () {
                const owner = await parentConnectedContract.owner()
                const deployerTest = await parentContract.test()
                const parentTest = await parentConnectedContract.test()
                const childtest = await childConnectedContract.test()
                console.log(`deployer address is ${deployer}`)
                console.log(`parent address is ${parent}`)
                console.log(`child address is ${child}`)

                console.log(`owner is ${owner}`)
                console.log(`message sender parent func is: ${deployerTest}`)
                console.log(`message sender parent func is: ${parentTest}`)
                console.log(`message sender child func is: ${childtest}`)
            })
        })

        it("sends the correct amount of tokens to the deployer", async function () {
            console.log(parentContract.address)
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
