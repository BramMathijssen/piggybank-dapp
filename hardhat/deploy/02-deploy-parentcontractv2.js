const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    arguments = []
    await deploy("ParentContractV2", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["all", "parentcontractv2", "main"]
