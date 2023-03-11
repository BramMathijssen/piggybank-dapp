import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useRef, useState, useEffect } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import EthersContext from "../../../context/ethers-context";
import { getClaimPeriodString } from "../../../helpers/getClaimPeriodString";
import { getNameByAddress, getSymbolByAddress } from "../../../helpers/getTokenDetailsbyAddress";
import { unixTimestampToReadable } from "../../../helpers/unixToDate";
import { useEvent } from "../../../hooks/useEvent";

import styles from "./Transactions.module.scss";

const Transactions = () => {
    const [transactions, setTransactions] = useState();
    const [parentAddress, setParentAddress] = useState();
    const ethersCtx = useContext(EthersContext);
    const parentTokens = useEvent("TokenCreated", ethersCtx.userAddress, parentAddress);

    useEffect(() => {
        const getMyParentAndClaim = async () => {
            if (!ethersCtx.contract) return;

            const parentAddressTemp = await ethersCtx.contract.childToParentMapping(ethersCtx.userAddress);
            setParentAddress(parentAddressTemp);

            // const claimTx = await ethersCtx.contract.parentToChildMappingNested(parentTx, ethersCtx?.userAddress);
            // setMyClaim(claimTx);

            // const currentTime = await ethersCtx.contract.getCurrentTime();
            // const timeLeftTemp = claimTx.nextClaimPeriod.toNumber() - currentTime.toNumber();
            // setTimeLeft(timeLeftTemp);
        };
        getMyParentAndClaim();
    }, [ethersCtx]);

    useEffect(() => {
        if (!ethersCtx.userAddress && !parentAddress) {
            console.log(`no user address or parent address found, aborting`);
            return;
        }

        const getEvents = async () => {
            const eventFilter = ethersCtx.contract.filters.AllowanceClaimed(parentAddress, ethersCtx.userAddress);
            const events = await ethersCtx.contract.queryFilter(eventFilter);

            setTransactions(events);
        };

        getEvents();
    }, [ethersCtx]);

    console.log(transactions);

    const avatarBodyTemplate = (rowData) => {
        return (
            <div>
                <Jazzicon diameter={35} seed={jsNumberForAddress(rowData.args.child.tokenPreference)} />
            </div>
        );
    };

    const nameAddressBodyTemplate = (rowData) => {
        const tokenName = getNameByAddress(parentTokens, rowData.args.child.tokenPreference);
        return (
            <div className={styles.nameBody}>
                <div className={styles.flexContainer}>
                    <span>{tokenName}</span>
                    <p>{rowData.args.child.tokenPreference}</p>
                </div>
            </div>
        );
    };

    const claimPeriodBodyTemplate = (rowData) => {
        const { formattedDate, formattedTime } = unixTimestampToReadable(rowData.args.timestamp.toString());
        return (
            <div className={styles.nameBody}>
                {formattedDate} {formattedTime}
            </div>
        );
    };

    const tokenBodyTemplate = (rowData) => {
        const tokenSymbol = getSymbolByAddress(parentTokens, rowData.args.child.tokenPreference);

        return (
            <div className={styles.amountClaimed}>
                <p>
                    +{rowData.args.child.claimableAmount.toString()} {tokenSymbol}
                </p>
                <p></p>
            </div>
        );
    };

    return (
        <div className={styles.transactions}>
            <div className="card">
                <DataTable value={transactions} scrollable scrollHeight="500px" paginator rows={6} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="avatar" style={{ width: "1%" }} body={avatarBodyTemplate}></Column>
                    <Column field="" header="Name" style={{ width: "15%" }} body={nameAddressBodyTemplate}></Column>
                    <Column field="period" header="Claim Moment" style={{ width: "25%" }} body={claimPeriodBodyTemplate}></Column>
                    <Column field="token" header="Amount" style={{ width: "16%" }} body={tokenBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Transactions;
