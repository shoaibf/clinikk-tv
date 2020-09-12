import { NextFunction, Request, Response } from "express";
import Service, { IService } from "./../database/models/service";
const ObjectId = require('mongodb').ObjectID;

/* POST service/api/create
 * Create/Update Service Page.
 */
export const createService = async (req: Request, res: Response, next: NextFunction) => 
{
    var query = {_id: req.params.id};
if (!query._id) {
    query._id = new ObjectId();
}
    Service.findOneAndUpdate(query, req.body, { upsert: true, new: true }, (err, service) => {
        if(err){
            return res.status(500).send({
                msg: "Error! Create Service failed"
            });
        }
        res.json(service);
    });

}

/* GET service/api/list
 * Get Services Page.
 */

export const listServices = (req: Request, res: Response) => {
    const query: any = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    Service.find(query, (err, services) => {
        if (err) {
            return res.send(err);
        }
        res.json(services);
    });
}