import { getTransactionData, TransactionRow } from '../util/parsing'

const StatementTable: React.FC<{ data: string[] }> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                   <tbody>
                  {data &&
                    getTransactionData(data).map(
                      (transaction: TransactionRow, index: number) => (
                        <tr
                          key={index}
                          className={`border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                            {index+1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                            {transaction.date}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                            {transaction.description}
                          </td>
                          <td className={`whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 capitalize ${transaction.type==='credit'?'text-green-400':'text-red-400'}`}>
                            {transaction.type}
                          </td>
                          <td className={`whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 `}>
                            {transaction.amount}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default StatementTable
