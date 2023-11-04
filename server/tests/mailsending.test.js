const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const express = require('express');
const appRouter = require('../routes/routes.js');

describe('Email Sending', () => {
  it('should send an email successfully', async () => {
    const app = express();
    app.use(express.json());
    app.use('/', appRouter);

    const res = await request(app)
      .post('/send-email')
      .send({
        email: 'test@example.com',
        name: 'Test User',
        message: 'This is a test message'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
  });
});
