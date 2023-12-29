import { connectToDB } from "@/app/lib/utils";
import { Task } from "../../lib/models";


export async function GET() {

    connectToDB();

    //find latest 3 task order by createAt
    
    const tasks = await Task.find({}).sort({ createdAt: -1 }).limit(3);

    return Response.json({ tasks });

}