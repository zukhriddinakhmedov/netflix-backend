import express from "express"
import fs from "fs"
import uniq from "uniq"
import { fileURLToPath } from "url"
import { parseFile, uploadFile } from "../utils/upload/index.js"
import createHttpError from "http-errors"

const _filename = fileURLToPath(import.meta.url)
const _dirname = dirname(_filename)
const mediaFilePath = path.join(_dirname, "media.json")

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const media = {
            ...req.body,
            imdbId: uniqid(),
            createdAt: new Date(),
            updatedAt: new Date()
        },

        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)

        fileAsJson.push(media)
        fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJson))

        res.send(media)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

//to get the medias
router.get("/", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJson = JSON.parse(fileAsString)
        res.send(fileAsJson)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

