import { Subject } from 'rxjs';
const apiLoader = new Subject<boolean>();
const toast = new Subject<{ message: String, type: string }>();
const toastPopup = new Subject<{ message: String, label?: string }>();
export { apiLoader, toast, toastPopup }
export default class Utils {
    public static getDateMaterialFormat(date?: Date): string {
        const d = date ? date : new Date();
        const month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1)
        const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        const mins = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
        return `${d.getFullYear()}-${month}-${day}T${hour}:${mins}`
    }

    private static getDaysHourSeconds(seconds: number | string) {
        const totalSeconds = Number(seconds) % 60;
        const minutes = Math.floor(Number(seconds) / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return { seconds: totalSeconds, minutes: minutes % 60, hours: hours % 24, days: days };
    }

    public static formatSeconds(seconds: number | string): boolean | string {
        if (typeof seconds === 'string') { return seconds; }
        const gP: Function = (s: number) => s > 1 ? 's' : '';
        if (seconds === 0) return false;
        const time = this.getDaysHourSeconds(seconds);
        const days = time.days ? `${time.days} Day${gP(time.days)} ` : '';
        const hour = time.hours || days ? `${time.hours} Hour${gP(time.hours)} ` : '';
        const minutes = time.minutes || hour ? `${time.minutes} Minute${gP(time.minutes)} ` : '';
        const sec = time.seconds || minutes ? `${time.seconds} Second${gP(time.seconds)} ` : '';
        return `${days}${hour}${minutes}${sec}`
    }

}