const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// GET all accounts from the db

server.get('/api/accounts', async (req, res) => {
  try {
    const accounts =  await db('accounts');
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'failed to retrieve accounts' });
  }
});

// GET account by ID

server.get('/api/accounts/:id', async (req, res) => {
  try {
    const account =  await db('accounts').where({ id: req.params.id });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: 'failed to retrieve account' });
  }
});

// POST creates a new account

server.post('/api/accounts', async (req, res) => {
  try {
    await db('accounts').insert(req.body);
    res.status(201).json({ message: 'Successfully created an account' });
  } catch (err) {
    res.status(500).json({ message: 'failed to create account' });
  }
});

// PUT updates an existing account

server.put('/api/accounts/:id', async (req, res) => {
  try {
    await db('accounts').where({id: req.params.id}).update(req.body);
    res.status(200).json({ message: 'Successfully updated account' });
  } catch (err) {
    res.status(500).json({ message: 'failed to update account' });
  }
});

// DELETE removes an account from the db

server.delete('/api/accounts/:id', async (req, res) => {
  try {
    await db('accounts').where({id: req.params.id}).del();
    res.status(200).json({ message: 'Successfully deleted account' });
  } catch (err) {
    res.status(500).json({ message: 'failed to delete account' });
  }
});

module.exports = server;
