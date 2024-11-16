import { Address, Abi } from 'viem';

interface IObjectFactory {
  address: Address;
  abi: Abi;
}

const ObjectFactoryContract: IObjectFactory = {
  address: '0x3cb202bF5dbca2a812cAB50B6851d578D15e8eb0',
  abi: [
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
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
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
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxShares',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_saleStopTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_priceOneShare',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '_referralProgramEnabled',
          type: 'bool',
        },
      ],
      name: 'createFullSaleObject',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_maxShares',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_intialStageAvailableShares',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_intialStageSaleStopTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_priceOneShare',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '_referralProgramEnabled',
          type: 'bool',
        },
      ],
      name: 'createStageSaleObject',
      outputs: [],
      stateMutability: 'nonpayable',
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
          internalType: 'address',
          name: '_objectImplementation',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lastObjectId',
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
          internalType: 'bytes[]',
          name: 'data',
          type: 'bytes[]',
        },
      ],
      name: 'multicall',
      outputs: [
        {
          internalType: 'bytes[]',
          name: 'results',
          type: 'bytes[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_objectId',
          type: 'uint256',
        },
      ],
      name: 'objectAddress',
      outputs: [
        {
          internalType: 'address',
          name: '',
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
          internalType: 'address',
          name: '_logic',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: '_data',
          type: 'bytes',
        },
      ],
      stateMutability: 'payable',
      type: 'constructor',
    },
  ],
};

export default ObjectFactoryContract;
