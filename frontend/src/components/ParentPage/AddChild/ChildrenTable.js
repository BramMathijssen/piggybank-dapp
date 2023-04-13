import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { unixToDate } from "../../../helpers/unixToDate";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";

import styles from "./ChildrenTable.module.scss";
import { useEvent } from "../../../hooks/useEvent";
import EthersContext from "../../../context/ethers-context";
import { weiToEth } from "../../../helpers/weiToEth";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Table = ({ children }) => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    const avatarColumnTemplate = (rowData) => {
        return (
            <div className={styles.avatarColumn}>
                <Jazzicon diameter={30} seed={jsNumberForAddress(rowData.childAddress)} />
            </div>
        );
    };

    const nameAddressColumnTemplate = (rowData) => {
        return (
            <div className={styles.nameAddressColumn}>
                <span className={styles.name}>{rowData.name}</span>
                <p className={styles.address}>{rowData.childAddress}</p>
            </div>
        );
    };

    const baseAmountColumnTemplate = (rowData) => {
        const tokenSymbol = getSymbolByAddress(tokens, rowData.tokenPreference);
        return (
            <div className={styles.baseAmountColumn}>
                <p className={styles.baseAmount}>{weiToEth(rowData.baseAmount.toString())} </p>
                <p className={styles.tokenSymbol}>{tokenSymbol}</p>
            </div>
        );
    };

    const claimPeriodColumnTemplate = (rowData) => {
        const claimPeriod = getClaimPeriodString(rowData.claimPeriod);
        return (
            <div className={styles.claimPeriodColumn}>
                <p className={styles.claimPeriod}>{claimPeriod}</p>
            </div>
        );
    };

    const nextClaimColumnTemplate = (rowData) => {
        const { formattedDate, formattedTime } = unixToDate(rowData.nextClaimPeriod);
        return (
            <div className={styles.nextClaimColumn}>
                <span className={styles.claimDate}>{formattedDate}</span>
                <p className={styles.claimTime}>{formattedTime}</p>
            </div>
        );
    };

    const tokenColumnTemplate = (rowData) => {
        const tokenName = getNameByAddress(tokens, rowData.tokenPreference);
        return (
            <div className={styles.tokenColumn}>
                <span className={styles.tokenName}>{tokenName}</span>
                <p className={styles.tokenAddress}>{rowData.tokenPreference}</p>
            </div>
        );
    };

    return (
        <div className="card">
            {ethersCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable value={children} scrollable scrollHeight="450px" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="avatar" style={{ width: "1%" }} body={avatarColumnTemplate}></Column>
                    <Column field={children.name} header="Name" style={{ width: "15%" }} body={nameAddressColumnTemplate}></Column>
                    <Column field="amount" header="Base Allowance" style={{ width: "25%" }} body={baseAmountColumnTemplate}></Column>
                    <Column field="period" header="Period" style={{ width: "25%" }} body={claimPeriodColumnTemplate}></Column>
                    <Column field="nextClaim" header="Next Claim" style={{ width: "25%" }} body={nextClaimColumnTemplate}></Column>
                    <Column field="token" header="Token" style={{ width: "25%" }} body={tokenColumnTemplate}></Column>
                </DataTable>
            )}
        </div>
    );
};

export default Table;
