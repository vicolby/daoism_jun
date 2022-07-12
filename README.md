# Daoism Systems Junior Smart Contracts Engineer Technical Challenge

The goal of this technical challenge is to demonstrate the challengers ability to:

1. produce Solidity code
2. innovate on Ethereum primitives
3. follow best practices

## Overview

The challenger would have to create a custom [ERC721](https://eips.ethereum.org/EIPS/eip-721) based voting app, that will allow
`ERC721` token holders to `create`, `vote` and `execute` on proposals to `add`/`sub` 1 to/from a `counter` variable.

Example of a contract interaction flow:

`(create proposal) => (vote on a proposal) => (execute proposal) => (+/- 1)` 

The flow should be demonstrated in a `happy path` scenario in tests.

## Requirements

The challenger will take care of:

1. Writing code according to the standards of the [PrimeDAO contracts-v2 repo](https://github.com/PrimeDAO/contracts-v2/) and based on the requirements stated earlier
2. Testing their codebase 
3. Cleaning up the code and writing comments

## Bonus

1. Deploy to Rinkeby testnet
2. Add a simple front-end
3. Add  test coverage tools and achieve 100% statement unit test coverage