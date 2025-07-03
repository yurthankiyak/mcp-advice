import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/mcp', (req, res) => {
    res.json({ message: 'MCP server is running' });
});

app.post('/mcp', (req, res) => {
    res.json({ received: req.body });
});

app.delete('/mcp', (req, res) => {
    res.json({ message: 'DELETE request received' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
