import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ChildAdded,
  TokenCreated
} from "../generated/ParentContract/ParentContract"

export function createChildAddedEvent(
  child: ethereum.Tuple,
  childAddress: Address,
  parentAddress: Address
): ChildAdded {
  let childAddedEvent = changetype<ChildAdded>(newMockEvent())

  childAddedEvent.parameters = new Array()

  childAddedEvent.parameters.push(
    new ethereum.EventParam("child", ethereum.Value.fromTuple(child))
  )
  childAddedEvent.parameters.push(
    new ethereum.EventParam(
      "childAddress",
      ethereum.Value.fromAddress(childAddress)
    )
  )
  childAddedEvent.parameters.push(
    new ethereum.EventParam(
      "parentAddress",
      ethereum.Value.fromAddress(parentAddress)
    )
  )

  return childAddedEvent
}

export function createTokenCreatedEvent(
  parentAddress: Address,
  tokenAddress: Address,
  token: ethereum.Tuple
): TokenCreated {
  let tokenCreatedEvent = changetype<TokenCreated>(newMockEvent())

  tokenCreatedEvent.parameters = new Array()

  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "parentAddress",
      ethereum.Value.fromAddress(parentAddress)
    )
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromTuple(token))
  )

  return tokenCreatedEvent
}
