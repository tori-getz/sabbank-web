
import axios from 'axios';

import { ConfigService } from '../services/ConfigService';

const HTTPClient = axios.create({
    baseURL: ConfigService.get('API_URL')
});

export { HTTPClient };
