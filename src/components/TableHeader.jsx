import React, { useState } from "react";

const TableHeader = ({ cabecalho, onSorting }) => {
  
  const [props, setProps] = useState("")   
  const [dir, setDir ] = useState("asc")

  const onSortChange = ( props ) =>{
      const order = props === props && dir === "asc" ? "desc" : "asc"
      setProps(props);
      setDir(order)
      onSorting(props, order)
  } 

  return (
    <thead className="cf">
      <tr className="p-3 mb-2 bg-primary text-white">
          { cabecalho.map((linha, index)=> (
              <th key={index} className="table-col">
                  <button className="btn btn-link text-white" onClick={(e) => linha.sort ? onSortChange(linha.field):''}>
                    {linha.nome}
                    { props && props === linha.field && (
                        <i className={`fa ${dir === 'asc' ? 'fa-sort-asc':'fa-sort-desc'}`}></i>
                    )}
                  </button>
              </th>
          ))}
          <th className="table-col">Ações</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
