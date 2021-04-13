import React, { Fragment, useState } from "react";

const pageSizes = [5, 10, 15, 20, 50];

const SelectOptions = ({ sizePage, setPageSize }) => {

    const [pageSize, setTamanhoPagina] = useState(sizePage)
    
    const onPageSize = (e) => {
       setTamanhoPagina(e.target.value)
       setPageSize(e.target.value)
    }


    return (
    <Fragment>
      <div className="col-md-6">
        <div className="form-group row">
          <label
            for="pageSizeSelect"
            className="col-form-label col-12 col-sm-1"
          >
            <b>Mostrar:</b>
          </label>
          <div className="col-8 col-sm-6 col-md-6 offset-md-1">
            <select className="form-control pagination" 
                    id="pageSizeSelect"
                    value={pageSize}
                    onChange={(e) => onPageSize(e)}>
              {
                  pageSizes.map((size)=>(
                    <option key={size} value={size}>
                        {size}
                    </option>   
                  ))
              }
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SelectOptions;
