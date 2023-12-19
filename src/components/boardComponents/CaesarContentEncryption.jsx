import React, { useState } from 'react';

function CaesarContentEncryption() {
    const [step, setStep] = useState(null);
    const [encryptedInfo, setEncryptedInfo] = useState('');
    const [inputLength, setInputLength] = useState(0);

    const handleInputChange = (event) => {
        const message = event.target.value;
        setInputLength(message.length);
    };

    const handleStepChange = (event) => {
        setStep(event.target.value);
    };

    const handleForm = (event) => {
        event.preventDefault();
        if (step === null) {
            alert("Please choose a step for encryption.");
            return;
        }

        const message = document.getElementById("message").value;
        const encryptedInfo = caesarCipherEncryption(message, parseInt(step, 10));

        if (message.length > 2000) {
            alert("Please inputting with less than 2000 characters for encryption.");
            return;
        }
        if (encryptedInfo !== null) {
            setEncryptedInfo(encryptedInfo);
            saveEncryptedInfoDB(encryptedInfo, step);
        }

    };

    function caesarCipherEncryption(text, shiftStep) {
        if (!/[a-zA-Z]/.test(text)) {
            alert("Please inputting with at least one letter for encryption.");
            return null;
        }

        let result = "";

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char.match(/[a-z]/i)) {
                const code = text.charCodeAt(i);

                // cap
                if ((code >= 65) && (code <= 90)) {
                    result += String.fromCharCode(((code - 65 + shiftStep) % 26) + 65);
                }
                // little
                else if ((code >= 97) && (code <= 122)) {
                    result += String.fromCharCode(((code - 97 + shiftStep) % 26) + 97);
                }
            } else {
                // other
                result += char;
            }
        }
        return result;
    }

    const saveEncryptedInfoDB = (encryptedMessage, encryptionStep) => {
        const username = localStorage.getItem('username');
        // console.log(username, encryptedMessage, encryptionStep);
        fetch(`${process.env.REACT_APP_EXPRESSJS_API_URL}/caesarSave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                encryptedMessage,
                encryptionStep
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    console.log('Success:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div className="des-content">
            <div className="custom-form rounded-lg shadow-xl bg-white p-6 lg:col-span-3">
                <form action="" className="space-y-4" onSubmit={handleForm}>
                    <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                        {/* 1 button */}
                        <div>
                            <input
                                className="peer sr-only"
                                id="option1"
                                type="radio"
                                name="option"
                                value="1"
                                onChange={handleStepChange}
                            />
                            <label
                                htmlFor="option1"
                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                tabIndex="0"
                            >
                                <span className="text-sm"> Step 1 </span>
                            </label>
                        </div>

                        {/* 2 button */}
                        <div>
                            <input
                                className="peer sr-only"
                                id="option2"
                                type="radio"
                                name="option"
                                value="3"
                                onChange={handleStepChange}
                            />
                            <label
                                htmlFor="option2"
                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                tabIndex="0"
                            >
                                <span className="text-sm"> Step 3 </span>
                            </label>
                        </div>

                        {/* 3 button */}
                        <div>
                            <input
                                className="peer sr-only"
                                id="option3"
                                type="radio"
                                name="option"
                                value="5"
                                onChange={handleStepChange}
                            />
                            <label
                                htmlFor="option3"
                                className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                tabIndex="0"
                            >
                                <span className="text-sm"> Step 5 </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="message">Past source</label>
                        <textarea
                            className="w-full rounded-lg shadow-sm border p-3 text-sm resize-none custom-textarea"
                            placeholder="Past your text source to encrypt"
                            rows="16"
                            id="message"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    {/* submit */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Encrypt
                        </button>
                        <span className="text-sm ml-4 text-gray-600">Character count: {inputLength}</span>
                    </div>
                </form>
            </div>

            <div className="custom-result-form rounded-lg shadow-xl bg-white p-4 sm:p-6">
                <div className="flex flex-wrap gap-1">
                    <span
                        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        Caesar Cipher
                    </span>

                    <span
                        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        Step = {step ? step : '?'}
                    </span>
                </div>
                <h1 className="text-gray-600 font-bold py-2">Encrypted Message:</h1>
                {encryptedInfo && (
                    <div className="w-full h-full">
                        <textarea
                            className="w-full h-full rounded-lg shadow-sm border p-3 text-sm resize-none custom-textarea"
                            rows="16"
                            value={encryptedInfo}
                            readOnly
                        ></textarea>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CaesarContentEncryption;
