import { Router } from "express";
import { login_required } from "../middlewares/login_required";
const multer = require("multer");

const imgRouter = Router();

const storage = multer.diskStorage({
    dest: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, false)
//     } else {
//         cb(null, true)
//     }
// }

const upload = multer({storage: storage});



//post image
imgRouter.post(
    "/upload",
    login_required,
    upload.single('file'),
    (req, res) => {
        console.log("req.file: ", req.file)
        console.log("req.body: ", req.body)
        res.json({ message: "success", file: req.file })
    }
)

export { imgRouter };