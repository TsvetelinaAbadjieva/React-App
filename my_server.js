const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const request = require('request');
const cron = require('node-cron');

app.use(express.json());
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var dataList = [];
var counter = 0;
var date = new Date();
const getData = () => {
    let options = {
        "Method": "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic aGFyZDpoYXJk"
        }
    }

    request("http://hiring.rewardgateway.net/list", options, function (error, response, body) {

        if (error && counter >= 5) reject(error)
        else {
            response = JSON.parse(body);
            if (response.code == 0 && counter < 5) {
                setTimeout(() => {
                    getData();
                    counter++;
                    console.log('counter', counter)
                }, 600)
            }
            dataList = response;
            if (dataList && dataList.length > 0)
                dataList.map((item, index) => item['index'] = index)
        }
    });
}
cron.schedule("30 * * * * *", () => {
    getData();
    date = new Date();
    console.log('fetch data executed at >> ', new Date())
})

const filterEmplyeesByQuery = (dataList, foundItemsIDs) => {
    let results = [];
    console.log('DataList count', dataList.length)
    for (var i = 0; i < dataList.length; i++) {
        for (var j = 0; j < foundItemsIDs.length; j++) {
            if (dataList[i].index.toString() == foundItemsIDs[j].toString()) {
                results.push(dataList[i]);
            }
        }
    }
    console.log(results.length)
    return results;
}

app.get('/list', (req, res, next) => {
    let page = 1;
    let per_page = 20;
    let dataListSend = [];
    if (req.query) {
        page = req.query.page && !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : page;
        per_page = req.query.per_page && !isNaN(parseInt(req.query.per_page)) ? parseInt(req.query.per_page) : per_page;
    }
    let from = (page - 1) * per_page;
    let to = from + per_page;
    if (req.query && req.query.search) {
        let search = req.query.search;
        try {
            let results = filterEmplyeesByQuery(dataList, JSON.parse(search))
            dataListSend = results.slice(from, to);
            let result = {
                data: dataListSend,
                count: results.length,
                date: date
            }
            res.status(200).send(result);
            return
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
            return;
        }
    }
    dataListSend = dataList && dataList.length > 0 ? dataList.slice(from, to) : [];
    let count = dataList.length;
    let result = {
        data: dataListSend,
        count: count,
        date: date
    }
    console.log('Loaded>> ', dataList.length)
    res.status(200).send(result);
    next();
});
app.listen(PORT, () => {
    console.log('Server is listening on ' + PORT)
})