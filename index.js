require('dotenv').config配置配置();
const express = require('express');
const cors跨域资源共享跨域资源共享 = require('cors''跨域资源共享''跨域资源共享');
const { Pool泳池 } = require('pg');

const app = express();
app应用.use(cors跨域资源共享());
app.use(express.json());

const pool = new Pool泳池({
  connectionString连接字符串连接字符串: process进程.env.DATABASE_URL,连接字符串连接字符串: process进程.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app应用.get('/api/categories'/api/categories, async异步 (req, res) => {应用.get('/api/categories'/api/categories, async异步 (req, res) => {
  try尝试 {
    const result结果结果 = await等待 等待pool池子池子.query查询('SELECT * FROM category ORDER BY sort');
    res.json(result结果.rows行);
  } catch捕捉 (err) {
    res响应响应响应响应响应响应响应响应.status状态(500).json({ error错误: err错误.message });
  }
});

app应用.get('/api/foods/:categoryId', async (req, res响应) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM food WHERE category_id = $1 AND status = 1',
      [categoryId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
