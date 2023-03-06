const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors")
const storage = require("node-persist");
const { key, value } = require("node-persist")

storage.init()

app.use(express.json());
app.use(cors());

//POST request to store the data
app.post("/addTodo", async (req, res) => {
    const { todo } = req.body;
    const id = Date.now().toString();
    await storage.setItem(id, { id: id, todo: todo });
    res.status(200).json("TODO Added Successfully");

});
app.get("/getTodo", async (req, res) => {
    todos = await storage.values()
    res.status(200).json({ data: todos });
});

app.delete("/getTodo", async (req, res) => {
    todos = await storage.clear()
    res.status(200).json({ data: todos });
});

app.listen(PORT, () => {
    console.log("To Do App Started on Port", PORT)
});