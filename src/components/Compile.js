import { useContext, useState } from 'react';
import codeContext from '../Context';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { toast } from 'react-toastify';



//   const languages = [{"id": 45,"name": "Assembly"},{"id": 46,"name": "Bash"},{"id": 47,"name": "Basic"},{"id": 75,"name": "C (Clang 7.0.1)"},{"id": 76,"name": "C++ (Clang 7.0.1)"},{"id": 48,"name": "C (GCC 7.4.0)"},{"id": 52,"name": "C++ (GCC 7.4.0)"},{"id": 49,"name": "C (GCC 8.3.0)"},{"id": 53,"name": "C++ (GCC 8.3.0)"},{"id": 50,"name": "C (GCC 9.2.0)"},{"id": 54,"name": "C++"},{"id": 86,"name": "Clojure"},{"id": 51,"name": "C#"},{"id": 77,"name": "COBOL"},{"id": 55,"name": "Common Lisp"},{"id": 56,"name": "D"},{"id": 57,"name": "Elixir"},{"id": 58,"name": "Erlang"},{"id": 44,"name": "Executable"},{"id": 87,"name": "F# "},{"id": 59,"name": "Fortran"},{"id": 60,"name": "Go"},{"id": 88,"name": "Groovy"},{"id": 61,"name": "Haskell"},{ "id": 62,"name": "Java"},{"id": 63,"name": "JavaScript"},{"id": 78,"name": "Kotlin"},{"id": 64,"name": "Lua"},{"id": 79,"name": "Objective-C"},{"id": 65,"name": "OCaml"},{"id": 66,"name": "Octave"},{"id": 67,"name": "Pascal"},{"id": 85,"name": "Perl"},{"id": 68,"name": "PHP"},{"id": 43,"name": "Plain Text"},{"id": 69,"name": "Prolog "},{"id": 70,"name": "Python (2.7.17)"},{"id": 71,"name": "Python (3.8.1)"},{"id": 80,"name": "R (4.0.0)"},{"id": 72,"name": "Ruby"},{"id": 73,"name": "Rust"},{"id": 81,"name": "Scala"},{"id": 82,"name": "SQL"},{"id": 83,"name": "Swift"},{"id": 74,"name": "TypeScript"},{"id": 84,"name": "Visual Basic.Net"}]

const Compile = () => {

    const { code, setCode } = useContext(codeContext);
    const [results, setResults] = useState([]);
    const [loader, setLoader] = useState(false);
    // console.log(code);

    const getToken = async () => {

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '51008a2feemsh34463aecac464d9p16e514jsn9e7accbbf49f',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                },
                body: JSON.stringify(code)
            };
            setLoader(true);
            const responce = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*', options);

            const token = await responce.json();
            if (responce.status === 200) {
                getStatus(token?.token)
            } else toast.error(token.message.substring(0, 50));
            setLoader(false);

        } catch (err) {
            toast.error("Error In Genrating token");
            setLoader(false);
        }

    }


    const getStatus = async (token) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '51008a2feemsh34463aecac464d9p16e514jsn9e7accbbf49f',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            };

            const responce = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, options);

            const results = await responce.json();
            if (responce.status === 200) {
                setLoader(false);
                setResults(results);
            } else toast.error(results.message);
            setLoader(false);

        } catch (err) {
            toast.error("Error in geting Status");
            setLoader(false);
        }

    }

    // const getToken = _ => {
    //     console.log(code);
    // }


    return (
        <div>
            <div className="console-bar">
                <span className='flex-container'> Output: <span className={(results?.status?.id === 3) ? "status-success" : "status-error"}>{results?.status?.description} </span></span>
            </div>
            <div className='stdopt'>
                {(loader) ? <span className='statatics'> compiling... </span> : ""}
                {(results.time) ? <span className={(loader) ? "hide" : 'statatics'}>Finished in {results.time} ms || memory taken: {results.memory} kb</span> : ""}
                {(loader) ? "" : results?.stdout?.split("\n").map(e => <p key={e}>{e}</p>)}
                <br />
                <br />


                <p>{results?.message}</p>
            </div>

            <button onClick={getToken} className="btn btn-position">
                <PlayCircleIcon fontSize="10" /> <span style={{ margin: "0 0.2rem" }}> Run Code</span>
            </button>


            <textarea placeholder='Custom Input' onChange={(e) => { setCode({ ...code, "stdin": e.target.value }) }} rows={12} cols={63}></textarea>
        </div>
    );
}


export default Compile;