import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  //   defaultHeaders: {
  //     "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
  //     "X-Title": $YOUR_APP_NAME, // Optional. Shows in rankings on openrouter.ai.
  //   }
})

async function main() {
  const completion = await openai.chat.completions.create({
    // model: 'google/gemini-2.0-flash-exp:free',
    model: 'qwen/qwen-2.5-coder-32b-instruct',
    messages: [
      // {
      //   role: 'system',
      //   content:
      //     'you are a helpful assistance.you have to reply in burmese.but do not reply everything in burmese like technical terms, etc...',
      // },
      {
        role: 'user',
        content: `create a button using html and css. the button should be in pink but if i hover the background color should be come from left to right with transition effect.`,
      },
      {
        role: 'assistant',
        content:
          'Certainly! Below is an example of how you can create a button with the desired effect using HTML and CSS:\n\n### HTML:\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="stylesheet" href="styles.css">\n    <title>Pink Button with Hover Effect</title>\n</head>\n<body>\n    <button class="pink-button">Hover Me!</button>\n</body>\n</html>\n```\n\n### CSS (styles.css):\n```css\n.pink-button {\n    background-color: pink; /* Initial background color */\n    color: white;            /* Text color */\n    border: none;            /* Remove border */\n    padding: 15px 30px;      /* Padding inside the button */\n    font-size: 16px;         /* Font size */\n    cursor: pointer;         /* Change cursor on hover */\n    position: relative;      /* Position relative for the pseudo-element */\n    overflow: hidden;        /* Hide the overflow of the pseudo-element */\n    transition: color 0.3s;  /* Smooth transition for text color */\n}\n\n.pink-button::before {\n    content: \'\';             /* Create an empty pseudo-element */\n    position: absolute;\n    top: 0;\n    left: -100%;             /* Start off-screen to the left */\n    width: 100%;\n    height: 100%;\n    background-color: #ff69b4; /* Hover background color */\n    transition: left 0.3s;   /* Smooth transition for the left property */\n}\n\n.pink-button:hover::before {\n    left: 0;                 /* Move the pseudo-element to the right */\n}\n\n.pink-button:hover {\n    color: black;            /* Change text color on hover if desired */\n}\n```\n\n### Explanation:\n\n1. **HTML**:\n   - A simple button element with the class `pink-button`.\n\n2. **CSS**:\n   - The `.pink-button` class styles the button with initial settings such as background color, text color, padding, font size, and cursor.\n   - The `::before` pseudo-element is used to create an overlay that covers the button with a different color (`#ff69b4`, a slightly darker pink) when the button is hovered over.\n   - The `left` property of the `::before` element is initially set to `-100%`, which places it off-screen to the left.\n   - When the button is hovered over, the `::before` element moves from `left: -100%` to `left: 0`, creating a left-to-right color transition effect.\n   - The `transition` property is used to animate the movement of the `::before` element and the change in text color smoothly.\n\nYou can adjust the colors, padding, font size, and other properties as needed to fit your design.',
        refusal: '',
      },
      {
        role: 'user',
        content: 'when hover the text is not visible anymore fix it',
      },
      {
        role: 'assistant',
        content:
          'Certainly! The issue arises because the `::before` pseudo-element covers the entire button, making the text invisible when hovered. To fix this, you can adjust the `::before` element to only cover a portion of the button and ensure the text remains visible. Here\'s an updated version of the CSS:\n\n### HTML:\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="stylesheet" href="styles.css">\n    <title>Pink Button with Hover Effect</title>\n</head>\n<body>\n    <button class="pink-button">Hover Me!</button>\n</body>\n</html>\n```\n\n### CSS (styles.css):\n```css\n.pink-button {\n    background-color: pink; /* Initial background color */\n    color: white;            /* Text color */\n    border: none;            /* Remove border */\n    padding: 15px 30px;      /* Padding inside the button */\n    font-size: 16px;         /* Font size */\n    cursor: pointer;         /* Change cursor on hover */\n    position: relative;      /* Position relative for the pseudo-element */\n    overflow: hidden;        /* Hide the overflow of the pseudo-element */\n    transition: color 0.3s;  /* Smooth transition for text color */\n}\n\n.pink-button::before {\n    content: \'\';             /* Create an empty pseudo-element */\n    position: absolute;\n    top: 0;\n    left: -100%;             /* Start off-screen to the left */\n    width: 100%;\n    height: 100%;\n    background-color: #ff69b4; /* Hover background color */\n    transition: left 0.3s;   /* Smooth transition for the left property */\n    z-index: 0;              /* Place behind the text */\n}\n\n.pink-button:hover::before {\n    left: 0;                 /* Move the pseudo-element to the right */\n}\n\n.pink-button span {\n    position: relative;      /* Position relative for the text */\n    z-index: 1;              /* Place above the pseudo-element */\n}\n```\n\n### Updated HTML:\nTo ensure the text is properly positioned, wrap the button text in a `<span>` element:\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="stylesheet" href="styles.css">\n    <title>Pink Button with Hover Effect</title>\n</head>\n<body>\n    <button class="pink-button"><span>Hover Me!</span></button>\n</body>\n</html>\n```\n\n### Explanation:\n\n1. **HTML**:\n   - Wrap the button text inside a `<span>` element to control its position relative to the pseudo-element.\n\n2. **CSS**:\n   - The `.pink-button` class styles the button as before.\n   - The `::before` pseudo-element is used to create an overlay that covers the button with a different color (`#ff69b4`, a slightly darker pink) when the button is hovered over.\n   - The `z-index: 0;` on the `::before` element ensures it stays behind the text.\n   - The `z-index: 1;` on the `<span>` element inside the button ensures the text remains visible on top of the pseudo-element.\n\nThis approach ensures that the text remains visible while creating a smooth left-to-right transition effect for the background color on hover.',
        refusal: '',
      },
      {
        role: 'user',
        content: 'make the button a little rise when hover',
      },
    ],
  })
  console.log(JSON.stringify(completion.choices?.[0].message ? undefined : completion))
  console.log(JSON.stringify(completion.usage))
  console.log(completion.choices?.[0].message)
}
main()
