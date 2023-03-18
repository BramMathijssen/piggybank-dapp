import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";

import styles from "./ChildrenTable.module.scss";
import { useEvent } from "../../../hooks/useEvent";
import EthersContext from "../../../context/ethers-context";
import { weiToEth } from "../../../helpers/weiToEth";

const Table = ({ children }) => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    const avatarBodyTemplate = (rowData) => {
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
        const tokenSymbol = getSymbolByAddress(tokens, rowData.tokenPreference);
        return (
            <div className={styles.nameBody}>
                <p>{weiToEth(rowData.baseAmount.toString())} </p>
                <p>{tokenSymbol}</p>
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
        const tokenName = getNameByAddress(tokens, rowData.tokenPreference);
        return (
            <div className={styles.token}>
                <span>{tokenName}</span>
                <p>{rowData.tokenPreference}</p>
            </div>
        );
    };

    return (
        <div className="card">
            <DataTable value={children} scrollable scrollHeight="450px" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "5%" }} body={avatarBodyTemplate}></Column>
                <Column field={children.name} header="Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                <Column field="amount" header="Base Allowance" style={{ width: "25%" }} body={baseAmountBodyTemplate}></Column>
                <Column field="period" header="Period" style={{ width: "25%" }} body={claimPeriodBodyTemplate}></Column>
                <Column field="nextClaim" header="Next Claim" style={{ width: "25%" }} body={nextClaimBodyTemplate}></Column>
                <Column field="token" header="Token" style={{ width: "25%" }} body={tokenBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default Table;
