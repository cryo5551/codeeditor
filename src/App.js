import Editor from "@monaco-editor/react";
import Nevbar from "./components/Nevbar";
import { useState } from "react";
import codeContext from "./Context";
import Compile from "./components/Compile";

function App() {

  const [languageCode, setLanguageCode] = useState("63");
  // const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState({});

  const getLanguageCode = (event) => {
    setLanguageCode(event.target.value);
    setCode({ ...code, "language_id": event.target.value });
  }

  function handleEditor(value, event) {
    setCode({ ...code, "source_code": value, "language_id": languageCode });
    // console.log(event.target.language);
  }


  // function showValue() {
  //   console.log(code);
  //   console.log(JSON.stringify(code));
  //   // console.log(language);

  // }

  const languages = [{ "id": 62, "name": "Java" },{ "id": 50, "name": "C " },{ "id": 70, "name": "Python" },  { "id": 87, "name": "F# " }, { "id": 60, "name": "Go" }, { "id": 73, "name": "Rust" }, { "id": 54, "name": "C++" }, { "id": 63, "name": "JavaScript" }, { "id": 78, "name": "Kotlin" }, { "id": 64, "name": "Lua" }, { "id": 79, "name": "Objective-C" }, { "id": 68, "name": "PHP" },  { "id": 71, "name": "Python3" }, { "id": 80, "name": "R" }, { "id": 72, "name": "Ruby" }, { "id": 83, "name": "Swift" }, { "id": 74, "name": "TypeScript" }]

  const getCurrentLanguage = {
    "50": {
      "name": "C ",
      "source_code": "#include<stdio.h>\r\n\r\nint main(void) {\r\n    puts(\"Hello World!\");\r\n    return 0;\r\n}"
    },
    "54": {
      "name": "c++",
      "source_code": "int main() {\n    std::cout << \"Hello World!\\n\";std::cout << \"Hello World!\\n\";\n}"
    },
    "51": {
      "name": "C#",
      "source_code": "class HelloWorld {\r\n    static void Main() {\r\n        System.Console.WriteLine(\"Hello World!\");\r\n    }\r\n}"
    },
    "87": {
      "name": "F# ",
      "source_code": "printfn \"Hello from F#\""
    },
    "60": {
      "name": "Go",
      "source_code": "func main() {\r\n    fmt.Printf(\"Hello World!\")\r\n}"
    },
    "62": {
      "name": "Java",
      "source_code": "// \"static void main\" must be defined in a public class.\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}"
    },
    "63": {
      "name": "JavaScript",
      "source_code": "(function main() {\n    console.log('Hello World!');\n}());"
    },
    "78": {
      "name": "Kotlin",
      "source_code": "fun main(args: Array<String>) {\r\n    println(\"Hello World!\")\r\n}"
    },
    "64": {
      "name": "Lua",
      "source_code": "print(\"Hello, World!\")"
    },
    "79": {
      "name": "Objective-C",
      "source_code": "//objective-c"
    },
    "68": {
      "name": "PHP",
      "source_code": "echo \"Hello world\";"
    },
    "70": {
      "name": "Python",
      "source_code": "print \"Hello World!\""
    },
    "71": {
      "name": "Python",
      "source_code": "print(\"Hello, World!\")"
    },
    "80": {
      "name": "R",
      "source_code": "# My first program in R Programming\r\nmyString <- \"Hello, World!\"\r\nprint ( myString)"
    },
    "72": {
      "name": "Ruby",
      "source_code": "#!/usr/bin/env ruby\r\nputs \"Hello World!\""
    },
    "73": {
      "name": "Rust",
      "source_code": "fn main() {\r\n    println!(\"Hello World!\");\r\n}"
    },
    "83": {
      "name": "Swift",
      "source_code": "print(\"Hello, World!\")"
    },
    "74": {
      "name": "TypeScript",
      "source_code": "(function main() {\n    console.log('Hello World!');\n}());"
    }
  }
  // console.log(getCurrentLanguage);


  return (

    <div className="App">
      <codeContext.Provider value={{ code, setCode }}>
        <Nevbar />

        <div className="main-container">
          <div style={{
            borderRight: '1px solid rgb(164, 157, 157)',
          }}>
            <div className="flex-container btn-ctrl">

              <select name="cars" id="cars" onChange={getLanguageCode} className="selctor" defaultValue={63}>
                {languages.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
              </select>
            </div>

            {/* <button onClick={showValue} >show lol string</button> */}


            <Editor
              height="82vh"
              width="60vw"
              defaultLanguage="javascript"
              defaultValue="// some comment"
              language={getCurrentLanguage[languageCode].name}
              onChange={handleEditor}
            // theme = "vs-dark"
            />
          </div>

          <Compile />

        </div>

      </codeContext.Provider>
    </div>
  );
}

export default App;
