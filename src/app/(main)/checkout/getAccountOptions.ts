interface Account {
  billing_account_id: string;
  card_number: string;
  balance: number;
}

export const getAccountOptions = (accounts: Account[]) => {
  const ACCOUNT_OPTIONS = accounts?.map((account) => ({
    value: account.billing_account_id,
    label: account.card_number,
    balance: account.balance,
  }));

  return ACCOUNT_OPTIONS;
};
