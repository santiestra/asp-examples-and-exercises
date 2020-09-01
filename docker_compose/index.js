const express = require('express')
const bodyParser = require('body-parser')
const { Task } = require('./models');

const app = express()
const port = 3456

app.use(bodyParser.json())

app.post('/tasks', async (req, res) => {
  console.log(req.body)
  const { title } = req.body;
  try {
    const task = await Task.create({ title, completed: false })

    res.json(task);
  } catch (error) {
    res.json({ error })
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.json(tasks);
  } catch (error) {
    res.json({ error })
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



