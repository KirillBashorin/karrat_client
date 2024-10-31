import { Address } from 'viem';

export type ObjectType = {
  contractAddress: Address;
  type: 'rent' | 'object';
  image: string;
  gallery: string[];
  title: string;
  description: string;
  objectAddress: string;
};
