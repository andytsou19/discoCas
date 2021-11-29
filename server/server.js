const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client')));


app.get('/', (req,res)=> {
    return res.sendFile(path.join(__dirname,'../client/index.html'));
})

app.use((req, res) => res.status(200).send('Error 404: Page not found (what did u do smh)'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    return res.status(errorObj.status).send(errorObj.message.err)
  })

app.listen(3000, () => console.log('App running on port 3000 🔥'));