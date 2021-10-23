import { Web3Provider, AlchemyProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

import type { Token } from './types'
import state from './state'

import tokenAbi from './abis/Token.json'


const createTokenContract = (address: string, withWalletProvider?: boolean): Token => {
  let contract
  let provider

  if (withWalletProvider) {
    contract = state.contractsWithProvider[address]
  }
  else {
    contract = state.contracts[address]
  }

  if (contract) {
    return contract
  }

  if (withWalletProvider) {
    provider = state.walletProvider.getSigner()
  }
  else {
    provider = typeof window !== 'undefined' && window.ethereum
      ? new Web3Provider(window.ethereum) // Metamask
      : new AlchemyProvider('rinkeby', process.env.NEXT_PUBLIC_ALCHEMY_URL)
  }

  const newContract = new Contract(address, tokenAbi, provider) as Token

  if (withWalletProvider) {
    state.contractsWithProvider[address] = newContract
  }
  else {
    state.contracts[address] = newContract
  }

  return newContract
}

const getTokenContract = (address: string, withWalletProvider?: boolean): Token => {
  return createTokenContract(address, withWalletProvider)
}

export default getTokenContract
