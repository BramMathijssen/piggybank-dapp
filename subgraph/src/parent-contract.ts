import {
  ChildAdded as ChildAddedEvent,
  TokenCreated as TokenCreatedEvent
} from "../generated/ParentContract/ParentContract"
import { ChildAdded, TokenCreated } from "../generated/schema"

export function handleChildAdded(event: ChildAddedEvent): void {
  let entity = new ChildAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.child_name = event.params.child.name
  entity.child_childAddress = event.params.child.childAddress
  entity.child_tokenPreference = event.params.child.tokenPreference
  entity.child_baseAmount = event.params.child.baseAmount
  entity.child_claimableAmount = event.params.child.claimableAmount
  entity.child_claimValid = event.params.child.claimValid
  entity.child_claimPeriod = event.params.child.claimPeriod
  entity.child_nextClaimPeriod = event.params.child.nextClaimPeriod
  entity.childAddress = event.params.childAddress
  entity.parentAddress = event.params.parentAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenCreated(event: TokenCreatedEvent): void {
  let entity = new TokenCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.parentAddress = event.params.parentAddress
  entity.tokenAddress = event.params.tokenAddress
  entity.token_supply = event.params.token.supply
  entity.token_tokenAddress = event.params.token.tokenAddress
  entity.token_name = event.params.token.name
  entity.token_symbol = event.params.token.symbol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
