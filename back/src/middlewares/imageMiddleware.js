function uploadProfile (req, res) {
    const image = req.file.path;
    console.log(req.file);
    if (image === undefined) {
        return res.status(400).send(error.message);
    }
    res.status(200).send()
}