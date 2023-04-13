import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { unixToDate } from "../../../helpers/unixToDate";
import { getNameByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import { useEvent } from "../../../hooks/useEvent";
import EthersContext from "../../../context/ethers-context";
import { weiToEth } from "../../../helpers/weiToEth";

import styles from "./TransactionsTable.module.scss";

const TransactionsTable = ({ transactions }) => {
    const ethersCtx = useContext(EthersContext);
    const tokens = useEvent("TokenCreated", ethersCtx.userAddress, ethersCtx.userAddress);

    const avatarColumnTemplate = (rowData) => {
        return (
            <div className={styles.avatarColumn}>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData[0].childAddress)} />
            </div>
        );
    };

    const nameAddressColumnTemplate = (rowData) => {
        return (
            <div className={styles.nameAddressColumn}>
                <span className={styles.name}>{rowData[0].name}</span>
                <p className={styles.address}>{rowData[0].childAddress}</p>
            </div>
        );
    };

    const claimPeriodColumnTemplate = (rowData) => {
        const { formattedDate, formattedTime } = unixToDate(rowData[1].toString());
        return (
            <div className={styles.claimPeriodColumn}>
                <p className={styles.dateTime}>
                    {formattedDate} {formattedTime}
                </p>
            </div>
        );
    };

    const tokenColumnTemplate = (rowData) => {
        const tokenName = getNameByAddress(tokens, rowData[0].tokenPreference);
        return (
            <div className={styles.tokenColumn}>
                <p className={styles.token}>{tokenName}</p>
            </div>
        );
    };

    const amountColumnTemplate = (rowData) => {
        return (
            <div className={styles.amountColumn}>
                <p className={styles.amount}>-{weiToEth(rowData[0].claimableAmount.toString())}</p>
            </div>
        );
    };

    return (
        <div className={styles.transactionsTable}>
            <DataTable value={transactions} scrollable scrollHeight="500px" paginator rows={6} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                <Column field="avatar" style={{ width: "1%" }} body={avatarColumnTemplate}></Column>
                <Column field="" header="Name" style={{ width: "30%" }} body={nameAddressColumnTemplate}></Column>
                <Column field="period" header="Claim Moment" style={{ width: "15%" }} body={claimPeriodColumnTemplate}></Column>
                <Column field="token" header="Token" style={{ width: "15%" }} body={tokenColumnTemplate}></Column>
                <Column field="token" header="Amount" style={{ width: "15%" }} body={amountColumnTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default TransactionsTable;
