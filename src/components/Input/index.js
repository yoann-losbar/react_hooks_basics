import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {updateBitcoinAmount} from '../App/actions';

// Le component Input est un hook, une simple fonction qui retourne
// une primitive (Nulber, String), ou un autre component React (Hook, Class component, Pure Component...)
const Input = () => {

  // Pour dispatcher des actions vers le store redux, j'initialise la méthode dispatch dans le scope du hook.
  // Je peux ensuite utiliser dispatch comme pour un component react classique, ie dispatch(action())
  const dispatch = useDispatch();

  // Nouvelle syntaxe des hooks pour utiliser un store LOCAL.
  // Dans ce cas, je demande à React de me créer une variable, de me créer un setter pour cette variable,
  // et d'initialiser cette variable à true. La valeur d'initialisation de la variable est le paramètre envoyé à useState
  // Il est obligatoire d'utiliser le setter fourni par useState pour modifier la variable isInputValid, autrement
  // la detection de changement de React et le render auto ne fonctionneront pas.
  const [isInputValid, setIsInputValid] = useState(true);

  // La fonction handler. Tous les handlers doivent être dans le scope du hook, pour pouvoir accéder aux variables de state du hook.
  const handleInputChange = (event) => {
    const newBitcoinAmount = event.target.value;
    if (Number.isNaN(parseInt(newBitcoinAmount))) {
      // Le montant en Bitcoin n'est pas valide, j'utilise donc le setter fourni par useState pour mettre isInputValid à false
      setIsInputValid(false);
      return false;
    }
    setIsInputValid(true);
    // Le nombre est valide, je dispatch la mise à jour vers le store redux, en utilisant l'action udpateBitcoinAmount
    dispatch(updateBitcoinAmount(newBitcoinAmount));
  }

  return (
    <>
      <span> Bitcoins </span>
      <input onChange={handleInputChange} type="text" />
      <br/><br/>
      {!isInputValid? (<div style={{color: 'red'}}>Input must be a number!</div>) : null}
    </>
  )
}

export default Input;
