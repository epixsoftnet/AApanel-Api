AApanel-Api


API support prepared with AApanel nodejs

---------------------------------------------------------------------------------------

Install 

    npm install

---------------------------------------------------------------------------------------

#Proje Start

    npm start  


    Browser http://127.0.0.1 go to

---------------------------------------------------------------------------------------
.env file
    
    Places that need to be changed in the .env file { port,bt_key,bt_url }

    port   = 3000
    bt_key = "aapanel_api_key"
    bt_url = "http://127.0.0.1:8888"

-------------------------------------------------------------------------

Example : Adding DNS Manager with Post method

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

Example Output :
    
    {"status": true, "msg": "Add domain name successfully"}

-------------------------------------------------------------------------

Example : Adding DNS Manager with GET method



    http://127.0.0.1:3000&domain=test.com&ns1=ns1.test.com&ns2=ns2.test.com&soa=ns1.test.com&ip=127.0.0.1    

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

Example Output :

    {"status": true, "msg": "Add domain name successfully"}



-----------------------------------------------------------------------
website : https://epixsoft.net

aapanel website : https://aapanel.com
