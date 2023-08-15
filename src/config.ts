import { config } from 'dotenv';

// Configuration of dotenv
config();

// Export configuration object
export default {
    port               : process.env.PORT || 3033,
    user_db            : process.env.USER_DB?.toString() || 'db_a9a751_nuvianbd_admin',
    pass_db: process.env.PASSWORD_DB?.toString() || 'Nv2023!.',
    server_db          : process.env.SERVER_DB?.toString() || 'SQL8001.site4now.net',
    name_db            : process.env.NAME_DB?.toString() || 'db_a9a751_nuvianbd',
    user_db_tokens: process.env.USER_DB_TOKENS?.toString() || 'db_a9a751_nuviantoken_admin',
    password_db_tokens: process.env.PASSWORD_DB_TOKENS?.toString() || 'Nt2023!.',
    server_db_tokens: process.env.SERVER_DB_TOKENS?.toString() || 'SQL8001.site4now.net',
    name_db_tokens: process.env.NAME_DB_TOKENS?.toString() || 'db_a9a751_nuviantoken',
    fmc_server_key     : process.env.FMC_SERVER_KEY?.toString() || ''
}