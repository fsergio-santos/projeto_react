import React, { Fragment, useState } from 'react';

const SearchData = ( {buscarDataPorNome} ) => {

    const [ nome, setNome ] = useState("")

    const onChangeName = (e) =>{
        setNome(e.target.value)
        buscarDataPorNome(e.target.value)
    }



    return (
        <Fragment>
        <div className="col-md-6">
        <form method="GET">
          <div className="form-group offset-md-1">
            <div className="row">
              <label
                for="nome"
                className="col-form-label col-12 col-sm-1 col-md-1"
              >
                Nome:
              </label>
              <div className="col-8 col-sm-8 col-md-8 offset-md-1">
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  onChange={(e)=> onChangeName(e)}
                  className="form-control"
                  placeholder="Digite um nome para pesquisa"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      </Fragment>
    )
}

export default SearchData;