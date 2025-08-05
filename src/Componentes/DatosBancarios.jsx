import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';

import './datosBancarios.css';

const DatosBancarios = ({ 
                        guardarDatosbancarios, 
                        datosDeBanco, 
                        setTextoConfirm, 
                        setIsConfirm 
                      }) => {
  const [usarAlias, setUsarAlias] = useState(false);
  const [usarCvu, setUsarCvu] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
      const bancoDatos = {
      alias: data.aliasAdmin ? data.aliasAdmin : datosDeBanco[0].alias,
      cvu: data.cvucbuAdmin ? data.cvucbuAdmin : datosDeBanco[0].cvu
    }
    const resultado = await  guardarDatosbancarios(bancoDatos)
    if(resultado.ok){
      setTextoConfirm('Carga exitosa')
      setIsConfirm(true);
    }else{
      alert('No se cargaron los datos bancarios');
    }
    reset()
    setUsarAlias(false)
    setUsarCvu(false);
  };

  return (
    <div className="container-datos-bancarios">
      <h4>Ingrese sus datos bancarios</h4>
      <form 
        className="form-datos-bancarios" 
        onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            type="checkbox"
            checked={usarAlias}
            onChange={() => setUsarAlias(!usarAlias)}
          />
          Ingresar Alias
        </label>
        { usarAlias && (
          <input
            type="text"
            placeholder="Ingrese su alias"
            {...register('aliasAdmin', {
              required: {
                value: true,
                message:'* Campo Obligatorio'
              }
            })}
          />
        )}
        { usarAlias && errors.aliasAdmin?.message && <p className="campo-obligatorio">{errors.aliasAdmin.message}</p> }

        <label>
          <input
            type="checkbox"
            checked={usarCvu}
            onChange={() => setUsarCvu(!usarCvu)}
          />
          Ingresar CVU/CBU
        </label>
        { usarCvu && (
          <input
            type="text"
            placeholder="Ingrese su CVU/CBU"
            
            {...register('cvucbuAdmin', {
              required: {
                value: true,
                message: '* Campo Obligatorio'
              }
            })}
          />
        )}
        { usarCvu && errors.cvucbuAdmin?.message && <p className="campo-obligatorio">{errors.cvucbuAdmin.message}</p> }
        <input type="submit" value="CARGAR" />
      </form>
    </div>
  );
};

export default DatosBancarios;
