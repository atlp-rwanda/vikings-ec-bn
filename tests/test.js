import { connectDB } from "../src/app";

beforeEach(async() => {
    await connectDB();;
  });
let team="Vikings"

 test("should respond the team name",()=>{
            
            expect(team).toBe("Vikings")
  })