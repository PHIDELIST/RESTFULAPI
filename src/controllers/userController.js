import sql from 'mssql';
import config from '../db/config.js';

//geting a specific user
export const getUser = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        const user = await pool.request()
        .input('user_id', sql.INT, req.params.user_id)
        .query('SELECT * FROM Users WHERE user_id = @user_id');
        res.status(200).json(user.recordset[0]);
    }catch(error){
        res.status(500).json({message: error.message});
    }finally{
        sql.close();
    }
    
}
//updating a specific user
export const updateUser = async (req, res) => {
    try{
        const{user_id, username, email, password} = req.body;
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input ('user_id',sql.INT, user_id)
        .input('usersname', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar,password)
        .query('UPDATE Users SET name = @username, email = @email, password = @password WHERE user_id = @user_id');
        res.status(200).json({message: 'User updated successfully'})
    }catch(error){
        res.status(500).json({message: error.message});    
}finally{
    sql.close();
}
}

//deleting a specific user

export const deleteUser = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('user_id', sql.INT, req.params.user_id)
        .query('DELETE FROM Users WHERE user_id = @user_id');
        res.status(200).json({message: 'User deleted successfully'})
    }catch(error){
        res.status(500).json({message: error.message});
    }finally{
        sql.close();
    }
    

}

