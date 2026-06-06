import { IoManager } from "./IoManager";
import { Quiz } from "./Quiz";
export class QuizManager {
    private quizzes: Quiz[];
    constructor() {
        this.quizzes = [];
    }

    public start(roomId: String) {
        const io = IoManager.getIo();
        const quiz = this.quizzes.find(x => x.roomId === roomId);
        quiz.start(io);
    }
    public next(roomId: string) {
        const io = IoManager.getIo();

    }

    submit(roomId: string, problemId: string, submission: 0 | 1 | 2 | 3) {
     return this.getQuiz(roomId)?.submit(roomId,problemId,submission);

    }


    addUser(roomId: string, name: string) {
        return this.getQuiz(roomId)?.addUser(name);
    }
    getQuiz(roomId: string) {
        const quiz = this.quizzes.find(x => x.roomId === roomId) ?? null

    }
}