let Input=document.querySelector("#Input");
let Operational=document.querySelector("#Operational");
let Output = document.querySelector("#Output");
let btnStart = document.querySelector(".btn-start");
let btnStop = document.querySelector(".btn-stop");
let temp = document.querySelector("#Temperature");
let precipation = document.querySelector("#prep");
let humandity = document.querySelector("#human");
let wind = document.querySelector("#wind");
let state = document.querySelector("#Stat");
let sys = document.querySelector(".sys");
let inputCommand = document.querySelector("#Inp");
let CommandStatus = document.querySelector("#Listening");
const gif = document.getElementById("GIF1");
const inpContainer = document.querySelector(".inp");
// gif.src = 'UI\bidirectional_output.gif';
// const outputElement = document.querySelector("#debugWindow");
// console.log(gif);
// console.log(gif.innerText);
// console.log(CommandStatus.innerText);
// console.dir(temp);
// console.dir(state);
// console.log(btnStart.innerText);
// console.log(btnStop.innerText);
// console.log(sys.innerText.p[0]);
// console.log(sys.innerText.p[1]);


function redirectConsoleToHTML() {
    const outputElement = document.getElementById('debugWindow');
    if (!outputElement) {
        console.error('Element with id "debugWindow" not found.');
        return;
    }

    // Save original console methods
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
    };

    // Helper function to write messages to the HTML element
    function writeToHTML(method, ...args) {
        const message = document.createElement('p');
        message.style.marginBottom = "5px";
        message.style.color = {
            log: "white",
            warn: "orange",
            error: "red",
            info: "aqua"
        }[method] || "black";

        // Convert objects to string and join all arguments
        message.textContent = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(" ");
        outputElement.appendChild(message);

        // Scroll to the bottom
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    // Override console methods
    Object.keys(originalConsole).forEach(method => {
        console[method] = function (...args) {
            originalConsole[method](...args); // Call original console method
            writeToHTML(method, ...args);    // Write to HTML
        };
    });
}

document.addEventListener("DOMContentLoaded", () => {
    redirectConsoleToHTML();

    // Example logs to test functionality
    console.log("This is a test log.");
    console.warn("This is a test warning.");
    console.error("This is a test error.");
    console.info("This is a test info message.");
});




async function fetchSystemInfo() {
    try {
        const response = await fetch('http://127.0.0.1:5000/system-info');
        const data = await response.json();
        console.log(`BatteryPercentage : ${data.BatteryPercentage}`);
        console.log(`SystemSound : ${data.SystemSound}`);
        console.log(`cpuUsage : ${data.cpuUsage}`);
        console.log(`memoryUsage : ${data.memoryUsage}`);
        console.log(`diskUsage : ${data.diskUsage}`);
        sys.children[0].innerText= `Battery Percentage : ${data.BatteryPercentage}%`;
        sys.children[1].innerText= `System Sound : ${data.SystemSound}%`;
        sys.children[2].innerText= `CPU Usage : ${data.cpuUsage}%`;
        sys.children[3].innerText= `Memory Usage : ${data.memoryUsage}%`;
        sys.children[4].innerText= `Disk Usage : ${data.diskUsage}%`;
        // document.getElementById('systemInfo').innerText = 
        //     `OS: ${data.os}, Version: ${data.os_version}, CPU Cores: ${data.cpu_count}, Memory: ${data.memory}`;
        
    } catch (error) {
        console.error('Error fetching system info:', error);
    }
}

fetchSystemInfo();
// setInterval(fetchSystemInfo,5000);




async function getWeatherData(){
    const apiKey = 'your-api-key-here'; // Replace with your OpenWeatherMap API key
    const city = 'Batala'; 
    const units = 'metric';
    URL=`https://api.openweathermap.org/data/2.5/weather?q=mohali&appid=b49bddc295506288e959a7e61ad45bce&units=metric`;
    const response = await fetch(URL);
    const data= await response.json();
    console.log(data);
    const Temp = Math.floor(data.main.temp); // Temperature in Celsius
    const Humidity = data.main.humidity; // Humidity percentage
    const Pressure = data.main.pressure; // Atmospheric pressure
    const WindSpeed = data.wind.speed; // Wind speed in m/s
    const State = data.weather[0].description;
    temp.innerText=`Temp  ${Temp}°C`;
    precipation.innerText=`Pressure:${Pressure}hpa`;
    humandity.innerText=`Humidity:${Humidity}%`;
    wind.innerText=`Wind speed :${WindSpeed}m/s`;
    state.innerText=`${State}`;
    // console.log(`City : ${data.name}`)
    // console.log(`Temperature: ${Temp}°C`);
    // console.log(`Humidity: ${Humidity}%`);
    // console.log(`Pressure: ${Pressure}hpa`);
    // console.log(`Wind Speed: ${WindSpeed} m/s`);
    // console.log(`Description: ${State}`);
}
getWeatherData();
// Function to capture voice input and return as text

async function listenQuery() {
    return new Promise((resolve, reject) => {
        if (input === "Text Input") {
            // If in Text Input mode, return the text from the input field
            const textInput = document.getElementById("userInp");
            if (textInput) {
                resolve(textInput.value); // Resolve the promise with the user input text
            } else {
                reject("Text input field not found.");
            }
            return;
        }

        // If in Voice Input mode, use speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Speech Recognition.");
            return reject("SpeechRecognition not supported.");
        }

        CommandStatus.innerText = "Listening....";
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const userInput = event.results[0][0].transcript;
            console.log("Voice Input:", userInput);
            inputCommand.innerText = userInput;
            if (!userInput) {
                console.log("No input detected. Restarting recognition...");
                recognition.stop();
                listenQuery().then(resolve).catch(reject); // Restart recognition
            } else {
                resolve(userInput); // Resolve the Promise with the captured text
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            inputCommand.innerText = "Speech Recognition Error";
            reject(event.error); // Reject the Promise on error
        };

        recognition.onend = () => {
            console.log("Recognition ended.");
        };

        recognition.start();
    });
}
// input=listenQuery();
// console.log(input);

// Function to send a query to the backend and handle the response
async function sendQueryToBackend(userInput) {
    CommandStatus.innerText="Command Processing Undertaken";
    try {
        const response = await fetch('http://127.0.0.1:5000/process-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend Response:", data.response);
        return data.response; // Return the backend response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
// sendQueryToBackend("hello");

// Function to speak out text using the Web Speech API
function SpeakFunction(text) {
    return new Promise((resolve) => {
        CommandStatus.innerText="Speaking...";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => resolve(); // Resolve the Promise when speaking ends
        window.speechSynthesis.speak(utterance);
    });
}
// SpeakFunction("hello");


// SpeakFunction("hello sir ! How are you?");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let Zyra_status="Stop";
async function zyraTalk() {
    while (Zyra_status === "Start") {
        try {
            console.log("Listening...");
            gif.src = 'Mic.gif' + '?t=' + new Date().getTime();
            const userInput = await listenQuery(); // Wait for voice input
            console.log(userInput);
            console.log("Waiting for response");
            gif.src = 'Process1.gif' + '?t=' + new Date().getTime();
            const backendResponse = await sendQueryToBackend(userInput); // Wait for backend response
            // document.getElementById('output').textContent = backendResponse; // Display response
            console.log(backendResponse);
            gif.src = 'soundWave.gif' + '?t=' + new Date().getTime();
            await SpeakFunction(backendResponse); // Wait for speaking to complete
            CommandStatus.innerText="Sleeping...";
        } catch (error) {
            console.error("Error in handleVoiceQuery:", error);
            sleep(5000);
        }
    }
}


let  opacity="low";
btnStart.style.opacity="50%";
btnStop.style.opacity="100%";
btnStart.addEventListener("click",()=>{
    if(opacity==="low"){
        btnStart.style.opacity="100%";
        btnStop.style.opacity="50%";
        opacity="high";
        Zyra_status="Start";
        zyraTalk();

    }

})
btnStop.addEventListener("click",()=>{
    if(opacity=="high"){
        btnStart.style.opacity="50%";
        btnStop.style.opacity="100%";
        opacity="low";
        gif.src = 'bidirectional_output.gif' + '?t=' + new Date().getTime();
        CommandStatus.innerText="Sleeping...";
        Zyra_status="Stop";
    }

})



let input="Voice Input";
let operational_mode="Fully Operational";
let output="Voice Output";
// const inpContainer = document.querySelector(".inp"); 
Input.addEventListener("click",()=>{
    console.log("input button has been clicked")
    if(input==="Voice Input"){
        Input.innerText="Text Input";
        input="Text Input";
        // Replace <p> with an <input> element
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "userInp";
        inputField.placeholder = "Enter your command here...";
        inputField.style.width = "100%"; // Optional styling
        inputField.style.height="100%";
        inputField.style.background="#1F2833";
        inputField.style.borderRadius="5%";
        inputField.style.color="white";
        inputField.style.alignContent="center";
        inputField.style.justifyContent="center";
        inputField.style.textAlign = "center"; // Center the text
        inputField.style.fontWeight = "bold"; // Make it bold
        inputField.style.fontSize = "16px"; // Adjust font size if needed
        inputField.style.padding = "10px"; // Add padding for better spacing
        inputField.style.boxSizing = "border-box"; // Prevent overflow issues

        // inputField.value = "Enter your command here...";

        inpContainer.innerHTML = "";  // Clear previous content
        inpContainer.appendChild(inputField);  // Add input field
        
    }
    else{
        Input.innerText="Voice Input";
        input="Voice Input";
        // Replace <input> back with <p>
        const textParagraph = document.createElement("p");
        textParagraph.id = "Inp";
        textParagraph.innerText = "Hello! Zyra"; // Set default text

        inpContainer.innerHTML = "";  // Clear previous content
        inpContainer.appendChild(textParagraph);  // Add back the paragraph
    }
})

// setTimeout(() => {
//     input=listenQuery();
//     console.log(input);
// }, 5000);

Operational.addEventListener("click",()=>{
    console.log("operational button has been clicked")
    if(operational_mode==="Fully Operational"){
        Operational.innerText="Partial Operational";
        operational_mode="Partial Operational";
        gif.src = 'Process1.gif' + '?t=' + new Date().getTime();
    }
    else if(operational_mode==="Partial Operational"){
        Operational.innerText="Sleep Mode";
        operational_mode="Sleep Mode";
        gif.src = 'Sleep.gif' + '?t=' + new Date().getTime();
    }
    else{
        Operational.innerText="Fully Operational";
        operational_mode="Fully Operational";
        gif.src = 'bidirectional_output.gif' + '?t=' + new Date().getTime();
    }
})
Output.addEventListener("click",()=>{
    console.log("output button has been clicked")
    if(output==="Voice Output"){
        Output.innerText="Text Output";
        output="Text Output";
    }
    else{
        Output.innerText="Voice Output";
        output="Voice Output";
    }
})



function updateDateTime() {
    const now = new Date();

    // Format the date
    const date = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Get the day of the week
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Format the time
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    // Update HTML elements
    document.getElementById('date').innerText = date;
    document.getElementById('day').innerText = day;
    document.getElementById('time').innerText = time;
}

// Call the function every second
setInterval(updateDateTime, 1000);

// // Initial call
updateDateTime();

function updateNetworkStatus() {
    const wifiStatus = navigator.onLine ? "Wifi Status : Connected" : "Wifi Status : Not Connected";
    document.getElementById("wifi-status").innerText = wifiStatus;

    const internetStatus = navigator.onLine ? "Internet-status : Online" : "Internet-status : Offline";
    document.getElementById("internet-status").innerText = internetStatus;
}

// Generate a large random data string
function generateRandomData(sizeInMB) {
    const sizeInBytes = sizeInMB * 1024 * 1024; // MB to bytes
    return 'a'.repeat(sizeInBytes); // Repeated 'a' characters
}

// Simulate download speed
function measureDownloadSpeed() {
    const data = generateRandomData(1); // Simulate a 1 MB file
    const startTime = performance.now();

    setTimeout(() => {
        const endTime = performance.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const fileSizeInBits = data.length * 8; // Convert bytes to bits
        const downloadSpeed = (fileSizeInBits / timeInSeconds / 1e6).toFixed(2); // Mbps
        // console.log(`Download Speed: ${downloadSpeed} Mbps`);
        document.getElementById("download-speed").innerText = "Downloading Speed : "+downloadSpeed+"Mb";
    }, 500); // Simulate network delay
}

// Simulate upload speed
function measureUploadSpeed() {
    const data = generateRandomData(1); // Simulate a 1 MB file
    const startTime = performance.now();

    setTimeout(() => {
        const endTime = performance.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const fileSizeInBits = data.length * 8; // Convert bytes to bits
        const uploadSpeed = (fileSizeInBits / timeInSeconds / 1e6).toFixed(2); // Mbps
        document.getElementById("upload-speed").innerText = "Uploading Speed : "+uploadSpeed+"Mb";
        // console.log(`Upload Speed: ${uploadSpeed} Mbps`);
    }, 500); // Simulate network delay
}

// Update statuses and measure speeds
function updateNetworkInfo() {
    updateNetworkStatus();

    if (navigator.onLine) {
        measureDownloadSpeed();
        measureUploadSpeed();
    } else {
        document.getElementById("download-speed").innerText = "N/A";
        document.getElementById("upload-speed").innerText = "N/A";
    }
}

// Monitor online/offline status
window.addEventListener("online", updateNetworkInfo);
window.addEventListener("offline", updateNetworkInfo);

// Initial check
updateNetworkInfo();

setTimeout(()=>{
    console.error("This is a test error.");
},2000);