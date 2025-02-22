// utils/fileUtils.js
import fs from "fs/promises";
import path from "path";

const readData = async (file) => {
    const filePath = path.resolve("./data", file);
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (file, data) => {
    const filePath = path.resolve("./data", file);
    await fs.truncate(filePath); // Clear file content before writing
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};

export { readData, writeData };
