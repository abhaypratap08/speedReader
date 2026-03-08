const disp = document.getElementById("w1");
const inputArea = document.getElementById("para");
const btn = document.getElementById("btn");
const delayControl = document.getElementById("speed");

btn.addEventListener("click", startReader);

async function startReader() {
  const text = inputArea.value;
  if (!text.trim()) {
    alert("Please enter some text first.");
    return;
  }
  inputArea.hidden = true;
  btn.hidden = true;
  delayControl.hidden = true;
  await readWords(text);
  inputArea.hidden = false;
  btn.hidden = false;
  delayControl.hidden = false;
}

function parseWord(word) {
  if (word.length === 0) return "";
  if (word.length === 1) return `<span class="focus">${word}</span>`; // fix: class not id
  const mid = Math.floor(word.length / 2);                           //fixed declaration with const
  return (
    word.slice(0, mid) +
    `<span class="focus">${word[mid]}</span>` +                      //fix: class not id
    word.slice(mid + 1)
  );
}

async function readWords(str) {
  const words = str.split(/\s+/);
  for (const word of words) {
    disp.innerHTML = parseWord(word);
    let delay = parseInt(delayControl.value);
    if (/[.,?!]$/.test(word)) delay += 150;  //regex can cover all punctuation at once
    await sleep(delay);
  }
  disp.innerHTML = `d<span class="focus">o</span>ne`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
