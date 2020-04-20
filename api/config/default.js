const config = {

    baseURL: process.env.BASE_URL,

    secret: process.env.SECRET,

    database: {
        devString: process.env.DEVDB_STRING,
        prodString: process.env.PRODDB_STRING
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_ISSECURE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
}

module.exports = config;