import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import bodyParser from 'body-parser'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from  Sysoft Groups!'
  })
})

app.post('/', async (req, res) => {
  try {
    const { prompt, maxTokens, temperature, topP, presencePenalty, frequencyPenalty } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: temperature || 0, 
      max_tokens: maxTokens || 4000, 
      top_p: topP || 1, 
      frequency_penalty: frequencyPenalty || 0.1, 
      presence_penalty: presencePenalty || 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))      

/*  This version of the code adds support for additional parameters to the POST route, allowing clients to specify the maximum number of tokens, temperature, topP, presence penalty, and frequency penalty for the generated response. It also adds the body-parser library to enable parsing of the request body. */