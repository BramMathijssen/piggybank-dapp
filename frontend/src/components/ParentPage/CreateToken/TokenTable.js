import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

import styles from "./TokenTable.module.scss";
import { weiToEth } from "../../../helpers/weiToEth";
import LoadingSpinner from "../../UI/LoadingSpinner";
import EthersContext from "../../../context/ethers-context";

const TokenTable = ({ tokens }) => {
    const ethersCtx = useContext(EthersContext);

    const avatarColumnTemplate = (rowData) => {
        console.log(rowData);
        return (
            <div className={styles.avatarColumn}>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData.tokenAddress)} />
            </div>
        );
    };

    const nameAddressColumnTemplate = (rowData) => {
        return (
            <div className={styles.nameAddressColumn}>
                <span className={styles.name}>{rowData.name}</span>
                <p className={styles.address}>{rowData.tokenAddress}</p>
            </div>
        );
    };

    const tokenSymbolColumnTemplate = (rowData) => {
        return (
            <div className={styles.tokenSymbolColumn}>
                <p className={styles.tokenSymbol}>{rowData.symbol} </p>
            </div>
        );
    };

    const tokenSupplyColumnTemplate = (rowData) => {
        return (
            <div className={styles.tokenSupplyColumn}>
                <p className={styles.tokenSupply}>{weiToEth(rowData.supply.toString())} </p>
            </div>
        );
    };

    return (
        <div className="card">
            {ethersCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable value={tokens} scrollable scrollHeight="450px" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="avatar" style={{ width: "1%" }} body={avatarColumnTemplate}></Column>
                    <Column field={tokens.name} header="Token Name" style={{ width: "15%" }} body={nameAddressColumnTemplate}></Column>
                    <Column field="amount" header="Symbol" style={{ width: "25%" }} body={tokenSymbolColumnTemplate}></Column>
                    <Column field="period" header="Total Supply" style={{ width: "25%" }} body={tokenSupplyColumnTemplate}></Column>
                </DataTable>
            )}
        </div>
    );
};

export default TokenTable;
