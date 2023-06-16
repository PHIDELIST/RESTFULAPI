import sql from 'mssql';
import config from '../db/config.js';
//creating a new post 
export const createPost = async (req, res) => {
    try{
        const{post_id, title, content, user_id} = req.body;
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('post_id', sql.Int, post_id)
        .input('title', sql.VarChar(50), title)
        .input('content', sql.VarChar(50), content)
        .input('user_id', sql.Int, user_id)
        .query('INSERT INTO posts (post_id, title, content, user_id) VALUES (@post_id, @title, @content, @user_id)');
        res.json({message: 'Post created successfully'});
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    }
    
}
//getting a specific post
export const getPost = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        const post = await pool.request()
        .input('post_id', sql.Int, req.params.id)
        .query('SELECT * FROM posts WHERE post_id = @post_id');
        res.json(post.recordset[0]);
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    }

}
//updating a specific post
export const updatePost = async (req, res) => {
    try{
        const{title, content} = req.body;
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('title', sql.VarChar(50), title)
        .input('content', sql.VarChar(50), content)
        .input('post_id', sql.Int, req.params.id)
        .query('UPDATE posts SET title = @title, content = @content WHERE post_id = @post_id');
        res.json({message: 'Post updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    }


}

//deleting a specific   
export const deletePost = async (req, res) => {
    try{
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('post_id', sql.Int, req.params.id)
        .query('DELETE FROM posts WHERE post_id = @post_id');
        res.json({message: 'Post deleted successfully'});
    }catch(error){
        res.status(500).json({message: error.message});   
    }finally{
        sql.close();
    }


}