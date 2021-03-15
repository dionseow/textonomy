import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-material.css';
import 'font-awesome/css/font-awesome.min.css';

export default function RelatedArticlesTable(props) {

    const [rowData, setRowData] = useState(props.data);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    function linkRenderer(params){
      if (params.value === undefined){
        return "";
      }
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

    function onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    }

    const columnDefs = [
      { headerName: "Similar Words", field: "word", rowGroup: true, hide: true },
      { headerName: "Article Title", field: "title" },
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
      groupHideOpenParents: false,
      autoGroupColumnDef:{
        headerName: "Similar Words",
        cellRendererParams:{
          suppressCount: true
        }
      },
      onColumnResized: onColumnResized,
      onColumnVisible: onColumnVisible,
      onFirstDataRendered: onFirstDataRendered,
      onGridReady: onGridReady
    }

    return(
      <>
      {rowData.length > 0 &&
      <div className="ag-theme-material" style={{ height:"500px", width:"100%" }}>
        <AgGridReact gridOptions={gridOptions}>
        </AgGridReact>
      </div>
      }
      </>
    );
}
