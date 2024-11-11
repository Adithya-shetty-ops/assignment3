const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const logger = require('../utils/logger');

beforeAll(async () => {
    const dbURI = 'mongodb://localhost:27017/userDBTest';
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    let userId;

    test('should create a new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        userId = response.body._id; // Store the created user's ID for future tests
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
        expect(response.body.age).toBe(newUser.age);
    });

    test('should get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should update a user', async () => {
        const updatedUser = {
            name: 'John Doe Updated',
            email: 'john.doe.updated@example.com',
            age: 31
        };

        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.email).toBe(updatedUser.email);
        expect(response.body.age).toBe(updatedUser.age);
    });
});
