import { connectToDB } from "@/app/lib/utils";
import { Task } from "../../lib/models";


export async function GET() {

    connectToDB();

    const tasks = await Task.find({});

    return Response.json({ tasks });

}