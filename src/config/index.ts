import  dotenv from 'dotenv'
dotenv.config();

export default{
    port:process.env.Port,
    db_url:process.env.DB_URL,
};