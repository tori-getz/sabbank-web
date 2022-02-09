
import {
    SocketService,
    ConfigService
} from '@services';

import { useEffect } from 'react';

import { $accessToken } from '@store/auth';
import { useStore } from 'effector-react';

export const useSocket = () => {
    const accessToken = useStore($accessToken);

    useEffect(() => {
        if (!accessToken) return;
        
        const connectionUrl: string = `${ConfigService.get('SOCKET_URL')}/?token=${accessToken}`;

        SocketService.reconnect(connectionUrl);
    }, [accessToken]);
}
