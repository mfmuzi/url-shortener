import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {

        
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
            res.json(url)
            return
        }

        
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`

        
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
       
        const { hash } = req.params


        const url = await URLModel.findOne({ hash })

        if (url) {
            res.redirect(url.originURL)
            return
        }

        res.status(400).send('<!DOCTYPE html><html lang="en"><head><style type="text/css">body {display: flex;flex-flow: row wrap;align-content: center;justify-content: center;}div {width: 100%;text-align: center;}.number {background: #fff;position: relative;font: 900 30vmin "Consolas";letter-spacing: 5vmin;text-shadow: 2px -1px 0 #000, 4px -2px 0 #0a0a0a, 6px -3px 0 #0f0f0f, 8px -4px 0 #141414, 10px -5px 0 #1a1a1a, 12px -6px 0 #1f1f1f, 14px -7px 0 #242424, 16px -8px 0 #292929;}.number::before {background-color: #673ab7;background-image: radial-gradient(closest-side at 50% 50%, #ffc107 100%, rgba(0, 0, 0, 0)), radial-gradient(closest-side at 50% 50%, #e91e63 100%, rgba(0, 0, 0, 0));background-repeat: repeat-x;background-size: 40vmin 40vmin;background-position: -100vmin 20vmin, 100vmin -25vmin;width: 100%;height: 100%;mix-blend-mode: screen;-webkit-animation: moving 10s linear infinite both;animation: moving 10s linear infinite both;display: block;position: absolute;content: "";}@-webkit-keyframes moving {to {background-position: 100vmin 20vmin, -100vmin -25vmin;}}@keyframes moving {to {background-position: 100vmin 20vmin, -100vmin -25vmin;}}.text {font: 400 5vmin "Courgette";color:#673ab7;}.text span {font-size: 10vmin;color: #5387b3;}</style><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="./index.css"><title>Document</title></head><body><div class="number">400</div><div class="text"><span>Ooops...</span><br><br>A URL informada está incorreta.</div></body></html>');
      
    }
}