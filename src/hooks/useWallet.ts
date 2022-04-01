
import { useStore } from 'effector-react';

import {
    $totalBalance,
    $currencies,
    $transactions,
    getCurrenciesFx,
    getTransactionsFx,
    setCurrencies,
    getRateDataFx,
    $rateData
} from '@store/wallet';

import {
    WalletService,
    CryptoCurrencyService
} from '@services';

import type {
    IWalletFinddto,
    IWalletWithdrawDto,
    ICryptoCurrencyGetExchangRateeDto,
    ICryptoCurrencyGetExchangRateResult,
    IWalletExchangeDto
} from '@dtos';

import type {
    IWalletTotalBalance,
    IWalletCurrency,
    IWalletTransaction,
    IWalletRate,
    IWalletWithdrawalSetting
} from '@typing';

interface IUseWallet {
    totalBalance: IWalletTotalBalance,
    currencies: Array<IWalletCurrency>
    transactions: Array<IWalletTransaction>
    rateData: Array<IWalletRate>
    getCurrencies: () => void
    getRateData: () => void
    getTransactions: () => void
    walletsIsCreated: () => boolean
    createWallets: () => Promise<void>
    findWallet: (dto: IWalletFinddto) => Promise<boolean>
    withdraw: (dto: IWalletWithdrawDto) => Promise<any>
    getWithdrawalSettings: (asset: string) => Promise<IWalletWithdrawalSetting>
    getExchangeRate: (dto: ICryptoCurrencyGetExchangRateeDto) => Promise<ICryptoCurrencyGetExchangRateResult>
    exchange: (dto: IWalletExchangeDto) => Promise<any>
}

export const useWallet = (): IUseWallet => {
    const walletService = new WalletService();
    const cryptoCurrencyService = new CryptoCurrencyService();

    const totalBalance = useStore($totalBalance);
    const currencies = useStore($currencies);
    const transactions = useStore($transactions);

    const rateData = useStore($rateData);

    const walletsIsCreated = (): boolean => {
        let createdWallets = [];

        for (const { address } of currencies) {
            if (!address) continue;

            createdWallets.push(address);
        }

        return currencies.length === createdWallets.length;
    }

    const createWallets = async (): Promise<void> => {
        const createdWallets = await walletService.createWallets();

        setCurrencies(createdWallets);
    }

    const getCurrencies = () => {
        getCurrenciesFx();
    }

    const getRateData = () => {
        getRateDataFx();
    }

    const getTransactions = () => {
        getTransactionsFx();
    }

    const findWallet = async (dto: IWalletFinddto): Promise<boolean> => {
        return await walletService.find(dto);
    }

    const withdraw = async (dto: IWalletWithdrawDto): Promise<any> => {
        return await walletService.withdraw(dto);
    }

    const getWithdrawalSettings = async (asset: string): Promise<IWalletWithdrawalSetting> => {
        const settings = await walletService.getWithdrawalSettings();

        return settings.find(s => s.asset === asset);
    }

    const getExchangeRate = async (dto: ICryptoCurrencyGetExchangRateeDto): Promise<ICryptoCurrencyGetExchangRateResult> => {
        return await cryptoCurrencyService.aetExchangeRate(dto);
    }

    const exchange = async (dto: IWalletExchangeDto) => {
        return await walletService.exchange(dto);
    }

    return {
        totalBalance,
        currencies,
        rateData,
        transactions,
        getCurrencies,
        getRateData,
        getTransactions,
        walletsIsCreated,
        createWallets,
        findWallet,
        withdraw,
        getWithdrawalSettings,
        getExchangeRate,
        exchange
    };
}
