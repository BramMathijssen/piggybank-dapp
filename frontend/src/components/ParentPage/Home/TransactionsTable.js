import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

import styles from "./TransactionsTable.module.scss";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import { useEvent } from "../../../hooks/useEvent";
import EthersContext from "../../../context/ethers-context";

const TransactionsTable = ({ transactions }) => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    const avatarBodyTemplate = (rowData) => {
        return (
            <div>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData[0].childAddress)} />
            </div>
        );
    };

    const nameAddressBodyTemplate = (rowData) => {
        return (
            <div className={styles.nameBody}>
                <div className={styles.flexContainer}>
                    <span>{rowData[0].name}</span>
                    <p>{rowData[0].childAddress}</p>
                </div>
            </div>
        );
    };

    const claimPeriodBodyTemplate = (rowData) => {
        const claimPeriod = getClaimPeriodString(rowData[0].claimPeriod);
        return (
            <div className={styles.nameBody}>
                <p>{claimPeriod}</p>
            </div>
        );
    };

    const tokenBodyTemplate = (rowData) => {
        const tokenName = getNameByAddress(tokens, rowData[0].tokenPreference);
        const { formattedDate, formattedTime } = unixTimestampToReadable(rowData[1].toString());
        return (
            <div className={styles.amountClaimed}>
                <p>
                    -{rowData[0].claimableAmount.toString()} {tokenName}
                </p>
                <p>
                    {formattedDate} {formattedTime}
                </p>
            </div>
        );
    };

    return (
        <>
            <DataTable value={transactions} scrollable scrollHeight="500px" paginator rows={6} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "1%" }} body={avatarBodyTemplate}></Column>
                <Column field="" header="Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                <Column field="period" header="Claim Moment" style={{ width: "25%" }} body={claimPeriodBodyTemplate}></Column>
                <Column field="token" header="Amount" style={{ width: "16%" }} body={tokenBodyTemplate}></Column>
            </DataTable>
        </>
    );
};

export default TransactionsTable;
