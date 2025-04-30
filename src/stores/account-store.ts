import { defineStore } from 'pinia';
import { IAccount } from 'src/types';

export interface State {
  accounts: IAccount[]
}

export const useAccountStore = defineStore('account', {
  state: (): State => ({
    accounts: [],
  }),
  actions: {
    addAccount(record: IAccount) {
      this.accounts.push(record)
    },
    updateAccount(record: IAccount) {
      const idx = this.accounts.findIndex((account) => account.id === record.id)
      if (idx !== -1) this.accounts[idx] = record
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id)
    },
  },
  persist: true,
});
