const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const port = 3000;
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.post("/summarize",async (req, res) => {
  try {
    const text = req.body.text;
    console.log(text);
    const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        { inputs: text },
        {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const summary=response.data[0].summary_text;
    res.json({summary});

   
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
