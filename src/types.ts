export interface ITag {
  text: string
}

export enum AccountType {
  LDAP = 'LDAP',
  LOCAL = 'Локальная'
}

export interface IAccount {
  id: string
  tags: ITag[]
  type: AccountType
  login: string
  password: string | null
}

export interface IGenre {
  id: string;
  name: string;
}
