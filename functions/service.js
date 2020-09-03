const https = require('https');
const API_ENDPOINT = 'https://api.nasa.gov/planetary';

exports.handler = (event, context, response) => {
    const date = `${event.queryStringParameters.year || '2020'}-09-04`;
    const url = `${API_ENDPOINT}/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`;

    let body = "";
    https.get(url, res => {
        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            response(null, {
                statusCode: 200,
                header: {
                    'Access-Control-Allow-Origin': 'https://delic-tvog-univerzuma.netlify.app/',
                    'Access-Control-Allow-Methods': 'GET'
                },
                body: body
            });
        });
    });
};