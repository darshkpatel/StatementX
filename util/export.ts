export function exportCSVURI(data:any[]){
    const header = ['date', 'description', 'amount', 'type'];
    const csvData = data.map((row)=>Object.values(row).join(",")).join("\n");
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(header.join(',')+'\n'+csvData)
}