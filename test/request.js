const http = require("http");

const STATUS = {
    OK: "ok",
    BadRequest: "bad request"
};

const request = (opt, data) => new Promise((resolve, reject) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (data) {
        headers["Content-Length"] = Buffer.byteLength(data);
    }

    const request = http.request({
        hostname: "localhost",
        port: 3456,
        headers,
        ...opt
    }, response => {
        const { statusCode, statusMessage } = response;
        const result = statusMessage.toLowerCase();

        // consume response data to free up memory
        response.resume();

        statusCode < 300 ? resolve(result) : reject(result);
    });

    request.on("error", reject);

    if (data) {
        request.write(data);
    }

    request.end();
});

const GET = opt => request({
    method: "GET",
    ...opt
});

const POST = (opt, data) => request({
    method: "POST",
    ...opt
}, data);

module.exports = { STATUS, GET, POST };