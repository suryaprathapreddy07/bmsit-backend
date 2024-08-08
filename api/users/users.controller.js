const { create, getByEmail, getById,getUsers } = require('./users.model');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: async (req, res) => {
        try {
            let body = req.body;
            let salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            const results = await create(body,(err,results)=>{
                if(err){
                    return res.status(500).json({
                        success: 0,
                        message: err.message
                    });
                }else{
                    return res.status(201).json({
                        success: 1,
                        data: results
                    });
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Unable to create account'
            });
        }
    },
    getUsers: async (req, res) => {
        try {
            
            const results = await getUsers((err,results)=>{
                if(err){
                    return res.status(404).json({
                        success: 0,
                        message: err.message
                    });
                }
                const { password, ...filteredData } = results;
                
                return res.status(200).json({
                    success: 1,
                    data: filteredData
                });
            });
            
        } catch (err) {
            return res.status(404).json({
                success: 0,
                message: err.message
            });
        }
    },
    getUserByEmail: async (req, res) => {
        try {
            const email = req.body.email;
            const results = await getByEmail(email,(err,results)=>{
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message:err.message
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
            
        } catch (err) {
            return res.status(404).json({
                success: 0,
                message: err.message
            });
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = req.params.id;
            const results = await getById(id,(err,results)=>{
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message:err.message
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
            
        } catch (err) {
            return res.status(404).json({
                success: 0,
                message: err.message
            });
        }
    },
    login: async (req, res) => {
        console.log('request hit')
        try {
            const body = req.body;
            const results = await getByEmail(body.email,(err,results)=>{
                if (!results) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Invalid credentials'
                    });
                }
                const result = compareSync(body.password, results.password);
                if (result) {
                    results.password = undefined;
                    const jwt = sign({ result: results }, 'jwt123', { expiresIn: '10h' });
                    return res.json({
                        success: 1,
                        message: 'Login successful',
                        token: jwt,
                        user: results
                    });
                }
                return res.json({
                    success: 0,
                    message: 'Invalid credentials'
                });
            });
            
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                success: 0,
                message: 'Invalid credentials'
            });
        }
    }
};