var sql = require('mssql');

import config from '../config';

const dbSettings = {
    user     : 'db_a8e270_nuvianbd2_admin',
    password : 'Nuvian123',
    server   : 'sql5102.site4now.net',
    database : 'db_a8e270_nuvianbd2',
    options  : {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

export const getConnetion = async () => {

    try {
      return await sql.connect(dbSettings);   
    } catch (error: any) {
        throw new Error(error);
    }

}
