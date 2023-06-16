// const express = require("express");
// const app = express();
// const database = require("../../db");
// const Valve = require("../../models/valveModel");

// app.get("/", async (req, res) => {

//     try {
    
//         database.sync();
        
//         const valves = await Valve.findAll();
        
//         res.status(200).json({
//             valves
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             message: error
//         });
//     }
    
// });

// module.exports = app;