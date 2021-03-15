import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css';
import 'font-awesome/css/font-awesome.min.css';

export default function ArticleTable() {

    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
      fetchArticles();
    }, []);

    const fetchArticles = async () => {
      const data = await fetch('/api/articles');
      const articles = await data.json();
      setRowData(articles);
    }

    function linkRenderer(params){
      const element = document.createElement("a");
      element.setAttribute("href", "/articles/" + params.value);
      const icon = document.createElement("i");
      icon.setAttribute("class", "fa fa-hand-pointer-o");
      element.appendChild(icon);
      element.appendChild(document.createTextNode('    Click here'));
      return element;
    }

    function onGridReady(params) {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
    }

    function onColumnResized(params){
      params.api.resetRowHeights();
    }

    function onColumnVisible(params){
      params.api.resetRowHeights();
    }

    const columnDefs = [
      { headerName: "Title", field: "title", width: 400 },
      { headerName: "Language", field: "language" },
      { headerName: "Link", field: "id", cellRenderer: "linkRenderer" }
    ]

    const gridOptions = {
      columnDefs: columnDefs,
      rowData: rowData,
      components: {
        linkRenderer: linkRenderer
      },
      defaultColDef:{
        sortable: true,
        filter: true,
        resizable: true
      },
      onColumnResized: onColumnResized,
      onColumnVisible: onColumnVisible,
      onGridReady: onGridReady
    }

    return(
      <>
      {rowData.length > 0 &&
      <div className="ag-theme-material" style={{ height:"100vh", width:"100vh" }}>
        <AgGridReact gridOptions={gridOptions}>
        </AgGridReact>
      </div>
      }
      </>
    );
}
