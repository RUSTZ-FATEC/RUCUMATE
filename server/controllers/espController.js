const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const fakeData = [{
            cdt_id: 1,
            cdt_sensor_id: "1",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "25",
            cdt_humidity: "50",
            user_id: "1",
        },
        {
            cdt_id: 2,
            cdt_sensor_id: "2",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "22",
            cdt_humidity: "11",
            user_id: "1",
        },
        {
            cdt_id: 3,
            cdt_sensor_id: "3",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "44",
            cdt_humidity: "87",
            user_id: "3",
        },
        {
            cdt_id: 4,
            cdt_sensor_id: "4",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "32",
            cdt_humidity: "43",
            user_id: "5",
        },
    ];

    res.status(200).json(fakeData);
});

// This route is to find all data from a specific event id

app.get("/data/id/:cdt_id", (req, res) => {
    const fakeData = [{
            cdt_id: 1,
            cdt_sensor_id: "1",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "25",
            cdt_humidity: "50",
            user_id: "1",
        },
        {
            cdt_id: 2,
            cdt_sensor_id: "2",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "22",
            cdt_humidity: "11",
            user_id: "1",
        },
        {
            cdt_id: 5,
            cdt_sensor_id: "2",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "20",
            cdt_humidity: "10",
            user_id: "1",
        },
        {
            cdt_id: 3,
            cdt_sensor_id: "3",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "44",
            cdt_humidity: "87",
            user_id: "3",
        },
        {
            cdt_id: 4,
            cdt_sensor_id: "4",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "32",
            cdt_humidity: "43",
            user_id: "5",
        },
    ];

    const cdt_id = req.params.cdt_id;

    const data = fakeData.find((item) => {
        return item.cdt_id == cdt_id;
    });

    res.status(200).json(data);
});

// This route is to find all data from a specific sensor

app.get("/sensor/id/:cdt_sensor_id", (req, res) => {
    const fakeData = [{
            cdt_id: 1,
            cdt_sensor_id: "1",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "25",
            cdt_humidity: "50",
            user_id: "1",
        },
        {
            cdt_id: 2,
            cdt_sensor_id: "2",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "22",
            cdt_humidity: "11",
            user_id: "1",
        },
        {
            cdt_id: 5,
            cdt_sensor_id: "2",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "20",
            cdt_humidity: "10",
            user_id: "1",
        },
        {
            cdt_id: 3,
            cdt_sensor_id: "3",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "44",
            cdt_humidity: "87",
            user_id: "3",
        },
        {
            cdt_id: 4,
            cdt_sensor_id: "4",
            cdt_local_date: "2020-01-01",
            cdt_temperature: "32",
            cdt_humidity: "43",
            user_id: "5",
        },
    ];

    const cdt_sensor_id = req.params.cdt_sensor_id;

    const data = fakeData.filter((item) => {
        return item.cdt_sensor_id == cdt_sensor_id;
    });

    res.status(200).json(data);
});

app.post("/", (req, res) => {
    const {
        cdt_id,
        cdt_sensor_id,
        cdt_local_date,
        cdt_temperature,
        cdt_humidity,
        user_id,
    } = req.body;

    if (!cdt_id ||
        !cdt_sensor_id ||
        !cdt_local_date ||
        !cdt_temperature ||
        !cdt_humidity ||
        !user_id
    ) {
        return res.status(400).json({
            msg: "Bad Request: cdt_id, cdt_sensor_id, cdt_local_date, cdt_temperature, cdt_humidity, user_id are required!",
        });
    }

    try {
        const data = {
            cdt_id,
            cdt_sensor_id,
            cdt_local_date,
            cdt_temperature,
            cdt_humidity,
            user_id,
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = app;