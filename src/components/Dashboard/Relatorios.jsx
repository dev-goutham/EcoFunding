import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    background-color: #f9f9f9;
    min-height: 100vh;
    width: 100%;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
const Reports = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    width: 100%;
    height: 100%;
`;
const DownloadButton = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

function Relatorios() {
    const [reports, setReports] = useState([]);
    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        const fetchReports = async () => {
            const querySnapshot = await getDocs(collection(db, "reports"));
            const reportsData = await Promise.all(querySnapshot.docs.map(async (doc) => {
                const fileRef = ref(storage, doc.data().filePath);
                const fileURL = await getDownloadURL(fileRef);
                return { id: doc.id, url: fileURL, title: doc.data().title };
            }));
            setReports(reportsData);
        };
        fetchReports();
    }, []);

    return (
        <Container>
            <Content>
                {reports.map(report => (
                    <Reports key={report.id}>
                        <h1>{report.title}</h1>
                        <DownloadButton onClick={() => window.open(report.url, "_blank")}>
                            Download Report
                        </DownloadButton>
                    </Reports>
                ))}
            </Content>
        </Container>
    );
}

export default Relatorios;
