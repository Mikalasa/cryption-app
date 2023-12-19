import React, {useState} from "react";

function DESContentDecryption() {
    const [decryptedInfo, setDecryptedInfo] = useState('');
    const [inputLength, setInputLength] = useState(0);


    const handleInputChange = (event) => {
        const message = event.target.value;
        setInputLength(message.length);
    };

    const handleForm = async (event) => {
        event.preventDefault();
        const encryptedMessage = document.getElementById("message").value;

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESSJS_API_URL}/DESDecrypt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ encryptedMessage })
            });
            const data = await response.json();
            if (response.ok) {
                setDecryptedInfo(data.decryptedMessage);
            } else {
                alert(data.error || "Decryption failed");
            }
        } catch (error) {
            console.error('Error during decryption:', error);
        }
    };



    return (
        <div className="des-content">
            <div className="custom-form rounded-lg shadow-xl bg-white p-6 lg:col-span-3">
                <form action="" className="space-y-4" onSubmit={handleForm}>
                    <div>
                        <label className="sr-only" htmlFor="message">Past source</label>
                        <textarea
                            className="w-full rounded-lg shadow-sm border p-3 text-sm resize-none custom-textarea"
                            placeholder="Past your text source to decrypt"
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
                            Decrypt
                        </button>
                        <span className="text-sm ml-4 text-gray-600">Character count: {inputLength}</span>
                    </div>
                </form>
            </div>

            <div className="custom-result-form rounded-lg shadow-xl bg-white p-4 sm:p-6">
                <div className="flex flex-wrap gap-1">
                    <span
                        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        DES Algorithm Decrypt
                    </span>
                </div>
                <h1 className="text-gray-600 font-bold py-2">Your Decrypted Message:</h1>
                {decryptedInfo && (
                    <div className="w-full h-full">
                        <textarea
                            className="w-full h-full rounded-lg shadow-sm border p-3 text-sm resize-none custom-textarea"
                            rows="16"
                            value={decryptedInfo}
                            readOnly
                        ></textarea>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DESContentDecryption;