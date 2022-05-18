import { config } from 'dotenv';

// Configuration of dotenv
config();

// Export configuration object
export default {
    port               : process.env.PORT || 3033,
    user_db            : process.env.USER_DB?.toString() || '',
    pass_db            : process.env.PASSWORD_DB?.toString() || '',
    server_db          : process.env.SERVER_DB?.toString() || '',
    name_db            : process.env.NAME_DB?.toString() || '',
    user_db_tokens     : process.env.USER_DB_TOKENS?.toString() || '',
    password_db_tokens : process.env.PASSWORD_DB_TOKENS?.toString() || '',
    server_db_tokens   : process.env.SERVER_DB_TOKENS?.toString() || '',
    name_db_tokens     : process.env.NAME_DB_TOKENS?.toString() || '',
    fmc_server_key     : process.env.FMC_SERVER_KEY?.toString() || ''
}