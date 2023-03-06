import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import styles from "./Table.module.scss";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./ag-theme-acmecorp.css"

const Table = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([{ field: "Name", filter: true }, { field: "Address", filter: true }, { field: "Amount" }, { field: "Period" }, { field: "Next Claim" }, { field: "Token" }]);

    // DefaultColDef sets props common to all Columns.
    const defaultColDef = useMemo(() => ({
        sortable: true,
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback((event) => {
        console.log("cellClicked", event);
    }, []);

    // Example load data from sever
    useEffect(() => {
        fetch("https://www.ag-grid.com/example-assets/row-data.json")
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    }, []);

    // Example using Grid's API
    const buttonListener = useCallback((e) => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            {/* <div className={`${["ag-theme-alpine"]} ${styles.table}`} style={{ width: "100%", height: "100%" }}> */}
            <div className="ag-theme-alpine ag-theme-acmecorp" style={{ width: "100%", height: "100%" }}>
                <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="multiple" // Options - allows click selection of rows
                    suppressRowHoverHighlight="true"
                    suppressRowClickSelection="true"
                    enableHover="false"
                    suppressCellSelection="true"
                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>
        </>
    );
};

export default Table;
