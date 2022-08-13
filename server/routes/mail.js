const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "449932408858-hio7eibebofsmk26qnrqq62sa03j33ev.apps.googleusercontent.com", 
    "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",
    "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
    refresh_token: "1//049ArXXskzHMsCgYIARAAGAQSNwF-L9IrUmS4woCzUKjiqMb936V2gnIe7zi6kEVg6sJCLanfRsLecNOlYLjpmLdThUd3dFh7da0"
});

module.exports.sendMail = async function (mailOptions, callback) {
    const accessToken = await oauth2Client.getAccessToken()
    console.log("accessToken",accessToken)
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "info.darkthoughts@gmail.com",
            clientId: "449932408858-hio7eibebofsmk26qnrqq62sa03j33ev.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//049ArXXskzHMsCgYIARAAGAQSNwF-L9IrUmS4woCzUKjiqMb936V2gnIe7zi6kEVg6sJCLanfRsLecNOlYLjpmLdThUd3dFh7da0",
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    smtpTransport.sendMail(mailOptions, (error, response) => {
        //error ? callback(error) : callback(response)
        callback(error, response)
        smtpTransport.close();
    });
}