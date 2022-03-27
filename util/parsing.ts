// @ts-nocheck

export type TransactionRow = {
    date: string,
    description: string,
    amount: number,
    type: 'debit' | 'credit'
}

const bankIdentifiers = {
    'HDFC': (text:string)=>Boolean(text.match('HDFC Bank')?.length),
}

const transactionIdentifiers = {
    'HDFC': new RegExp(/((0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]20\d\d)(.*?)([0-9,]+\.\d\d)(.\w\w)?/g)
}

const transactionsPostprocessors = {
    'HDFC': (transactions:string[])=>transactions.filter((transaction)=>!transaction.match(/(Payment Due Date)/g)) 
}

const transactionParser = {
    'HDFC': (transactions:string[])=>{
        const matcher = new RegExp(/((0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]20\d\d)(.*?)([0-9,]+\.\d\d)(.\w\w)?/g)
        return transactions.map((transaction)=>{
            matcher.lastIndex = 0;
            const groups = matcher.exec(transaction);
            const trxnObj: TransactionRow = {
                date: groups[1].trim(),
                description: groups[4].trim(),
                amount: parseFloat(groups[5].trim().replace(/,/g, '')),
                type: groups?.length===7 && groups[6] && groups[6].trim() == 'Cr'?'credit':'debit'
            }
            return trxnObj;
        })
    }
    
}

export function getTransactionData(text:string[]): any{
    const combinedText = text.join(" ");
    const bank = identifyBank(combinedText);
    const transactionStrings = getTransactionStrings(combinedText, bank);

    return transactionParser[bank](transactionStrings);

}

function getTransactionStrings(data:string, bank:string){
    if(bank){
    const transactions =  Array.from(data.matchAll(transactionIdentifiers[bank]), (match)=>match[0]);
    return transactionsPostprocessors[bank](transactions);
    }
    return [];
}

function identifyBank(data:string){
    for(const [bank, identifier] of Object.entries(bankIdentifiers)){
        if(identifier(data)){
            return bank;
        }
    }
    throw new Error('Unable to identify bank')
}


