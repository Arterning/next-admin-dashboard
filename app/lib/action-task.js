"use server"

import { revalidatePath } from "next/cache";
import { Task } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

export const deleteTask = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDB();
        await Task.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete task!");
    }

    revalidatePath("/dashboard/tasks");
    redirect("/dashboard/tasks");
};


export const readAllTasks = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 5;
    try {
        connectToDB();
        const count = await Task.find({ title: { $regex: regex } }).count();
        const tasks = await Task.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
        return {
            count,
            tasks
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to read tasks!");
    }

};

//read task by id
export const queryTask = async (id) => {
    if ("add" == id) {
        return null;
    }

    try {
        connectToDB();
        return await Task.findById(id);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to find task')
    }

};


export const createOrUpdateTask = async (formData) => {
    const data = Object.fromEntries(formData)
    const { id } = data
    if (id) {
        console.log("UPDATE");
        updateTask(formData)
    } else {
        console.log("CREATE");
        createTask(formData)
    }

    // it seems redirect is not allowed in if statement
    revalidatePath("/dashboard/tasks");
    redirect("/dashboard/tasks");

};


export const createTask = async (formData) => {

    const { title, description, date, isCompleted, isImportant } = Object.fromEntries(formData);

    try {
        connectToDB();

        const newTask = new Task({
            title,
            description,
            date,
            isCompleted: Boolean(isCompleted),
            isImportant: Boolean(isImportant),
            userID: 1
        })
        
        await newTask.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create task!");
    }


};

export const updateTask = async (formData) => {
    try {
        
        const { id, title, description, date, isCompleted, isImportant } = Object.fromEntries(formData);

        connectToDB();

        const updateFields = {
            title,
            description,
            date,
            isCompleted,
            isImportant
        };

        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);

        await Task.findByIdAndUpdate(id, updateFields);

    } catch (error) {
        console.log(error);
        throw new Error("Failed to update task!");
        
    }

};