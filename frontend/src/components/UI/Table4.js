import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

import styles from "./Table4.module.scss";
import { getClaimPeriodString } from "../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../helpers/UnixToDate";

const Table4 = ({ children }) => {
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

    const baseAmountBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <p>{rowData.baseAmount.toString()}</p>
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

    const nextClaimBodyTemplate = (rowData) => {
        const { formattedDate, formattedTime } = unixTimestampToReadable(rowData.nextClaimPeriod);
        return (
            <div className={styles.claimPeriod}>
                <span>{formattedDate}</span>
                <p>{formattedTime}</p>
            </div>
        );
    };

    const tokenBodyTemplate = (rowData) => {
        return (
            <div>
                <p>{rowData.tokenPreference}</p>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={children} scrollable scrollHeight="250px" paginator rows={4} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "5%" }} body={avatarBodyTemplate}></Column>
                <Column field={children.name} header="Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                <Column field="amount" header="Amount" style={{ width: "25%" }} body={baseAmountBodyTemplate}></Column>
                <Column field="period" header="Period" style={{ width: "25%" }} body={claimPeriodBodyTemplate}></Column>
                <Column field="nextClaim" header="Next Claim" style={{ width: "25%" }} body={nextClaimBodyTemplate}></Column>
                <Column field="token" header="Token" style={{ width: "25%" }} body={tokenBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default Table4;
