import type { Token, Eligible } from './types'

import tokenAbi from './abis/Token.json'
import eligibleAbi from './abis/Eligible.json'


export type ContractsAbi = {
  'token': Token
  'eligible': Eligible
}

export type ContractName = keyof ContractsAbi

export type ContractData<Symbol extends string> = {
  address: string
  abi: object[]
  symbol?: Symbol
  decimals?: number
}

export type ContractsData = {
  [Name in ContractName]: ContractData<string>
}

export type Contracts = {
  [Name in ContractName]: ContractsAbi[Name]
}

export const contracts: ContractsData = {
  token: {
    address: process.env.NEXT_PUBLIC_TOKEN,
    abi: tokenAbi,
  },
  eligible: {
    address: process.env.NEXT_PUBLIC_ELIGIBLE,
    abi: eligibleAbi,
  },
}
