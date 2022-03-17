
import { LoggerService } from "./LoggerService";

import {
    setTotalBalance,
    setCurrencies
} from '@store/wallet';

class SocketService {
    private ws = null;
    private logger: LoggerService;

    private channelTypes = {
        sumsub: 'sumsub',
        currencies: 'currency',
        balanceUpdates: 'balance_updates'
    };

    constructor() {
        this.logger = new LoggerService(SocketService.name);

        // @ts-ignore
        if (!!SocketService.instance) {
            // @ts-ignore
            return SocketService.instance;
        }

        // @ts-ignore
        SocketService.instance = this;

        return this;
    }

    public init (url: string) {
        this.ws = new WebSocket(url);

        this.ws.onopen = () => this.logger.info('connected');
        this.ws.onerror = () => this.logger.error('error');

        this.ws.onmessage = e => {
            const parsedData = JSON.parse(e.data);

            if (parsedData.type === this.channelTypes.balanceUpdates) {
                const { amount, data: currencies } = parsedData.data;

                setTotalBalance(amount);
                setCurrencies(currencies);
            }
        }
    }

    public reconnect(url) {
        this.destroy();
        this.init(url);
    }

    public destroy() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default new SocketService();
