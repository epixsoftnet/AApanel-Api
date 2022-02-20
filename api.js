require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const md5 = require('md5');
const querystring = require('querystring');
const { Curl } = require('node-libcurl');

app.use(bodyParser.json());

app.get('/GetLogs', async (req, res) => {
    keys = await GetKeyData();
    url = process.env.bt_url + '/system?action=GetNetWork';
    p_data = {
        "request_token" : keys.request_token,
        "request_time"  : keys.request_time,
        "action"        : 'GetNetWork'
    }
    HttpPostCookie(url, p_data,res)
})
// GET METHOT
app.get('/AddDNS', async (req, res) => {
    if(req.query != null) {
        keys = await GetKeyData();
        url = process.env.bt_url + '/plugin?action=a&name=dns_manager&s=add_domain';
        p_data = {
            "request_token": keys.request_token,
            "request_time": keys.request_time,
            "domain": req.query.domain,
            "ns1domain": req.query.ns1,
            "ns2domain": req.query.ns2,
            "soa": req.query.soa,
            "domain_ip": req.query.ip,
        }
        HttpPostCookie(url, p_data, res)
    }else{
        res.send('unknown GET method');
    }
})
// POST METHOT
app.post('/AddDNS', async (req, res) => {
    if(req.body != null) {
        keys = await GetKeyData();
        url = process.env.bt_url + '/plugin?action=a&name=dns_manager&s=add_domain';
        p_data = {
            "request_token": keys.request_token,
            "request_time": keys.request_time,
            "domain": req.body.domain,
            "ns1domain": req.body.ns1,
            "ns2domain": req.body.ns2,
            "soa": req.body.soa,
            "domain_ip": req.body.ip,
        }
        HttpPostCookie(url, p_data, res)
    }else{
        res.send('unknown POST method');
    }
})

http.listen(process.env.port);

function GetKeyData(){
    const d = new Date();
    now_time = d.getTime();
    p_data = {
        'request_token'	:	md5(now_time+''+md5(process.env.bt_key)),
        'request_time'	:	now_time
    }
    return p_data;
}


async function HttpPostCookie(url, data,res){

    const curl = new Curl();

    curl.setOpt(Curl.option.URL, url);
    curl.setOpt(Curl.option.POST, true)
    curl.setOpt(Curl.option.SSL_VERIFYHOST, false)
    curl.setOpt(Curl.option.SSL_VERIFYPEER, false)
    curl.setOpt(Curl.option.POSTFIELDS, querystring.stringify(data));

    const request = await curl.on('end', function (statusCode, data, headers) {
        this.close();
        res.send(data);
    });
    curl.on('error', curl.close.bind(curl));
    curl.perform();

    return request;
}