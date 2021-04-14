import React, { useState } from "react";
import { Link } from "react-router-dom";

const MAX_ITENS = 10;

const Paginacao = ({
  paginaAtual,
  pageSize,
  paginaFim,
  totalCount,
  setNumberPaginaAtual,
}) => {
  let pages = [];

  let totalPages = Math.ceil(totalCount / pageSize);
  let startPage = 0;
  let endPage = 0;

  if (totalPages <= MAX_ITENS) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (paginaAtual <= 6) {
      startPage = 1;
      endPage = MAX_ITENS;
    } else if (paginaAtual + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = paginaAtual - 5;
      endPage = paginaAtual + 4;
    }
  }

  pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

  const getPage = (page) => {
    if (page < 0 || page > paginaFim) {
      return;
    }

    setNumberPaginaAtual(page);
  };

  return (
    <React.Fragment>
      <div className="box-footer clearfix">
        <div className="row">
          <div className="col-xs-12 col-md-5">
            <div className="pagination">
              <p>
                Mostrando {pageSize * paginaAtual + 1}{" "}
                <span class="badge badge-secondary"></span>
                de {Math.ceil(totalCount / pageSize)}{" "}
                <span className="badge badge-secondary"></span>
                de {totalCount} <span className="badge"></span>
                Registros Cadastrados.
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-md-7">
            <ul className="pagination pull-right">
              <li
                className={
                  paginaAtual === 1 ? "page-item disabled" : "page-item"
                }
              >
                <Link onClick={() => getPage(1)} className="page-link">
                  Primeira
                </Link>
              </li>
              <li
                className={
                  paginaAtual === 1 ? "page-item disabled" : "page-item"
                }
              >
                <Link
                  onClick={() => getPage(paginaAtual - 1)}
                  className="page-link"
                >
                  <span className="fa fa-chevron-left"></span>
                </Link>
              </li>
              {pages.map((pagina, index) => (
                <li
                  key={index}
                  className={
                    paginaAtual === pagina ? "page-item active" : "page-item"
                  }
                >
                  <Link onClick={() => getPage(pagina)} className="page-link">
                    {pagina}
                  </Link>
                </li>
              ))}
              <li
                className={
                  paginaAtual === paginaFim ? "page-item disabled" : "page-link"
                }
              >
                <Link onClick={() => getPage(paginaAtual + 1)}>
                  <span class="fa fa-chevron-right"></span>
                </Link>
              </li>
              <li
                className={
                  paginaAtual === paginaFim ? "page-item disabled" : "page-item"
                }
              >
                <Link
                  onClick={() => getPage(paginaFim - 1)}
                  className="page-link"
                >
                  Última
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Paginacao;
