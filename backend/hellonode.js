require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT =  3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let transporter = nodemailer.createTransport(
    {
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth:{
        user: process.env.GMAIL, 
        pass: process.env.PASSWORD,
    }
   }
);
   

app.post('/sendmail', (req, res) => {
    const { email } = req.body

   
let mailOptions = {
  from: process.env.GMAIL,
  to: email,
  subject: 'Тестовое письмо',
  text: 'Привет! Это письмо отправлено с использованием Nodemailer.',
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Ошибка при отправке:', error);
  }
  console.log('Письмо успешно отправлено:', info.response);
});

});

app.listen(PORT, () => {
    console.log(`Server start in http://localhost:${PORT}`);
})