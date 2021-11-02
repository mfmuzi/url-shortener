import { config } from '../config/Constants'
import { Request, Response } from 'express'
import shortId from 'shortid'
import { URLModel } from '../database/model/URL'

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {

        //Verificar a existência da URL
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
            res.json(url)
            return
        }

        //Criar o hash para a URL
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`

        //Salvar a URL no DB 
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        //Retorna a URL salva
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //utilizar o hash da URL
        const { hash } = req.params
        

        //encontrar a URL original através do hash
        const url = await URLModel.findOne({hash})

        if(url) {
            res.redirect(url.originURL)
            return
        }
        res.status(400).redirect('https://www.pixar.com/404')
        

        //Redirecionar para a URL original
        res.redirect(url.originURL)


    }
}