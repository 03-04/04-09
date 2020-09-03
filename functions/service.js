const https = require('https');

exports.handler = (event, context, response) => {
    const date = `${event.queryStringParameters.year || '2020'}-09-04`;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`;

    let body = "";
    https.get(url, res => {
        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            response(null, {
                statusCode: 200,
                body: body
            });
        });
    });
};