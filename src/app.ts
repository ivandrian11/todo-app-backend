import express from 'express';
import todoRoutes from './routes/todo.route';

const app = express();
const PORT = 5000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint ini hanya memberikan informasi bahwa server berjalan
app.get('/', (req, res) => {
  res.send('Silakan akses /api/todos untuk menggunakan API Todo');
});

// Menggunakan router dengan prefix /api/todos
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
