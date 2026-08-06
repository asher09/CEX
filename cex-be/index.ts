import express from "express";
import { connectRedis } from "./src/config/redis.js";
import router from "./src/routes/index.js";

const app= express();
app.use(express.json());

app.use("/api/v1", router);

async function bootup() {
    try { 
        await connectRedis();

        const PORT =  process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Failed to start server: ", error)
        process.exit(1);
    }
}
bootup();
