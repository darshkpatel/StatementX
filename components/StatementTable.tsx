import { getTransactionData, TransactionRow } from "../util/parsing";

const StatementTable: React.FC<{data:string[]}> = ({data}) => {
    return (<>
            <div className="flex flex-col">
    {data && getTransactionData(data).map((transaction:TransactionRow, index:number) => (<div key={index}>
        <div className="flex flex-row">
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.type}</span>
        </div>
    </div>))}
    </div>
    </>)
}
export default StatementTable;