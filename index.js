const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Displaying data with fs module
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading directory');
        }
        res.render('index', {files: files}); // Sending data to the index page
    })
})

//Creating a new task and redirecting back to the index page
app.post('/create', (req, res) => {
    if (!req.body.title || !req.body.details) {
        return res.status(400).send('Title and details are required');
    }
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=> {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating file');
        }
        res.redirect('/');
    })
})

//Displaying FileData on new Page
app.get('/files/:filename', (req, res) =>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.render('show', {filedata: data, filename: req.params.filename});
    })
})

//Deleting a Task
app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting file');
        }
        res.redirect("/");
    });
});

// Route to render the edit form
app.get('/edit/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, 'files', fileName);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        res.render('edit', { file: fileName, details: data });
    });
});

// Route to handle the update
app.post('/update/:file', (req, res) => {
    const fileName = req.params.file;
    const newTitle = req.body.title;
    const newDetails = req.body.details;
    
    if (!newTitle || !newDetails) {
        return res.status(400).send('Title and details are required');
    }

    const oldFilePath = path.join(__dirname, 'files', fileName);
    const newFilePath = path.join(__dirname, 'files', `${newTitle.split(' ').join('')}.txt`);

    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error renaming file');
        }
        fs.writeFile(newFilePath, newDetails, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error writing file');
            }
            res.redirect('/');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
