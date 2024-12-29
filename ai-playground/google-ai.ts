import { GoogleGenerativeAI } from '@google/generative-ai'

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI('AIzaSyC63QkSB7jT1-vLa5gZhDHSnrPfTAuWe7s')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
const chat = model.startChat({
  history: [
    {
      role: 'user',
      parts: [{ text: 'Hello' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
  ],
})
let result = await chat.sendMessage('I have 2 dogs in my house.')
console.log(result.response.text())
result = await chat.sendMessage('How many paws are in my house?')
console.log(result.response.text())
result = await chat.sendMessage('give me js code to calculate how many paws in my house')
console.log(result.response.text())
