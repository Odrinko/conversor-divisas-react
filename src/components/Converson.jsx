import { useState } from 'react';
import '../styles/Conversor.scss'

//Definicion del componente principal del conversor
const Conversor = () => {
    //Estado para manejar el monto que el usuario ingresa
    const [monto, setMonto] = useState('');

    //Estado para seleccionar las monedas de netrada y salida
    const [entradaDivisa, setEntradaDivisa] = useState('USD');
    const [salidaDivisa, setSalidaDivisa] = useState('MXN');

    //Estado para almacenar el resultado 
    const [result, setResult] = useState(null);

    //API KEYS
    const API_KEY = '0385d3aa4beec4ede3c5843a';
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

    //Funcion para hacer la conversion
    const convertCurrency = async () => {
        try {
            const response = await fetch(`${API_URL}/${entradaDivisa}/${salidaDivisa}`);
            const data = await response.json();

            //Calcula el resultafo multiplicando el monto por la taza de cambio
            const rate = data.conversion_rate;
            const conversionResult = (monto * rate).toFixed(2);

            //almacena el resultado en el estado
            setResult(conversionResult); 
            console.log(data);
            console.log(response);
            
            
        } catch (error) {
            console.error('Error al realizar la conversion', error);
            setResult('Error');
        }
    }

    //manejador para le cambio de monto en el imput
    const handleMonto = (e) => {
        setMonto(e.target.value);
    }

    //manejador para seleccionar la moneda de entrada
    const handleEntradaDivisa = (e) => {
        setEntradaDivisa(e.target.value);
    }
    //manejador para seleccionar la moneda de salida
    const handleSalidaDivisa = (e) => {
        setSalidaDivisa(e.target.value);
    }
    //El componente devuelve un fragmento de JSX 
    return (
        <div className="conversor">
            <h1 className="conversor_titulo">Conversor de divisa</h1>
            <div className="conversor_contenedor">
                {/* Campo de entrada para el monto */}
                <input type="number"
                    value={monto}
                    onChange={handleMonto}
                    placeholder='Monto'
                    className='conversor_input'
                />
                {/* Selector para la moneda de entrada */}
                <select value={entradaDivisa}
                    onChange={handleEntradaDivisa}
                    className='conversor_select'
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXM">MXM</option>
                </select>

                {/*Selector para la moneda de salida */}
                <select value={salidaDivisa}
                    onChange={handleSalidaDivisa}
                    className='conversor_select'
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">MXN</option>
                </select>

                {/* Botón de conversión */}
                <button className="conversor_boton" onClick={convertCurrency}>Convertir</button>


                {/* Mostrar el resultado si esta disppponible */}
                {result && (
          <p className="conversor_resultado">
            {monto} {entradaDivisa} = {result} {salidaDivisa}
          </p>
        )}
            </div>
        </div>
    );
};

export default Conversor;