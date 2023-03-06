import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

import styles from "./Table2.module.scss";

const Table2 = () => {
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([{ field: "Name", filter: true }, { field: "Address", filter: true }, { field: "Amount" }, { field: "Period" }, { field: "Next Claim" }, { field: "Token" }]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Street</th>
                        <th>Country</th>
                        <th>University</th>
                        <th>IBAN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>000001</td>
                        <td>Lani</td>
                        <td>Ovendale</td>
                        <td>lovendale0@w3.org</td>
                        <td>7850 Old Shore Drive</td>
                        <td>United Kingdom</td>
                        <td>University of Plymouth</td>
                        <td>BG34 MPVP 8782 88EX H1CJ SC</td>
                    </tr>
                    <tr>
                        <td>000002</td>
                        <td>Israel</td>
                        <td>Tassell</td>
                        <td>itassell1@ow.ly</td>
                        <td>245 Merchant Circle</td>
                        <td>Macedonia</td>
                        <td>South East European University</td>
                        <td>FR11 4824 2942 41H9 XBHC 46P2 O86</td>
                    </tr>
                    <tr>
                        <td>000003</td>
                        <td>Eveleen</td>
                        <td>Mercer</td>
                        <td>emercer2@ow.ly</td>
                        <td>70700 Kipling Pass</td>
                        <td>Portugal</td>
                        <td>Instituto Superior Novas Profissões - INP</td>
                        <td>GR96 7559 456P GUAN WTAJ 3VPB S0P</td>
                    </tr>
                    <tr>
                        <td>000004</td>
                        <td>Conn</td>
                        <td>Whitley</td>
                        <td>cwhitley3@wsj.com</td>
                        <td>03 Service Terrace</td>
                        <td>Albania</td>
                        <td>Epoka University</td>
                        <td>LI59 1813 2T7T VKTO 6RKE X</td>
                    </tr>
                    <tr>
                        <td>000005</td>
                        <td>Cherye</td>
                        <td>Smitheram</td>
                        <td>csmitheram4@rambler.ru</td>
                        <td>9 Eliot Parkway</td>
                        <td>Indonesia</td>
                        <td>Universitas Mahasaraswati Denpasar</td>
                        <td>BR27 4570 4226 4255 5239 0197 316T J</td>
                    </tr>
                    <tr>
                        <td>000006</td>
                        <td>Bunnie</td>
                        <td>Sked</td>
                        <td>bsked5@51.la</td>
                        <td>03418 Ludington Plaza</td>
                        <td>Nigeria</td>
                        <td>Federal University of Technology, Minna</td>
                        <td>ES45 6721 1332 3288 6455 1242</td>
                    </tr>
                    <tr>
                        <td>000007</td>
                        <td>Helaine</td>
                        <td>Crother</td>
                        <td>hcrother6@opera.com</td>
                        <td>7932 Sloan Park</td>
                        <td>Philippines</td>
                        <td>Saint Ferdinand College</td>
                        <td>GB50 HFAD 8121 3729 9841 31</td>
                    </tr>
                    <tr>
                        <td>000008</td>
                        <td>Tana</td>
                        <td>Ajean</td>
                        <td>tajean7@sfgate.com</td>
                        <td>2 Schurz Junction</td>
                        <td>China</td>
                        <td>Xi'an University of Electronic Science and Technology</td>
                        <td>KZ85 7422 XDPB P2VQ H8SR</td>
                    </tr>
                    <tr>
                        <td>000009</td>
                        <td>Sollie</td>
                        <td>Greenrde</td>
                        <td>sgreenrde8@wikispaces.com</td>
                        <td>055 Mockingbird Way</td>
                        <td>Russia</td>
                        <td>St. Petersburg State Mining Institute (Technical University)</td>
                        <td>CH61 6423 9T4W WP0I 8MUK C</td>
                    </tr>
                    <tr>
                        <td>000010</td>
                        <td>Vernon</td>
                        <td>Millington</td>
                        <td>vmillington9@marketwatch.com</td>
                        <td>74 David Pass</td>
                        <td>Portugal</td>
                        <td>Instituto Politécnico de Setúbal</td>
                        <td>ES71 2390 0665 1601 8072 4924</td>
                    </tr>
                    <tr>
                        <td>000011</td>
                        <td>Willard</td>
                        <td>Speares</td>
                        <td>wspearesa@hao123.com</td>
                        <td>4237 Moulton Park</td>
                        <td>China</td>
                        <td>Chongqing University of Science and Technology </td>
                        <td>BE21 5598 4355 8287</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Table2;
