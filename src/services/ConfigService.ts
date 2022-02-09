
export class ConfigService {
    static get (value: string): string {
        return import.meta.env[`VITE_APP_${value}`] as string;
    }
}
