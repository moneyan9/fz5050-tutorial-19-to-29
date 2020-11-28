import { NextApiRequest, NextApiResponse } from "next";

import sqlite3 from 'sqlite3';
import { open } from "sqlite";


import { authenticated } from './handler'; //外部ファイルからインポート


export default authenticated(

    //ここにapiの処理を書く
    async function getPeople(req: NextApiRequest, res: NextApiResponse) {

        //db Open
        const db = await open(
            {
                filename: './mydb.sqlite',
                driver: sqlite3.Database
            }
        );

        const people = await db.all('select id, name, email from person');
        res.json(people);

    }

);