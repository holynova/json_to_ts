export const debugMode = true;
export const log = debugMode ? console.log.bind(console) : () => {};
