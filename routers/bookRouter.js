import { Router } from "express";
import fs from 'fs'

export const router = Router();

router.get('/', (req, res) => {
    res.send('Works');
})

router.get('/all', (req, res) => {
    let data = fs.readFileSync('./data.json')
    data = data.toString()
    data = JSON.parse(data)
    res.send(data);
})

router.get('/by-name/:name', (req, res) => {
    let found = false;
    let name = req.params.name;

    let data = fs.readFileSync('./data.json')
    data = data.toString()
    data = JSON.parse(data)

    for(const i of data) {
        let title = i.Title.toLowerCase()
        name = name.toLowerCase()

        if(title.includes(' ')) {
            title = title.replaceAll(' ', '_')
        }
        if(name.includes(' ')) {
            name = name.replaceAll(' ', '_')
        }

        if(title == name) {
            res.send(i)
            found = true;
        }
    }

    if(!found) {
        res.send('No Entry Found')
    }
})

router.delete('/by-name/:name', (req,res) => {
    let found = false;
    let name = req.params.name;

    let data = fs.readFileSync('./data.json')
    data = data.toString()
    data = JSON.parse(data)

    for(let i = 0; i < data.length; i++) {
        let title = data[i].Title.toLowerCase()
        name = name.toLowerCase()

        if(title.includes(' ')) {
            title = title.replaceAll(' ', '_')
        }
        if(name.includes(' ')) {
            name = name.replaceAll(' ', '_')
        }

        if(title == name) {
            data.splice(i, 1)
            fs.writeFileSync('./data.json', JSON.stringify(data))      
            res.send('Deleted Entry')
            found = true;
        }
    }

    if(!found) {
        res.send('No Entry Found')
    }
})
