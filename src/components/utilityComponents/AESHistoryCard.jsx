import React, {useEffect, useState} from "react";

function AESHistoryCard(props) {
    const [scrolling, setScrolling] = useState(false);

    let scrollTimeout;

    const handleScroll = () => {
        if (!scrolling) setScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            setScrolling(false);
        }, 1000);
    };

    useEffect(() => {
        return () => clearTimeout(scrollTimeout);
    }, []);

    const copyToClipboard = (event) => {
        const grandParent = event.target.parentNode.parentNode;
        const textArea = grandParent.querySelector('.history-textArea');
        if (textArea) {
            const text = textArea.textContent;
            navigator.clipboard.writeText(text).then(() => {
                console.log("Text copied to clipboard");
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };



    const handleDelete = async () => {
        const id = props.data.id;
        const username = localStorage.getItem('username');
        const historyType = 'aes';

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESSJS_API_URL}/historyDelete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    username: username,
                    historyType: historyType
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                props.deleteCard();
            } else {
                console.error('Failed to delete:', data.message);
            }
        } catch (error) {
            console.error('Error deleting history data:', error);
        }
    };


    return (
        <div className="custom-history-form rounded-xl shadow-xl bg-white p-2 sm:p-2">
            <div className="flex flex-wrap gap-1">
                    <span
                        className="whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600">
                        AES Algorithm Encrypt
                    </span>
            </div>

            <h1 className="text-gray-600 font-bold py-2 px-2">Encrypted Message:</h1>
            <div className={`history-textArea text-gray-800 px-2 mb-2 mt-2 ${scrolling ? 'scrolling' : ''}`} onScroll={handleScroll}>
                {props.data.aes_encrypt_text}
            </div>


            <span className="inline-flex gap-1 justify-self-end overflow-hidden">
              <button
                  className="inline-block border-e p-1 text-gray-700 hover:bg-gray-50 focus:relative font-bold text-sm rounded-md border bg-white shadow-sm" onClick={copyToClipboard}>Copy</button>

              <button
                  className="inline-block p-1 text-gray-700 hover:bg-gray-50 focus:relative rounded-md border bg-white shadow-sm" onClick={handleDelete}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </span>
        </div>
    )
}

export default AESHistoryCard