const { checkout, all } = require("./routes/ta01");
const fs = require("fs");

const requestHandler = (req, res) => {
    if(req.url=="/") {
        res.write(`<html>
            <head>
                <title>This is my first app</title>
            </head>`);

        res.write(`
            <body>
                <h1>I love coding...</h1>
                <form action="./create-user" method="post">
                    <label for="user">Enter the user name: </label>
                    <input type="text" name="user" id="user">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>`);

        return res.end();
    }

    if(req.url =="/users") {
        let initial_users;

        fs.readFile("users.txt", "utf-8", (error, data) => {
            initial_users = JSON.parse(data);

            let users_as_html = "";

            initial_users.forEach(element => {
                users_as_html += `<li>${element}</li>`;
            });



            res.write(`<html>
                <head>
                    <title>Users</title>
                </head>
                <body>
                    <h1>Users</h1>
                    <ul>
                        ${users_as_html}
                    </ul>
                </body>
            </html>`);

            return res.end(); 
        }); 



        

        
    }

    if(req.url == "/create-user") {
        const data_body = [];

        req.on("data", chunk => {
            data_body.push(chunk);
        });

        req.on("end", () => {
            const data_parsed = Buffer.concat(data_body).toString();
            const data_entered_by_user = data_parsed.split("=")[1];

            fs.readFile("users.txt", "utf-8", (error, data) => {

                const all_users = JSON.parse(data);

                all_users.push(data_entered_by_user);

                fs.writeFileSync("users.txt", JSON.stringify(all_users));

                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();

            })

            console.log(data_entered_by_user);
        });
    }
}


module.exports = requestHandler;