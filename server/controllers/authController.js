import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readData, writeData } from "../utils/fileUtils.js";

export const signup = async (req, res) => {
    const users = await readData("users.json");
    const { name, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }
    console.log("Request Body:", req.body);
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword, bookedEvents: [] };
    users.push(newUser);
    await writeData("users.json", users);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "2m" });
    res.status(201).json({ message: "User registered", token, user: { id: newUser.id, name, email } });
};

export const login = async (req, res) => {
    const users = await readData("users.json");
    console.log("Request Body:", req.body);
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user: { id: user.id,name:user.name, email } });
};
