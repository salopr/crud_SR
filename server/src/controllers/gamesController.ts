import {Request, Response} from 'express';

import pool from '../database'


class GamesController {

    public async list (req: Request, res: Response){
        const games = await pool.query('SELECT * FROM games');
        res.json(games);

    } 

    public async getOne (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        
        if ((<any>games).length > 0){
            return res.json((<any>games)[0]);
        }
        res.status(404).json({text: "The game doesn't exist"})
    }   

    public async create (req: Request, res: Response) {
        
        await pool.query('INSERT INTO games set ?', [req.body]);

        console.log(req.body);
        res.json({text: 'Juego guardado'})
        
    } 

    public async update (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({text: 'EL juego fue actualizado' })
    } 

    public async delete (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id])
        res.json({text: 'El juego eliminado' })
    } 
}

const gamesController = new GamesController();
export default gamesController;
