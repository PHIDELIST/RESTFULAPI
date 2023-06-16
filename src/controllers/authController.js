import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }

}

export const register = async (req, res) => {
    const {user_id,username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user= await sql.connect(config.sql);
        const result = await user.request()
            .input('user_id',sql.VarChar,user_id)
            .input('email',sql.VarChar,email)
            .query('SELECT * FROM Users WHERE user_id = @user_id OR email = @email');
            const admin = result.recordset[0];
            if(admin){
                res.status(400).json({message:'User already exists'});
            }else{
        await user.request()
            .input('user_id',sql.INT,user_id)
            .input('username',sql.VarChar,username)
            .input('email',sql.VarChar,email)
            .input('password',sql.VarChar,hashedPassword)
            .query('INSERT INTO Users VALUES (@user_id, @username, @email, @password)');
        res.status(201).json({message:'User created'});
            
            }}catch(error){
                res.status(500).json({message:'opps something went wrong'});

            }finally{
                sql.close();    
            }
}

//User login
export const login = async (req, res) => {
    let { email, password } = req.body;
    let pool= await sql.connect(config.sql);
    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
    const user = result.recordset[0];
    if(!user){
        res.status(400).json({ message: 'userin does not exist' });
    }else{
        if(!bcrypt.compareSync(password, user.password)){
            res.status(400).json({ message: 'Password is incorrect' });
        }else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email}, config.jwt_secret)}`;
            res.status(200).json({ email: user.email, token:token });
        
        }
    
}
};
