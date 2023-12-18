const express = require('express');
const app = express();
const mysql = require("mysql");
let users = [];

app.use(express.json());

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});

app.get("/", async (req, res) => {
    res.json({ status: "makanan hallo"});
});


app.get('/:makanan', async (req, res) => {
    const query = "SELECT * FROM makanan WHERE id = ?";
    pool.query(query, [req.params.makanan], (error, result) => {
        if (error) {
            console.error("Error database:", error);
            res.status(500).json({ status: "Internal Server Error" });
            return;
        }

        if (!result[0]) {
            res.status(404).json({ status: "Tidak Ditemukan" });
        } else {
            res.json(result[0]);
        }
    });
});




app.post('/', (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send('Permintaan Buruk: JSON Tidak Valid');
        return;
    }

    users = [...users, data];
    res.send('Pengguna dibuat');
});

// Rute untuk menghapus pengguna berdasarkan nama
app.delete('/:name?', (req, res) => {
    const params = req.params.name;
    let deleteUser = users.filter(val => val.name !== params);
    users = deleteUser;
    res.send(users);
});


app.put('/', (req, res) => {
    const data = req.body;
    users.map(val => {
        if (val.vitamin === data.vitamin) val.name = data.name;
    });
    res.send(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
