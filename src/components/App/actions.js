import {
  UPDATE_BITCOIN_AMOUNT,
  UPDATE_DOLLAR_PER_BITCOIN_PRICE
} from './types';
import config from '../../config';
import axios from 'axios';

export const updateBitcoinAmount = (bitcoinAmount) => ({
  type: UPDATE_BITCOIN_AMOUNT,
  payload: {
    bitcoinAmount
  }
});

// Cette action est une action synchrone, elle met à jour le store redux de façon synchrone.
export const updateDollarPerBitcoinPrice = (dollarPerBitcoinPrice) => ({
  type: UPDATE_DOLLAR_PER_BITCOIN_PRICE,
  payload: {
    dollarPerBitcoinPrice
  }
});

// Cette fonction est une action asynchrone, elle effecture une action asynchrone, attend qu'elle termine, puis
// dispatch le resultat vers le store redux
export const getLastDollarPerBitcoinPrice = () => {
  return async function(dispatch) {
    const response = await axios.get(config.dollarPricePerBtcEndpoint);
    dispatch(updateDollarPerBitcoinPrice(response.data.bpi.USD.rate_float));
  };
};
