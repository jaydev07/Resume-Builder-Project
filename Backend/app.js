const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const resumeRoutes = require("./routes/resume-routes");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./util/http-error");

app.use(bodyParser.json());

app.use('/api/resume',resumeRoutes);
app.use('/api/user',userRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Could not find the route!',404);
    next(error);
})

app.use((error,req,res,next) => {
    // If the response is already given
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error found!'});
})

mongoose
    .connect("mongodb+srv://admin-jaydev:jd123@cluster0.vr11b.mongodb.net/resume?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true  })
    .then(() => {
        app.listen(5000,() => {
            console.log("Server is open at port 5000");
        })
    })
    .catch((err) => {
        console.log(err);
    })