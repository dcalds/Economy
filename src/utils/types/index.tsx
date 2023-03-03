export type NavbarProps = {
    data?: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    };
    openSettings?: () => void;
    logOut: () => void;
}

export type CardProps = {
    label: string;
    value: string;
    color: string;
}

export type CashProps = {
    amount: string;
    description: string;
}

export type CashInProps = {
    values: CashProps[];
    setCashIn: (data: InputUserFinancesProps) => void;
    updateCashIn: (data: InputUserFinancesProps, indexEdit: number) => void;
    deleteCashIn: (indexEdit: number) => void;
}

export type CashOutProps = {
    values: CashProps[];
    setCashOut: (data: InputUserFinancesProps) => void;
    updateCashOut: (data: InputUserFinancesProps, indexEdit: number) => void;
    deleteCashOut: (indexEdit: number) => void;
}

export type OverviewProps = {
    date: string;
    economies: string;
    expenses: string;
}

export type InputUserFinancesProps = {
  montlyEco?: string,
  economyEco?: string,
  goalEco?: string,
  cashIn?: {
    amount?: string,
    description?: string,
  },
  cashOut?: {
    amount?: string,
    description?: string,
  },
};