import { Account } from './model/account';
import { ColorScheme } from './model/colorscheme';

const colorSchemes: ColorScheme[] = [
    {
        name: 'ING',
        digitalEuroSymbolColor: '#ED6C23',
        operationsButtonColor: '#525194',
        operationsButtonLabelColor: '#ffffff',
        logoURL: 'https://pbs.twimg.com/profile_images/1694270064403378176/Pyac_Yqp_400x400.png'
    },
    {
        name: 'ABN',
        digitalEuroSymbolColor: '#30706C',
        operationsButtonColor: '#F8D447',
        operationsButtonLabelColor: '#000000',
        logoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-YTZaJEIbB3ZQnvOcrhJPKbc6loB9aARiyb6uYoYCzg&s'
    },
    {
        name: 'RABO',
        digitalEuroSymbolColor: '#1A1B76',
        operationsButtonColor: '#E76F2D',
        operationsButtonLabelColor: '#FFFFFF',
        logoURL: 'https://logonoid.com/images/rabobank-logo.png'
    },
    {
        name: 'Santander',
        digitalEuroSymbolColor: '#D82E20',
        operationsButtonColor: '#D82E20',
        operationsButtonLabelColor: '#FFFFFF',
        logoURL: 'https://1000logos.net/wp-content/uploads/2017/09/santander-emblem.png'
    }
]

export function getColorScheme(name: string) {
    return colorSchemes.find((elem) => elem.name === name);
}

const accounts: Account[] = [
    {
        id: 'alice',
        bank: 'bank1',
        owner: 'Alice Alisson',
        balance: 0,
        dean: 'NL01DEAN0123456789'
    },
    {
        id: 'bob',
        bank: 'bank1',
        owner: 'Bob Bobberts',
        balance: 0,
        dean: 'NL01DEAN9876543210'
    },
    {
        id: 'carlos',
        bank: 'bank2',
        owner: 'Carlos Careless',
        balance: 0,
        dean: 'NL02DEAN5762098312'
    },
    {
        id: 'dan',
        bank: 'bank2',
        owner: 'Dan Dankjewel',
        balance: 0,
        dean: 'NL02DEAN9876543210'
    },
    {
        id: 'bank1-mca',
        bank: 'bank1',
        owner: 'Bank1 MCA',
        balance: 0,
        dean: 'NL01DEAN6789012345'
    },
    {
        id: 'bank2-mca',
        bank: 'bank2',
        owner: 'Bank2 MCA',
        balance: 0,
        dean: 'NL02DEAN6789012331'
    },
];

export function getAccountIdFromDEAN(dean: string) {
    const account = accounts.find((elem) => elem.dean === dean);

    return account.id;
}

export function getAccount(name: string) {
    return accounts.find((elem) => elem.id === name);
}

export function getAccountBankName(name: string) {
    return getAccount(name).bank;
}

export function getIntermediaryBankURL(bankName: string) {
    return `http://${bankName}.localho.st`
}