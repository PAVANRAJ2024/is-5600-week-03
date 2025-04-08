const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for chat messages
let messages = [];

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Chat API!' });
});

// Get all chat messages
app.get('/chat', (req, res) => {
    res.json({ messages });
});

// Post a new chat message
app.post('/chat', (req, res) => {
    const { username, message } = req.body;

    // Basic validation
    if (!username || !message) {
        return res.status(400).json({
            error: 'You must provide both username and message.'
        });
    }

    // Create new message object
    const newMessage = {
        username,
        message,
        timestamp: new Date().toISOString()
    };

    // Add to message list
    messages.push(newMessage);

    res.status(201).json({
        message: 'Message sent successfully.',
        data: newMessage
    });
});

// Catch-all route for undefined paths
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found.'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/`);
});
