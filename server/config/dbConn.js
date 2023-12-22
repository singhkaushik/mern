import mysql from "mysql2/promise";
const dbConfig ={
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database
};
const createConnection =async()=>{
    const connection=await mysql.createConnection(dbConfig);
    return connection;
}
export default createConnection;