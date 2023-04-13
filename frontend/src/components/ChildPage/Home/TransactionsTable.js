import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import EthersContext from "../../../context/ethers-context";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import { unixToDate } from "../../../helpers/unixToDate";
import { weiToEth } from "../../../helpers/weiToEth";
import { useEvent } from "../../../hooks/useEvent";
import { useEventCustom } from "../../../hooks/useEventCustom";

import styles from "./TransactionsTable.module.scss";

const TransactionsTable = ({ parentAddress, claimed }) => {
    const ethersCtx = useContext(EthersContext);
    const parentTokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    // filters for AllowanceClaimed event, and gets the 2nd and 4th argument of the event (2= child, 4= timestamp), filters for the child's parent and the current user address
    const transactions = useEventCustom("AllowanceClaimed", claimed, [2, 4], parentAddress, ethersCtx.userAddress);

    const avatarColumnTemplate = (rowData) => {
        return (
            <div>
                <Jazzicon diameter={30} seed={jsNumberForAddress(rowData[0].tokenPreference)} />
            </div>
        );
    };

    const nameAddressColumnTemplate = (rowData) => {
        const tokenName = getNameByAddress(parentTokens, rowData[0].tokenPreference);
        return (
            <div className={styles.nameAddressColumn}>
                <span className={styles.name}>{tokenName}</span>
                <p className={styles.address}>{rowData[0].tokenPreference}</p>
            </div>
        );
    };

    const claimMomentColumnTemplate = (rowData) => {
        const { formattedDate, formattedTime } = unixToDate(rowData[1].toString());
        return (
            <div className={styles.claimMomentColumn}>
                <p className={styles.claimDate}>{formattedDate}</p>
                <p className={styles.claimTime}> {formattedTime}</p>
            </div>
        );
    };

    const amountColumnTemplate = (rowData) => {
        const tokenSymbol = getSymbolByAddress(parentTokens, rowData[0].tokenPreference);
        return (
            <div className={styles.amountClaimedColumn}>
                <p className={styles.amount}>
                    +{weiToEth(rowData[0].claimableAmount.toString())} {tokenSymbol}
                </p>
            </div>
        );
    };

    return (
        <div className={styles.transactions}>
            <DataTable value={transactions} scrollable scrollHeight="500px" paginator rows={6} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "1%" }} body={avatarColumnTemplate}></Column>
                <Column field="" header="Claimed Token" style={{ width: "15%" }} body={nameAddressColumnTemplate}></Column>
                <Column field="period" header="Claim Moment" style={{ width: "15%" }} body={claimMomentColumnTemplate}></Column>
                <Column field="token" header="Amount" style={{ width: "16%" }} body={amountColumnTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TransactionsTable;
