import { auth } from "firebase";

export default class Utils {
    public static validateOtp(authData, otp) {
        if (!authData || otp != authData.secret) return false;

        return otp == authData.secret && ((new Date().valueOf() - new Date(authData.date).valueOf()) / 1000 < 600)
    }
    public static getRand(min, max) {
        return Math.floor((Math.random() * (max - min) + min))
    }
    public static mail(email, code) {
        return new Promise((resolve, reject) => {
            require('nodemailer').createTransport({
                service: 'gmail',
                auth: { user: process.env.authUser, pass: process.env.authUserPass }
            })
                .sendMail(Utils.formEmail(email, code), (error, info) => {
                    if (info) {
                        resolve(true)
                        return;
                    }
                    reject(error)
                })
        })
    }

    private static formEmail(email, code) {
        return {
            from: process.env.authUser,
            to: email,
            subject: 'Quizzer verification code (Expires in 10 minutes)',
            html: `<h1>${code}</h1>`,
            priority: "high"
        };
    }
}