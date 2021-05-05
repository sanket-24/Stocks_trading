const stockRouter = require("express").Router();
const User = require("../models/userModel");
const Stock = require("../models/stockModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yahooStockPrices = require('yahoo-stock-prices');

stockRouter.get("/price", async(req, res) => {
    let stock = req.query.stock;
    console.log(stock);
    try {
        const stock_price = await yahooStockPrices.getCurrentData(stock);
        console.log(stock_price);
        res.status(200).json(stock_price);
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
});



stockRouter.get("/mystocks", async(req, res) => {
    
    try {
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        const _id = decodedToken.user;
        let existingUser = await User.findOne({_id});
        console.log(existingUser.email);
        let email = existingUser.email;
        let mystocks = await Stock.find({email});

        let stocks = [];
        for(var i = 0; i < mystocks.length; i++){
            stocks.push(mystocks[i]);
        }
        res.json(stocks);
        console.log(stocks);
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
});

stockRouter.get("/buy", async(req, res) => {

    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        const _id = decodedToken.user;
        let existingUser = await User.findOne({_id});

        let email = existingUser.email;
        let stock_name = req.query.stock;
        let Buying = req.query.price;
        let quantity = req.query.quantity;
        console.log("hII"+existingUser.balance);
        if(parseInt(existingUser.balance) > Math.imul(Buying,quantity)){
            existingUser.balance = parseInt(existingUser.balance) - Math.imul(Buying,quantity);
            await existingUser.save();
            let existingStock = await Stock.findOne({email,stock_name});
            
            if(existingStock != null){
                console.log("Stock existing ",existingStock.quantity);
                let p1 = parseInt(existingStock.Buying);
                console.log(p1);
                let q1 = parseInt(existingStock.quantity);
                console.log(q1);
                let p2 = parseInt(Buying);
                let q2 = parseInt(quantity);
                console.log(p2);
                console.log(q2);
                Buying = (Math.imul(p1,q1) + Math.imul(p2,q2));
                console.log(Buying);
                Buying = Buying / (q1+q2);
                console.log(Buying);
                quantity = parseInt(q1)+parseInt(q2);
                console.log(quantity);
                
                existingStock.quantity = parseInt(quantity);
                existingStock.Buying = parseInt(Buying);
                await existingStock.save();
                
                res.status(200).send("Order placed.");
                res.end();

            }
            else{
                console.log(stock_name+Buying+quantity);
                const newStock = new Stock({
                    email,stock_name,Buying,quantity
                });
                const savedStock = await newStock.save();
                console.log("Stock Saved");
                console.log(savedStock._id);
                res.status(200).send("Order placed.");
                res.end();
            }

        }
        else{
            res.status(200).send("Low Balance !!");
            res.end();
        }

        
        //console.log("Stock Saving ",existingStock.quantity);
        
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }

    
});

stockRouter.get("/sell", async(req, res) => {

    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        const _id = decodedToken.user;
        let existingUser = await User.findOne({_id});

        let email = existingUser.email;
        let stock_name = req.query.stock;
        let Selling = req.query.price;
        let quantity = req.query.onsell;
        console.log(email,stock_name,quantity);
        console.log("hII"+existingUser.balance);
        let existingStock = await Stock.findOne({email,stock_name});
            
            if(existingStock != null){
                console.log("Stock existing ",existingStock.quantity);
                let p1 = parseInt(existingStock.Buying);
                console.log(p1);
                let q1 = parseInt(existingStock.quantity);
                console.log(q1);
                existingUser.balance = parseInt(existingUser.balance) + parseInt(Math.imul(Selling,quantity));
                existingUser.save();
                existingStock.quantity = q1 - parseInt(quantity);
                existingStock.save();
                console.log(existingStock.quantity);
                console.log(existingUser.balance);
                res.status(200).send("Order placed.");
                res.end();
            }
            else{
                res.status(500).send("Stock not available in portfolio !!");
                res.end();
            }
        
        //console.log("Stock Saving ",existingStock.quantity);
        
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }

    
});








module.exports = stockRouter;