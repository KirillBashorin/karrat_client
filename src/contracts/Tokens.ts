import { Address } from 'viem';

interface ITokens extends Record<string, Address> {}

const Tokens: ITokens = {
  USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
};

export default Tokens;
