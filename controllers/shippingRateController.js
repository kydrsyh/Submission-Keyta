// Import database models
const axios = require('axios'); // Import axios
const https = require('https'); // Import https
const axiosRequest = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
const agent = new https.Agent({
    rejectUnauthorized: false
});


require('dotenv').config()
const port = process.env.PORT


// Controller for each endpoint
class ShippingRateController {
    // Methods
    async getRate(req, res) {
        try {
            // Send POST request to API Keyta
            let getData = {
                method: 'POST',
                url: `https://sandbox.keyta.id/api/v1/costs`,
                data: JSON.stringify({
                    "dest_address": "Jl. Anyelir, RT.9/RW.1, Jatipulo, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia",
                    "dest_lat": "-6.1779499",
                    "dest_lng": "106.8010439",
                    "dest_postal_code": "11430",
                    "src_address": "Keyta (PT Kita Teknologi Andalan), Jalan Kamboja, RT.4/RW.7, Kota Bambu Utara, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta, Indonesia",
                    "src_lat": "-6.1816664",
                    "src_lng": "106.802901",
                    "src_postal_code": "11420",
                    "weight": 1
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNjQ1MjM5MDQ4fQ.tlPC96qm9kmKulkjvO77MySrE49r75bztchW09Uo-ng"
                },
            };

            let responseGetDataAPI = await axios(getData)

            // Get results data
            let data = responseGetDataAPI.data.results

            // Add id to sort them
            for (let i = 0; i < data.length; i++) {
                if (data[i].name == "GOJEK") data[i].id = 1
                if (data[i].name == "GrabExpress") data[i].id = 2
                if (data[i].name == "JNE") data[i].id = 3
                if (data[i].name == "SiCepat") data[i].id = 4
                if (data[i].name == "Paxel") data[i].id = 5
                if (data[i].name == "AnterAja") data[i].id = 6
            }

            // use slice() to copy the array and not just make a reference
            let byId = data.slice(0)
            // sort the data by id
            byId.sort(function (a, b) {
                return a.id - b.id;
            });

            return res.status(200).json({
                message: 'Get shipping rate success!',
                query: responseGetDataAPI.data.query,
                results: byId
            })

        } catch (ex) {
            return res.status(500).json({
                message: "Internal server error",
                error: ex
            })
        }
    }

    async markup(req, res) {
        try {
            // Fetch data from getRate shipping method
            let getData = {
                method: 'GET',
                url: `http://localhost:${port}/shipping`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let responseGetDataAPI = await axios(getData)
            let byId = responseGetDataAPI.data.results

            // add markup to current total price base on the range given
            for (let i = 0; i < byId.length; i++) {
                for (let j = 0; j < byId[i].services.length; j++) {
                    let price = byId[i].services[j].totalPrice
                    if (price >= 0 && price <= 17000) {
                        byId[i].services[j].totalPrice += 1000
                    }
                    if (price >= 17001 && price <= 30000) {
                        byId[i].services[j].totalPrice += 2000
                    }
                    if (price >= 30001 && price <= 40000) {
                        byId[i].services[j].totalPrice += 3000
                    }
                    if (price >= 40001 && price <= 129000) {
                        byId[i].services[j].totalPrice += 5000
                    }
                    if (price >= 129001) {
                        byId[i].services[j].totalPrice += 7000
                    }
                }
            }

            return res.status(200).json({
                message: "Success get shipping rate + markup.",
                data: byId
            })
        } catch (ex) {
            return res.status(500).json({
                message: "Internal server error",
                error: ex.message
            })
        }
    }

    async selection(req, res) {
        try {
            // Fetch data from getRate shipping method
            let getData = {
                method: 'GET',
                url: `http://localhost:${port}/shipping/markup`,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            let responseGetDataAPI = await axios(getData)
            let byId = responseGetDataAPI.data.data

            let container = []
            for (let i = 0; i < byId.length; i++) {
                if(byId[i].name == "GrabExpress") {
                    byId[i].id = 1
                    container.push(byId[i])
                }
                if(byId[i].name == "SiCepat") {
                    byId[i].id = 2
                    container.push(byId[i])
                }
                if(byId[i].name == "Paxel") {
                    byId[i].id = 3
                    container.push(byId[i])
                }
                
            }

            return res.status(200).json({
                message: "Success get shipping rate Grab Express, SiCepat & Paxel.",
                data: container
            })

        } catch (ex) {
            return res.status(500).json({
                message: "Internal server error",
                error: ex.message
            })
        }
    }

    

}

module.exports = new ShippingRateController;