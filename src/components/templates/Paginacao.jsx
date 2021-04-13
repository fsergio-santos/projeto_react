import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Paginacao = ( { paginaAtual, pageSize, paginaFim, totalCount, setNumberPaginaAtual }) => {
    
    const [pageIndex, setPageIndex ] = useState(1);
    const [ pageIndexOutOfRange, setPageIndexOutOfRange ] = useState(false)

    let pages = [];
    let start = 0;
    let size = 5;


    if  (paginaFim <= pageSize ) {
        start = 1;
    } else if ( paginaAtual <= (paginaFim - pageSize / 2)) {
        start = 1;
    } else if ( paginaAtual >= (paginaFim - pageSize / 2)){
        start = paginaFim - pageSize + 1;
    } else {
        start = paginaAtual - pageSize / 2;
    }

    for (let i = 0; i < size; i++  ){
        pages.push(start + i);
    }  

    const totalPage = () => {
        let totalPage = 0 
        let pages =  parseInt(totalCount / pageSize)  
        if ( totalCount % pageSize > 0 ){
            totalPage = ++pages;
        } else {
            totalPage = pages
        }
        if ( totalPage > 0 && pageIndex > totalPage ){
            setPageIndex(pageIndex)
            setPageIndexOutOfRange(true)
        } else {
            setPageIndexOutOfRange(false)
        }
        return totalPage
    }





    const goFirst = () => {
        goPage(0)
    }

    const goPrevious = () => {
        if ( pageIndex >= 1 ){
            goPage(pageIndex - 1);
        }
    }

    const goNext = () => {
        if (pageIndex < ( totalPage() - 1 ) ) {
            goPage(pageIndex + 1)
        }
    }

    const goEnd = () => {
        goPage(totalPage() - 1);
    }
    
    const goPage = (page) => {
        if (!pageIndexOutOfRange && page === pageIndex ){
            setPageIndex(page)
            setNumberPaginaAtual(page)
        } else {
            setPageIndex(page)
            setNumberPaginaAtual(page)
        }
    }

   return (
       <React.Fragment>
           <div className="box-footer clearfix">
		<div className="row">
			<div className="col-xs-12 col-md-5">
				<div className="pagination">
					<p>
                        Mostrando { pageSize * paginaAtual + 1} <span class="badge badge-secondary"></span>
                         	de { Math.ceil( totalCount / pageSize ) } <span className="badge badge-secondary"></span>
							de { totalCount } <span className="badge" ></span>
						Registros Cadastrados.
					</p>
				</div>
			</div>
			<div className="col-xs-12 col-md-7" >
				<ul className='pagination pull-right'>
					<li className={ paginaAtual === 0 ? 'page-item disabled':'page-item'} > 
						<Link onClick={() => goFirst() }
						   className="page-link">← Primeira</Link>
				    </li>
					<li className={ paginaAtual === 0 ? 'page-item disabled' : 'page-item' } >
					    <Link onClick={() => goPrevious() }
						   className="page-link"> 
						   <span className="fa fa-chevron-left">Anterior</span>
						</Link>
					</li>
                    { pages.map((pagina, index ) =>
                        <li key={index} 
                            className={paginaAtual === pagina - 1 ? 'page-item active' : 'page-item' }>
                            <Link onClick={() => goPage( pagina - 1 )}className="page-link">{pagina}</Link>
                        </li>
                    )}
        	     	<li  className={paginaAtual === paginaFim ? "page-item disabled" : "page-link"}>
						<Link onClick={ () => goNext()  } > 
						   <span>Próximo</span>
						</Link>
					</li>
					<li className={paginaAtual  === paginaFim ? 'page-item disabled' : 'page-item'}>
					    <Link onClick={() => goEnd()}  
					        className="page-link"
						 >Última →</Link>
			   	    </li>
				</ul>
			</div>
		</div>
	</div>

       </React.Fragment>
   )

}


export default Paginacao;