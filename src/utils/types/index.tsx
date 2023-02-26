export type NavbarProps = {
    user: string;
    logOut: () => void;
}

export type CardProps = {
    label: string;
    value: string;
    color: string;
}

export type Cash = {
    amount: number;   
    description: string;    
}

export type CashInProps = {
    values: Cash[];
    addCash?: () => {};
}

export type CashOutProps = {
    values: Cash[];
    subCash?: () => {};
}

export type OverviewProps = {
    date: string;
    economies: string;
    expenses: string;
}