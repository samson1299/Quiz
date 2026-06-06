import { IoManager } from "./IoManager";

const PROBLEM_TIME_S = 20;

export type AllowedSubmissions = 0 | 1 | 2 | 3;
interface User {
  name: string;
  id: String;
  points: number;
}

interface submission {
  problemId: string;
  userId: string;
  isCorrect: boolean;
  optionSelected: AllowedSubmissions;
}
interface Problem {
  title: string;
  description: string;
  imageUrl: string;
  startTime: number;
  answer: AllowedSubmissions;
  id: string;
  option: {
    id: number;
    title: string;
  }
  submissions: submission[]
}

export class Quiz {
  public roomId: string;
  private hasStarted: boolean;
  private problems: Problem[];
  private activeProblem: number;
  private users: User[];

  constructor(roomId: string) {
    this.roomId = roomId;
    this.hasStarted = false;
    this.activeProblem = 0;
    this.problems = [];
    this.users = [];
  }
  addProblem(problem: Problem) {
    this.problems.push(problem);
  }
  start() {
    this.hasStarted = true;
    const io = IoManager.getIo();
    io.emit("CHANGE_PROBLEMS", {
      problem: this.problems[0]
    })
    this.problems[0].startTime = new Date().getTime();
    .startTime =new Date() .getTime();
  }
  
   setActiveProblem(problem:Problem){
    problem.startTime = new Date().getTime();
    problem.submissions = [];
 
     IoManager.getIo ().emit("CHANGE_PROBLEM",{
      problem
     })

    setTimeout(()=>{
     this.sendLeaderBoard();
    },PROBLEM_TIME_S * 1000)
   }
  
  sendLeaderBoard(){
    const leaderBoard = this.getLeaderBoard().splice(0,20);
    IoManager.getIo().to(this.roomId).emit("LeaderBoard",{
      leaderBoard
    })
  }
    
  next() {
    this.activeProblem++;
    const problem = this.problems[this.activeProblem];
    if (problem) {
      problem.startTime = new Date().getTime()
      io.emit("CHANGE_PROBLEM", {
        problem
      })
    } else {
      io.emit("QUIZ_ENDED", {
        problem
      })
    }
  }
  generateRandomString(length: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
  ;
  addUser(name: string) {
    const id = this.generateRandomString(7);
    this.users.push({
      id,
      name,
      points:0
    })
    return id;
  }

  submit(userId: string, roomId: string, problemId: string, submission: 0 | 1 | 2 | 3) {

    const problem = this.problems.find(x => x.id == problemId);
    const user = this.users.find(x => x.id == userId )
    if (!problem || !user) {
      return;
    }
    const existingSubmission = problem.submissions.find(x => x.userId === userId);
    if (existingSubmission) {
      return
    }
    problem.submissions.push({
      problemId,
      userId,
      isCorrect: problem.answer === submission,
      optionSelected: submission
    });
    user.points += 1000  - 500 * (new Date().getTime() - problem.startTime) /20 
  }

}
getLeaderBoard(){
return this.users.sort((a,b) => a.points <b.points ?  1 :-1  )
}