import { IoManager } from "./IoManager";
export class QuizManager {
    private quizzes: Quiz[];
    constructor() {
        this.quizzes = [];
    }

   public  start(roomId:String) {
        const io = IoManager.getIo();
        const quiz = this.quizzes.find(x => x.roomId === roomId); 
        quiz.start(io);
    }

}