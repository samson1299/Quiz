import { IoManager } from "./IoManager";
import { Quiz,AllowedSubmissions } from "./Quiz";

let globalProblemId = 0;
export class QuizManager {
    private quizzes: Quiz[];
    constructor() {
        this.quizzes = [];
    }

    public start(roomId: string) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        }
        quiz.start();
    }

    public addProblem(roomId: string, problem: {
        title: string,
        description: string,
        imageUrl: string,
        answer: AllowedSubmissions;
        options: {
            id: number,
            title: string,
        }[],

    }) {
        const quiz = this.getQuiz(roomId);
        if (!quiz) {
            return;
        } else {
            quiz.addProblem({
               ...problem,
               id:(globalProblemId++).toString( ),
               startTime:new Date().getTime(),
               submissions:[],

            })
        }
    }


    public next(roomId: string) {
        const quiz = this.getQuiz(roomId)
        if(!quiz){
            return;
        }
        quiz.next();
    }



    addUser(roomId: string, name: string) {
        return this.getQuiz(roomId)?.addUser(name);
    }


    submit(userId: string, roomId: string, problemId: string, submission: 0 | 1 | 2 | 3) {
        return this.getQuiz(roomId)?.submit(userId, roomId, problemId, submission);

    }


    getQuiz(roomId: string) {
        return this.quizzes.find(x => x.roomId === roomId) ?? null

    }
    getCurrentState(roomId: string) {
        const quiz = this.quizzes.find(x => x.roomId === roomId);
        if (!quiz) {
            return null;
        } else {
            return quiz.getCurrentState();
        }
    }
    addQuiz(roomId:string){
    const quiz = new Quiz(roomId);
    this.quizzes.push(quiz);
    }
}