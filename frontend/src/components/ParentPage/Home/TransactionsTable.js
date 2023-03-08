import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

import styles from "./TransactionsTable.module.scss";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/UnixToDate";
import EventsContext from "../../../context/events-context";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";

const TransactionsTable = ({ transactions }) => {
    const eventsCtx = useContext(EventsContext);

    const avatarBodyTemplate = (rowData) => {
        console.log(rowData);
        return (
            <div>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData.childAddress)} />
            </div>
        );
    };

    const nameAddressBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <div className={styles.flexContainer}>
                    <span>{rowData.name}</span>
                    <p>{rowData.childAddress}</p>
                </div>
            </div>
        );
    };

    const claimPeriodBodyTemplate = (rowData) => {
        const claimPeriod = getClaimPeriodString(rowData.claimPeriod);
        return (
            <div className={styles.nameBody}>
                <p>{claimPeriod}</p>
            </div>
        );
    };


    const tokenBodyTemplate = (rowData) => {
        const tokenName = getNameByAddress(eventsCtx.tokens, rowData.tokenPreference);
        console.log(eventsCtx.tokens);
        return (
            <div className={styles.amountClaimed}>
                <p>-{rowData.claimableAmount.toString()} {tokenName}</p>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={transactions} scrollable scrollHeight="350px" paginator rows={6} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem"}}>
                <Column field="avatar" style={{ width: "1%" }} body={avatarBodyTemplate}></Column>
                <Column field="" header="Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                <Column field="period" header="Claim Moment" style={{ width: "25%" }} body={claimPeriodBodyTemplate}></Column>
                <Column field="token" header="Amount" style={{ width: "16%" }} body={tokenBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TransactionsTable;
