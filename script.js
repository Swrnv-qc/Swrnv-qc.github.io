document.addEventListener("DOMContentLoaded", function () {
  const terminal = document.getElementById("terminal");
  const inputLine = document.getElementById("input-line");
  const input = document.getElementById("input");
  const terminalOutput = document.getElementById("terminal-output");
  let commandHistory = [];
  let historyIndex = -1;

  // Display a welcome message
  appendOutput('type "help" for options');

  // Focus the input field when the page loads
  input.focus();

  // Event listener for the entire document to handle clicks
  document.addEventListener("click", function (event) {
    if (event.target !== input && !terminalOutput.contains(event.target)) {
      input.focus();
    }
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = input.value.trim();
      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        appendOutput(`> ${command}`, "command");
        input.value = "";
        processCommand(command);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const autocompleteOptions = ["about", "contact", "clear", "help"];
      const inputText = input.value.trim();
      const matchingOptions = autocompleteOptions.filter((option) =>
        option.startsWith(inputText)
      );
      if (matchingOptions.length > 0) {
        input.value = matchingOptions[0];
      }
    }
  });

  function appendOutput(content, className = "") {
    const outputElement = document.createElement("div");
    outputElement.innerHTML = content;
    outputElement.className = className;
    terminalOutput.appendChild(outputElement);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function processCommand(command) {
    switch (command.toLowerCase()) {
      case "help":
        appendOutput(`
          about - know about me<br>
          contact - contact me<br>
          clear - clear the terminal screen
        `);
        break;
      case "about":
        appendOutput("I am a terminal-style web interface.");
        break;
      case "contact":
        appendOutput("You can contact me at example@example.com.");
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        break;
      default:
        appendOutput(`Command not found: ${command}`);
        break;
    }
  }
});
