const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    dob: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    // create method used in signup section
    create: async (data, callback) => {
        try {
            const user = new User(data);
            const result = await user.save();
            callback(null, result);
        } catch (err) {
            callback(err, null);
        }
    },

    // method to get all employees from the database
    getUsers: async (callback) => {
        try {
            const results = await User.find();
            callback(null, results);
        } catch (err) {
            callback(err, null);
        }
    },

    // method to get employee by id
    getById: async (id, callback) => {
        try {
            const result = await User.findById(id);
            callback(null, result);
        } catch (err) {
            callback(err, null);
        }
    },

    // method to get employee by email
    getByEmail: async (email, callback) => {
        try {
            const result = await User.findOne({ email: email });
            callback(null, result);
        } catch (err) {
            callback(err, null);
        }
    },

    // method for cron job
    getAllUsers: async (callback) => {
        try {
            const results = await User.find();
            callback(results);
        } catch (err) {
            callback(err);
        }
    }
};