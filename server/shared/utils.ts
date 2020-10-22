import { auth } from "firebase";

export default class Utils {
    public static validateOtp(authData, otp) {
        if (!authData || otp != authData.secret) return false;

        return otp == authData.secret && ((new Date().valueOf() - new Date(authData.date).valueOf()) / 1000 < 600)
    }
    public static getRand(min, max) {
        return Math.floor((Math.random() * (max - min) + min))
    }
}