import sql from 'mssql';
import config from '../db/config.js';
//creating a new comment 
export const createComment = async (req, res) => {
    try{
        const{comment_id, content, user_id, post_id} = req.body;
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('comment_id', sql.Int, comment_id)
        .input('content', sql.VarChar(200), content)
        .input('user_id', sql.Int, user_id)
        .input('post_id', sql.Int, post_id)
        .query('INSERT INTO comments VALUES (@comment_id, @content, @user_id, @post_id)');
        res.json({message: 'post commented successfully'});
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    } 
}
//Geting a specific comment
export const getComment = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        const comment = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM comments WHERE comment_id = @id');
        res.json(comment.recordset[0]);
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    } 

}
//updating a specific comment

export const updateComment = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        const comment = await pool.request()
        .input('id', sql.Int, req.params.id)
        .input('content', sql.VarChar(200), req.body.content)
        .query('UPDATE comments SET content = @content WHERE comment_id = @id');
        res.json({message: 'comment updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }finally{
        sql.close();
    }
    

}
//deleting a specific comment
export const deleteComment = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        const comment = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM comments WHERE comment_id = @id');
        res.json({message: 'comment deleted successfully'});
        
    }catch(error){
        res.status(500).json({message: error.message});
    }finally{
        sql.close();
    }
}