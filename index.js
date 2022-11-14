const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
    );

    let contentType = "text/html";
    let fileExtension = path.extname(filePath);

    switch (fileExtension) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        case ".jpeg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
    }

    fs.readFile(filePath, (err, templateContent) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, templateContent) => {
                        if (err) {
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-Type": contentType,
                            });
                            res.end(templateContent);
                        }
                    }
                );
            } else {
                res.writeHead(500);
                res.end(`Server responded with with error ${err.code}`);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(templateContent);
        }
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
