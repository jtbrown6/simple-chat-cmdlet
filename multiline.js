import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"
import readline from "readline"

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let inputLines = [] // initialize an empty array to store user input lines
userInterface.prompt()
userInterface.on("line", async input => {
  if (input.trim() === "") { // if the user enters an empty line, submit the response
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: inputLines.join("\n") }], // join the input lines with a newline character
    })
    console.log(response.data.choices[0].message.content)
    userInterface.prompt()
    inputLines = [] // reset the input lines for the next input
  } else {
    inputLines.push(input) // add the input line to the array
  }
})
