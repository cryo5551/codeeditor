### LetsCode : https://getscode.netlify.app/
- its a code editor (leetcode UI based);
- for the Editor partmonaco-editor is used:  https://www.npmjs.com/package/@monaco-editor/react

### Functionality
- Upon lending user can select their preferred programming languages (default is JavaScript).
- Once the user is done writing their code, they can compile their code and see the output / results in the output window.
- They'll either see success or failure for their code snippets. Everything is visible in the code output window.
- The user can add custom inputs to their code snippets, and the judge (our online compiler) will take into account the custom input which the user supplies.
- The user can see relevant details of the code that was executed.
- error handling is done with the help of react-toastify for better and smooth UX.
