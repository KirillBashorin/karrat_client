import { Address } from 'viem';

const Pricer = {
  address: '0x7ba13e11e428260b98D8630407b1806FF617A8e4' as Address,
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'previousAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'AdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'beacon',
          type: 'address',
        },
      ],
      name: 'BeaconUpgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      inputs: [],
      name: 'addressBook',
      outputs: [
        {
          internalType: 'contract IAddressBook',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'deleteToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'getPrice',
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
    {
      inputs: [
        {
          internalType: 'address',
          name: '_addressBook',
          type: 'address',
        },
        {
          internalType: 'contract IERC20[]',
          name: '_tokens',
          type: 'address[]',
        },
        {
          internalType: 'contract IPricer[]',
          name: '_pricers',
          type: 'address[]',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'pricers',
      outputs: [
        {
          internalType: 'contract IPricer',
          name: 'pricer',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'requireTokenSupport',
      outputs: [],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: '_token',
          type: 'address',
        },
        {
          internalType: 'contract IPricer',
          name: '_pricer',
          type: 'address',
        },
      ],
      name: 'setPricer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
      ],
      name: 'upgradeTo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_usdAmount',
          type: 'uint256',
        },
        {
          internalType: 'contract IERC20',
          name: '_token',
          type: 'address',
        },
      ],
      name: 'usdAmountToToken',
      outputs: [
        {
          internalType: 'uint256',
          name: 'tokenAmount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

export default Pricer;
