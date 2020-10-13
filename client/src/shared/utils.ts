export default class Utils {
    public static getDateMaterialFormat(date?: Date): string {
        const d = date ? date : new Date();
        const month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1)
        const day = d.getDay() < 10 ? `0${d.getDay()}` : d.getDay();
        const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
        return `${d.getFullYear()}-${month}-${day}T${hour}:${d.getMinutes()}`
    }
}