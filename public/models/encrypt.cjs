// Encrypts a .glb avatar so it can't be hot-linked as a plain model file.
// Usage: node encrypt.cjs <input.glb> <output.enc> <password>
// Then set avatar.model, avatar.encrypted and avatar.decryptionKey in src/data/portfolio.json.
const crypto = require("crypto");
const fs = require("fs");

const [inputFile = "character.glb", outputFile = "character.enc", password = "Character3D#@"] =
  process.argv.slice(2);

const key = crypto.createHash("sha256").update(password).digest();
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
const input = fs.createReadStream(inputFile);
const output = fs.createWriteStream(outputFile);

output.write(iv);
input.pipe(cipher).pipe(output);
output.on("finish", () => console.log(`Encrypted ${inputFile} -> ${outputFile}`));
