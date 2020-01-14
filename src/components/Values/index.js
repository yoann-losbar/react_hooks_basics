import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLastDollarPerBitcoinPrice} from '../App/actions';

// NOTE: Ce code est agnostique et réutilisable, il peut donc etre déplacé dans /utils par exemple.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Values = () => {
  // Pour dispatcher des actions vers le store redux, j'initialise la méthode dispatch dans le scope du hook.
  // Je peux ensuite utiliser dispatch comme pour un component react classique, ie dispatch(action())
  const dispatch = useDispatch();

  // Le hook useSelector permet d'accéder au variables du store redux.
  // C'est une fonction qui prend en argument une fonction décrivant le path d'accès à la variable souhaitée
  const bitcoinAmount = useSelector(state => state.remote.bitcoinAmount);
  const dollarPerBitcoinPrice = useSelector(state => state.remote.dollarPerBitcoinPrice);

  // NOTE: Les hooks peuvent être executés un grand nombre de fois pendant le cycle de vie d'une application react,
  // Il faut donc faire gaffe à ne pas mettre des calculs trop intensifs. Ici c'est juste un produit, donc pas de souci.
  // Si tu dois faire des calculs un peu plus complexes, tu peux mémoiser cette valeur en utilisant le hook useMemo, React n'executera le calcul à nouveau
  // seulement et seulement si une des variables qui le compose a changé.
  // Voir https://fr.reactjs.org/docs/hooks-reference.html#usememo
  const dollarValue = bitcoinAmount*dollarPerBitcoinPrice;
  const formatedDollarValue = formatter.format(dollarValue);

  // Nouvelle syntaxe des hooks pour utiliser un store LOCAL.
  // Dans ce cas, je demande à React de me créer une variable, de me créer un setter pour cette variable,
  // et d'initialiser cette variable à true. La valeur d'initialisation de la variable est le paramètre envoyé à useState
  // Il est obligatoire d'utiliser le setter fourni par useState pour modifier la variable isWealthy, autrement
  // la detection de changement de React et le render auto ne fonctionneront pas.
  const [isWealthy, setIsWealthy] = useState(false);

  // Cette fonction fait une requete HTTP pour récupérer le dernier taux de change bitcoin/usd
  const fetchDollarPerBitcoinPrice = () => {
    dispatch(getLastDollarPerBitcoinPrice());
  }

  // Le hook useEffect permet d'écouter les modifications de variables (uniquement de variables accessibles dans le scope du Hook Values)
  // Il prend en second argument un array des variables que tu souhaites écouter (dans ce cas, on souhaite écouter les changement de dollarValue)
  // et en premier argument la fonction à executer quand au moins une des variables écoutées a changé.
  // Dans cette exemple, on affiche un message 'vous etes riches' si la valeur dollar est > 1000, autrement on affiche 'vous êtes pauvre'
  useEffect(() => {
    setIsWealthy(dollarValue > 1000);
  }, [dollarValue])

  // Tu peux créer autant de hooks que tu veux. Tous les hooks vont s'executer obligatoirement une premiere fois au démarrage de l'app (comme l'ancien
  // componentDidMount) et s'éxecuteront ensuite seulement quand au moins une des variables écoutées a changé.
  // Si l'array en second argument est vide, comme ci dessous, le hook s'executera une seule fois au demarrage de l'app, puis plus jamais.
  // Dans cette exemple, on a besoin de créer une seule fois le job qui va fetcher toutes les N secondes le nouveau taux de change BTC/USD
  useEffect(() => {
    fetchDollarPerBitcoinPrice();
    setInterval(() => {
      fetchDollarPerBitcoinPrice();
    }, 5000);
  }, []);

  return (
    <>
      <span> Total portfolio value : {formatedDollarValue} </span>
      <br/> <br/>
      {isWealthy ? 'You are rich! invest your money in my fund' : 'You are poor'}
    </>
  )
};

export default Values;
