import React, { useState } from "react";
import "./App.css";

const LiveSubtitles = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!recognition) {
    alert("Speech Recognition is not supported in this browser");
    return null;
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const toggleListening = () => {
    const recognitionInstance = new recognition();
    recognitionInstance.continuous = true; // Keep listening continuously
    recognitionInstance.interimResults = true; // Shows partial results
    recognitionInstance.lang = selectedLanguage; // Use selected language
  
    if (!isListening) {
      recognitionInstance.start(); // Start listening
    }
  
    recognitionInstance.onstart = () => {
      setIsListening(true); // Set listening to true when recognition starts
    };
  
    recognitionInstance.onresult = (event) => {
      let speechToText = "";
      
      // Loop through all results for complete and interim (partial) results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          speechToText += event.results[i][0].transcript; // Complete result
        } else {
          speechToText += event.results[i][0].transcript; // Interim (partial) result
        }
      }
      
      setTranscript(speechToText); // Update the transcript with new speech
      translateText(speechToText); // Optionally translate text
    };
  
    recognitionInstance.onerror = (event) => {
      console.error("Error during speech recognition:", event.error);
    };
  
    recognitionInstance.onspeechend = () => {

    };

    if (isListening) {
      recognitionInstance.stop(); // Stop the recognition when the user clicks the button while listening
      setIsListening(false); // Update the state to reflect that listening is stopped
    } else {
      recognitionInstance.start(); // Start listening when the user clicks the button
    }
  };

  

  const translateText = (text) => {
    // Placeholder translation function, replace with API call (e.g., Google Translate API)
    const translations = {
      es: "Esto es una prueba", // Example translation (Spanish)
      fr: "Ceci est un test", // Example translation (French)
    };
    setTranslatedText(translations[selectedLanguage] || text); // Set the translation or fallback to original text
  };

  const handleClearTranscript = () => {
    setTranscript(""); // Clear the transcript
    setTranslatedText(""); // Clear translated text
  };

  const saveTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    link.click();
  };

  return (
    <div className="container">
      <h1>Live Subtitles</h1>

      {/* Language Selection */}
      <label htmlFor="language">Select Language: </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
         <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="hi-IN">Hindi</option>
        <option value="kn-IN">Kannada</option>
        <option value="te-IN">Telugu</option>
        <option value="ta-IN">Tamil</option>
        <option value="es-ES">Spanish</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="zh-CN">Chinese (Simplified)</option>
        <option value="zh-TW">Chinese (Traditional)</option>
        <option value="ja-JP">Japanese</option>
        <option value="ko-KR">Korean</option>
        <option value="ar-SA">Arabic</option>
        <option value="ru-RU">Russian</option>
        <option value="pt-PT">Portuguese</option>
        <option value="it-IT">Italian</option>
        <option value="bn-IN">Bengali</option>
        <option value="mr-IN">Marathi</option>
        <option value="gu-IN">Gujarati</option>
        <option value="pa-IN">Punjabi</option>
        <option value="ur-PK">Urdu</option>
        <option value="vi-VN">Vietnamese</option>
        <option value="th-TH">Thai</option>
        <option value="ms-MY">Malay</option>
        <option value="tr-TR">Turkish</option>
        <option value="pl-PL">Polish</option>
        <option value="uk-UA">Ukrainian</option>
        <option value="nl-NL">Dutch</option>
        <option value="sv-SE">Swedish</option>
        <option value="fi-FI">Finnish</option>
        <option value="no-NO">Norwegian</option>
        <option value="da-DK">Danish</option>
        <option value="cs-CZ">Czech</option>
        <option value="hu-HU">Hungarian</option>
        <option value="id-ID">Indonesian</option>
        {/* Add more languages here */}
      </select>

      {/* Toggle Listening */}
      <button onClick={toggleListening}>
        {isListening ? (
          <i className="fa-solid fa-microphone-slash"></i>
        ) : (
          <i className="fa-solid fa-microphone"></i>
        )}
      </button>

      {/* Display Transcript */}
      {/* <div>
        <h2>Recognized Text:</h2>
        <h1>{transcript}</h1>
      </div> */}

      {/* Display Translated Text */}
      <div>
        <h2>Translated Text:</h2>
        <h2 className="translatedText">{translatedText}</h2>
      </div>
      <div className="buttons">
        
      {/* Clear Transcript Button */}
      <button onClick={handleClearTranscript} className="clear">Clear Transcript</button>

{/* Save Transcript Button */}
   <button onClick={saveTranscript} className="save">Save Transcript</button>
      </div>
    </div>
  );
};

export default LiveSubtitles;
