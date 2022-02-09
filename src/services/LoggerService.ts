
export class LoggerService {
    private name: string;

    public constructor (name: string) {
        this.name = name;
    }

    private generateMsg (msg: string): string {
        return `[${this.name}] ${msg}`;
    }

    public info (msg: string): void {
        console.log(this.generateMsg(msg));
    }

    public error (msg: string): void {
        console.error(this.generateMsg(msg));
    }
}
