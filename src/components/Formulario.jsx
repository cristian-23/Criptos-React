import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import Error from './Error';
import { monedas } from '../data/monedas.js';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptoMoneda, SelectCriptomoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos);

  useEffect(() => {
    const api = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map(cripto => ({
        id: cripto.CoinInfo.Name,
        nombre: cripto.CoinInfo.FullName
      }));

      setCriptos(arrayCriptos);
    };

    api();
  }, []);
  const handleSubmit= ( e )=>{
    e.preventDefault()
    console.log("enviando");
    if ([moneda, criptoMoneda].includes("")) {
      setError(true)
      return
    }
    setError(false)
    setMonedas({moneda,criptoMoneda})
  }

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>
      <SelectMonedas />
      <SelectCriptomoneda />
      <InputSubmit type="submit" value={"Cotizar"} />
    </form>
    </>
  );
};

export default Formulario;
