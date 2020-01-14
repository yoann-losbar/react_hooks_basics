import {
  UPDATE_BITCOIN_AMOUNT,
  UPDATE_DOLLAR_PER_BITCOIN_PRICE
} from './types';

const initialRemoteState = {
  bitcoinAmount: 0,
  dollarPerBitcoinPrice: 0
};

const remote = (state = initialRemoteState, action) => {
  switch (action.type) {
    case UPDATE_BITCOIN_AMOUNT: {
      return {
        ...state,
        bitcoinAmount: action.payload.bitcoinAmount
      };
    }
    case UPDATE_DOLLAR_PER_BITCOIN_PRICE: {
      return {
        ...state,
        dollarPerBitcoinPrice: action.payload.dollarPerBitcoinPrice
      };
    }
    default:
      return state;
  }
};

export {
  remote
};
