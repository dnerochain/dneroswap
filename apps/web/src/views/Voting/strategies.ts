export const votePowerAddress = {
  v0: '0xc0FeBE244cE1ea66d27D23012B3D616432433F42',
  v1: '0x67Dfbb197602FDB9A9D305cC7A43b95fB63a0A56',
  veWDnero: '0x67Dfbb197602FDB9A9D305cC7A43b95fB63a0A56',
} as const

export const veWDneroBalanceStrategy = {
  name: 'contract-call',
  params: {
    address: votePowerAddress.veWDnero,
    decimals: 18,
    args: ['%{address}'],
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getVotingPowerWithoutPool',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

export const wdneroBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getWDneroBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export const wdneroVaultBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getWDneroVaultBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export const ifoPoolBalanceStrategy = {
  name: 'contract-call',
  params: {
    address: votePowerAddress.v0,
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getIFOPoolBalancee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

export const wdneroPoolBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getWDneroPoolBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export const wdneroDTokenLpBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getWDneroDTokenLpBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export function createPoolsBalanceStrategy(poolAddress, version: 'v0' | 'v1') {
  return {
    name: 'contract-call',
    params: {
      address: votePowerAddress[version],
      decimals: 18,
      args: ['%{address}', poolAddress],
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: '_pools',
            type: 'address[]',
          },
        ],
        name: 'getPoolsBalance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}

export function createTotalStrategy(poolAddress, version: 'v0' | 'v1') {
  return {
    name: 'contract-call',
    params: {
      address: votePowerAddress[version],
      decimals: 18,
      args: ['%{address}', poolAddress],
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: '_pools',
            type: 'address[]',
          },
        ],
        name: 'getVotingPower',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}

export function lockedWDneroUser(
  wdneroVaultAddress,
  outputName: 'lockedAmount' | 'lockEndTime' | 'shares' | 'userBoostedShare',
) {
  return {
    name: 'contract-call',
    params: {
      address: wdneroVaultAddress,
      decimals: 0,
      output: outputName,
      args: ['%{address}'],
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'userInfo',
        outputs: [
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastDepositedTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'wdneroAtLastUserAction',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastUserActionTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lockStartTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lockEndTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'userBoostedShare',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'locked',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'lockedAmount',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}

export function lockedWDneroShare(wdneroVaultAddress) {
  return {
    name: 'contract-call',
    params: {
      address: wdneroVaultAddress,
      decimals: 0,
      methodABI: {
        inputs: [],
        name: 'getPricePerFullShare',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}
