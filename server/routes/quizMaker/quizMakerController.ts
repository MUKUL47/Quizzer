import { Quiz, Owner, Data } from '../../shared/dataModels';
import { firebase } from '../routeController';
export default class QuizMaker {
    public static async createQuiz(request : any, response) {
        try{
            const quizBody : Quiz = request.body;
            const obj = {};
            const quizId = new Date().valueOf();
            obj[quizId] = quizBody;
            await firebase.database().ref().update(obj);
            response.status(201).send({ id : quizId })
        }catch(e){
            response.status(500).send(e)
        }
    }
    public static async getQuiz(request : any, response){
        try{
            const id : string = request.params.id;
            const type : string = request.headers.type;
            const type : string = request.headers.type;
            if(!id || !type){
                response.status(400).send({ error : 'id or type is missing' });
            }
            else if(type && ){

            }
            
            // await firebase.database().ref().update(obj);
            // response.status(201).send({ id : quizId })
        }catch(e){
            response.status(500).send(e)
        }
    }
}
class Question{
    id ?:string;
    owner : Owner;
    data : Data;
    constructor(owner : Owner, data : Data){
        this.owner = owner;
        this.data = data;
    }
    setId(id : string){
        this.id = id;
    }
}