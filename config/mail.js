// Copy in your particulars and rename this to mail.js
module.exports = {
  service: "gmail",
//  host: "smtp.sendgrid.net",
  port: 587,
  secureConnection: false,
  //name: "servername",
  auth: {
    user: "paul.boyce@goobito.com",
    pass: "l1sb0a2013"
  },
  ignoreTLS: false,
  debug: false,
  maxConnections: 5 // Default is 5
}
