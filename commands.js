export default {
  help: () => {
    appendOutput(`
      about - know about me

      contact - contact me

      clear - clear the terminal screen
    `);
  },
  about: () => {
    appendOutput("I am a terminal-style web interface.");
  },
  contact: () => {
    appendOutput("You can contact me at example@example.com.");
  },
  clear: () => {
    terminalOutput.innerHTML = "";
  },
};
