import {React, useCallback, useState} from 'react'

const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(10);
    const [useNumbers, setUseNumbers] = useState(false);
    const [useSpecialCharacters, setuseSpecialCharacters] = useState(false);
    const [strength, setStrength] = useState("No");
    const [useAmbiguous, setUseAmbiguous] = useState(false);

    // Generates the password and displays it
    const generatePassword = useCallback(() => {
        let newPassword = "";
        let randomRoll = ""; 
        // Custom set of characters for "special characters" since I don't like some from String.fromCharCode
        const specialCharacters = "!$£%^*()=<>?#-_~"
        // Determines how many sets to roll through
        let setsToRoll = 0;
        if (useNumbers) {setsToRoll+=1};
        if (useSpecialCharacters) {setsToRoll+=2};

        // Generates random characters for the password
        for (let i=0; i<length; i++)
            {
                // Gets random characters
                let uppercase = getRandomInt(65, 90);
                let lowercase = getRandomInt(97, 122);
                let number = getRandomInt(48, 57);
                let specialChar = getRandomInt(0, 15);
                if (!useAmbiguous) {
                    while ([73, 79].includes(uppercase)) {
                        uppercase = getRandomInt(65, 90);
                    };
                    while ([105, 108, 111].includes(lowercase)) {
                        lowercase = getRandomInt(97, 122);
                    };
                    while ([48, 49].includes(number)) {
                        number = getRandomInt(48, 57);
                    };
                }

                // Generates differently based upon what's ticked
                switch (setsToRoll) {
                    // Only letters
                    case(0):
                        setStrength("Weak"); 
                        // Randomises between upper and lowercase each call
                        randomRoll = Math.random();
                        if (randomRoll>0.5) {
                            newPassword+=String.fromCharCode(uppercase);
                            break;
                        }
                        else {
                            newPassword+=String.fromCharCode(lowercase);
                            break;
                        }

                    // Only numbers + letters
                    case(1):
                        setStrength("Medium"); 
                        // Randomises between numbers, upper and lowercase each call
                        randomRoll = Math.random();
                        if (randomRoll<0.3) {
                            newPassword+=String.fromCharCode(uppercase);
                            break;
                        }
                        else if (randomRoll>0.6) {
                            newPassword+=String.fromCharCode(lowercase);
                            break;
                        }
                        else {
                            newPassword+=String.fromCharCode(number);
                            break;
                        }

                    // Only letters + special characters
                    case(2):
                        setStrength("Medium"); 
                        // Randomises between special characters, upper and lowercase each call
                        randomRoll = Math.random();
                        if (randomRoll<0.3) {
                            newPassword+=String.fromCharCode(uppercase);
                            break;
                        }
                        else if (randomRoll>0.6) {
                            newPassword+=String.fromCharCode(lowercase);
                            break;
                        }
                        else {
                            newPassword+=specialCharacters.charAt(specialChar);
                            break;
                        }

                    // Numbers, letters and special characters
                    case(3):
                        setStrength("Strong"); 
                        // Randomises between numbers, upper and lowercase each call
                        randomRoll = Math.random();
                        if (randomRoll<0.25) {
                            newPassword+=String.fromCharCode(uppercase);
                            break;
                        }
                        else if (0.25<randomRoll && randomRoll<0.5) {
                            newPassword+=String.fromCharCode(lowercase);
                            break;
                        }
                        else if (0.5<randomRoll && randomRoll<0.75) {
                            newPassword+=String.fromCharCode(number);
                            break;
                        }
                        else {
                            newPassword+=specialCharacters.charAt(specialChar);
                            break;
                        };
                }
            };
        setPassword(newPassword);

    }, [length, useNumbers, useSpecialCharacters, useAmbiguous]);

    // Gets random int (standard code)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
    <div id="container">
        <h1 className="text-5xl font-bold mb-8">Password generator</h1>
        <div className="generatorBox border border-black-2 max-w-md mx-auto rounded-xl p-5 bg-amber-50 relative">
            <label htmlFor="passwordOutput" className="block">Generated password:</label>
            <input type="text" value={password} readOnly placeholder=" Generate a password!" className="bg-gray-100 w-90 border border-black rounded-lg mb-4 pl-2 text-red-400 font-bold" id="passwordOutput"/>
            <div className="inline-block group">
                <button className="absolute right-10 top-11 bg-blue-300 px-2 h-6.5 box-border rounded-r-lg border border-black cursor-copy hover:bg-blue-400 active:bg-blue-500 group" onClick={()=>navigator.clipboard.writeText(password)}>Copy</button>
                <span className="absolute bg-amber-200 p-3 rounded-md -top-2 right-0 invisible ml-12 group-hover:visible">{strength} Password</span>
            </div>
            <div id="lengthSlider">
                <label htmlFor="lengthThing" className="block">Password length: {length}</label>
                <input id="lengthThing" type="range" min="5" max="20" value={length} className="w-90 py-2 cursor-col-resize" onChange={(e)=>setLength(e.target.value)}/>
            </div>
            <div id="checkBoxes" className="flex justify-evenly">
                <div id="numbersCheckbox">
                    <label htmlFor="numbers" className="align-middle">Use numbers? </label>
                    <input id="numbers" type="checkbox" checked={useNumbers} className="align-middle cursor-pointer" onChange={(e)=>setUseNumbers(e.target.checked)}/>
                </div>
                <div id="charactersCheckbox" className="mb-5">
                    <label htmlFor="specialCharacters" className="align-middle">Use special characters? </label>
                    <input id="specialCharacters" type="checkbox" checked={useSpecialCharacters} className="align-middle cursor-pointer" onChange={(e)=>setuseSpecialCharacters(e.target.checked)}/>
                </div>
            </div>            
            <div id="ambiguity" className="mb-5">
                <label htmlFor="ambiguous" className="align-middle">Use ambiguous characters? (o, O, 0, i, I, l, 1) </label>
                <input id="ambiguous" type="checkbox" checked={useAmbiguous} className="align-middle cursor-pointer" onChange={(e)=>setUseAmbiguous(e.target.checked)}/>
            </div>
            <div id="generateButtonContainer">
                <button className="bg-gray-200 p-3 rounded-lg border border-black cursor-pointer hover:bg-gray-300 active:bg-gray-400 active:translate-0.5" onClick={()=>generatePassword()}>Generate password!</button>
            </div>
        </div>
    </div>
    );
};

export default PasswordGenerator

// Don't set "strength" based on length at all but that's fine for now