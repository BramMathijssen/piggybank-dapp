import React, { useState, useEffect, useContext, Children } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import EventsContext from "../../../context/events-context";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";

import styles from "./TokenTable.module.scss";

const TokenTable = ({ tokens }) => {
    const eventsCtx = useContext(EventsContext);

    console.log(`rendering table`)

    const avatarBodyTemplate = (rowData) => {
        console.log(rowData);
        return (
            <div>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData.tokenAddress)} />
            </div>
        );
    };

    const nameAddressBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <div className={styles.flexContainer}>
                    <span>{rowData.name}</span>
                    <p>{rowData.tokenAddress}</p>
                </div>
            </div>
        );
    };

    const tokenSymbolBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <p>{rowData.symbol} </p>
            </div>
        );
    };

    const tokenSupplyBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <p>{rowData.supply.toString()} </p>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={tokens} scrollable scrollHeight="450px" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "5%" }} body={avatarBodyTemplate}></Column>
                <Column field={tokens.name} header="Token Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                <Column field="amount" header="Symbol" style={{ width: "25%" }} body={tokenSymbolBodyTemplate}></Column>
                <Column field="period" header="Total Supply" style={{ width: "25%" }} body={tokenSupplyBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TokenTable;
