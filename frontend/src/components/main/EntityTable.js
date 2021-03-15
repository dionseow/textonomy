import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css';
import 'font-awesome/css/font-awesome.min.css';

export default function EntityTable() {

    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
      fetchEntities();
    }, []);

    const fetchEntities = async () => {
      const data = await fetch('/api/entities');
      const entities = await data.json();
      setRowData(entities);
    }

    function linkRenderer(params){
      const element = document.createElement("a");
      element.setAttribute("href", "/entities/" + params.value);
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
      { headerName: "Name", field: "Name", width: 400 },
      { headerName: "Type", field: "Type" },
      { headerName: "Link", field: "Id", cellRenderer: "linkRenderer" }
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
