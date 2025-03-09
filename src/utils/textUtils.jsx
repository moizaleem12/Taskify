

export const toUpperCase = (text) => text.toUpperCase();

export const toLowerCase = (text) => text.toLowerCase();

export const reverseText = (text) => text.split("").reverse().join("");

export const removeExtraSpaces = (text) => text.replace(/\s+/g, " ").trim();

export const toHTML = (text) =>
  `<p>${text
    .replace(/\n/g, "<br>")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</p>`;

