/* const input = document.getElementById("input");
const terminalOutput = document.getElementById("terminal-output");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    alert("Hello, World!");
  }
}); */

/* document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const terminalOutput = document.getElementById("terminal-output");

  // Focus the input field when the page loads
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      alert("Hello, World!");
    }
  });
}); */

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const terminalOutput = document.getElementById("terminal-output");

  let commandHistory = [];
  let historyIndex = -1;

  // Display a welcome message
  terminalOutput.innerHTML += `<div>type "help" for options</div>`;

  // Focus the input field when the page loads
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = input.value.trim();

      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;

        // Display the command in the terminal
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        input.value = "";

        // Process the command and display the output
        processCommand(command);
      }
    } else if (event.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (event.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
    }
  });

  function processCommand(command) {
    let output = "";

    switch (command.toLowerCase()) {
      case "help":
        output = `
                <div>
                about - know about me<br>
                contact - contact me
                </div>
                `;
        break;
      case "about":
        output = "<div>I am a terminal-style web interface.</div>";
        break;
      case "contact":
        output = "<div>You can contact me at example@example.com.</div>";
        break;
      default:
        output = `<div>Command not found: ${command}</div>`;
        break;
    }

    // Display the output below the command
    terminalOutput.innerHTML += output;

    // Scroll to the bottom of the terminal to ensure the latest output is visible
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});
