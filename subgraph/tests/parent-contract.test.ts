import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ChildAdded } from "../generated/schema"
import { ChildAdded as ChildAddedEvent } from "../generated/ParentContract/ParentContract"
import { handleChildAdded } from "../src/parent-contract"
import { createChildAddedEvent } from "./parent-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let child = "ethereum.Tuple Not implemented"
    let childAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let parentAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newChildAddedEvent = createChildAddedEvent(
      child,
      childAddress,
      parentAddress
    )
    handleChildAdded(newChildAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChildAdded created and stored", () => {
    assert.entityCount("ChildAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChildAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "child",
      "ethereum.Tuple Not implemented"
    )
    assert.fieldEquals(
      "ChildAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "childAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChildAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "parentAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
