import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editarCategoria } from '../firebase/auth.js'
const EditarCategoria = ({setIsEditCategorias,
                          nombreCategoria, 
                          idCategoria,
                          setIsConfirm,
                          textoConfirm,
                          setTextoConfirm
                        }) => {
  
  const [archivoOriginal, setArchivoOriginal] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const subMit = async (data) => {
    const result = await editarCategoria(idCategoria, data.categoria)
    reset();
    setIsEditCategorias(false);
    if(result.ok){
      console.log('se edito la categoria')
      setTextoConfirm('Categoria editada con exito');
      setIsConfirm(true);
    }
  }

  return (
       <div className="contenedor-edit-producto">
        <div className="conatiner-edit-categoria">
        <button onClick={() => { setIsEditCategorias((prev) => !prev) }}>X</button>
        <h3>Editar Categorias</h3>
        <form onSubmit={handleSubmit(subMit)}>
          <input type="text" defaultValue={nombreCategoria}
            {...register('categoria', {
              required: {
                value: true,
                message:'Campo Obligatorio'
              }
            })}
          />
          { errors.categoria?.message && <p>{errors.categoria.message}</p>}
          
          <input
          type="file"
          accept="image/*"
          onChange={(e) => setArchivoOriginal(e.target.files[0])}
          />

          <input type="submit" value="EDITAR" />
        </form>
    </div>
    </div>
  )
};
export default EditarCategoria;