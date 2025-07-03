import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import e from "express";


const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var imageServer = "";
const API_URL = "https://picsart-remove-background2.p.rapidapi.com/removebg";
const API_KEY = "33e8d841e0msh01e25eab6dfbcd2p1f8a2ejsn3e29e7450492" 


const upload = multer({ storage: multer.memoryStorage() });


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
    res.render("index.ejs", { result: null});
});

app.post("/erase", upload.single('image_inputName'), async (req, res) => {
    imageServer = req.file;

    const data = new FormData();
    data.append('image', imageServer.buffer, imageServer.originalname);
    data.append('bg_blur', '0');
    data.append('format', 'PNG'); 

    try {
      const apiBackgroundRemover = await axios.post(API_URL, data, {
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'picsart-remove-background2.p.rapidapi.com',
            'User-Agent': 'RapidAPI',
            ...data.getHeaders(),
        }
      });
      const result = apiBackgroundRemover.data;
      console.log(result);
      res.render("index.ejs", { result : result.data.url });
    } 
    catch (error) {
      res.render("index.ejs", { result: error.message });
      console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// export const handler = serverless(app);
export default app;