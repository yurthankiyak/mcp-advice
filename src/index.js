import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/mcp', async (req: Request, res: Response) => {
  const { method, params, id } = req.body;

  if (!method || !id) {
    return res.status(400).json({ error: 'Invalid MCP JSON-RPC request' });
  }

  switch (method) {
    case 'initialize':
      return res.json({
        jsonrpc: '2.0',
        id,
        result: {
          name: 'Advice Slip MCP Server',
          version: '1.0.0',
          description: 'MCP server wrapping Advice Slip API',
        },
      });

    case 'tools/list':
      return res.json({
        jsonrpc: '2.0',
        id,
        result: [
          {
            name: 'getAdvice',
            description: 'Get a random advice slip',
            parameters: {},
          },
        ],
      });

    case 'tools/invoke':
      if (params.tool === 'getAdvice') {
        try {
          const response = await fetch('https://api.adviceslip.com/advice');
          const data = await response.json();
          return res.json({
            jsonrpc: '2.0',
            id,
            result: data.slip.advice,
          });
        } catch (error) {
          return res.json({
            jsonrpc: '2.0',
            id,
            error: 'Failed to fetch advice',
          });
        }
      } else {
        return res.json({
          jsonrpc: '2.0',
          id,
          error: 'Unknown tool',
        });
      }

    default:
      return res.json({
        jsonrpc: '2.0',
        id,
        error: 'Method not implemented',
      });
  }
});

app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
});
