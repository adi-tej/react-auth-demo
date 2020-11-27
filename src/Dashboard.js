import React, {useEffect, useState} from 'react';
import api from "./axios";
import DataGrid, { Column, Selection, Summary, GroupItem, SortByGroupSummaryInfo } from 'devextreme-react/data-grid';

const Dashboard = () => {
    const [dataset, setDataset] = useState([])
    async function getIssues(project){
        api.get('/issues?project='+project.id).then(res=>{
            if(res.status === 200){
                res.data.forEach(issue => {
                    dataset.push({
                        project : project.name,
                        owner : issue.owner,
                        type: issue.type,
                        id: issue.id,
                        voters: issue.total_voters,
                        watchers: issue.total_watchers,
                        status: issue.status
                    })
                })
            }else{
                console.log("Server Error")
            }
        }).catch(() => {
            console.log("Server Error")
        })
    }
    function getData(){
        const promises = [];
        api.get('/projects').then(res=>{
            if(res.status === 200){
                console.log(res.data)
                res.data.forEach(project => {
                    promises.push(getIssues(project))
                })
            }else{
                console.log("Server Error")
            }
        }).catch(() => {
            console.log("Server Error")
        })
        Promise.all(promises).then(arrOfResults => {
            setDataset(dataset)
        });
    }



    useEffect(() => {
        getData()
    },[getData])

    return(
        <div>
            <h1>Welcome to Dashboard</h1>
            {dataset.forEach((project,index) => (
                <div key={index}>{project.name}</div>
            ))}
            <DataGrid
                id="gridContainer"
                dataSource={dataset}
                keyExpr="id"
                showBorders={true}
            >
                <Selection mode="single" />
                <Column dataField="project" groupIndex={0}/>
                <Column dataField="owner" groupIndex={1} width={160} caption="Owner"  />
                <Column dataField="type" groupIndex={2} caption="Type" />
                <Column dataField="status" groupIndex={3} caption="Status" />
                <Column dataField="voters" alignment="right" caption="Voters" />
                <Column dataField="watchers" alignment="right" caption="Watchers" />

                <Summary>
                    <GroupItem
                        column="Voters"
                        summaryType="sum"
                        showInGroupFooter={false} />
                    <GroupItem
                        column="Watchers"
                        summaryType="sum"
                        showInGroupFooter={false} />
                </Summary>
                <SortByGroupSummaryInfo summaryItem="count" />
            </DataGrid>
        </div>
    )
}
export default Dashboard
