"use server";

import { revalidatePath } from "next/cache";
import { Product, Transaction, User, File } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { writeFile } from "fs/promises";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const createTransaction = async (formData) => {
  const { name, status, amount } =
    Object.fromEntries(formData);
    try {
      connectToDB();
  
      const newTransaction = new Transaction({
        name,
        status,
        amount,
      });
  
      await newTransaction.save();
    } catch (err) {
      console.log(err);
      throw new Error("Failed to create transaction!");
    }
  
    revalidatePath("/dashboard/transactions");
    redirect("/dashboard/transactions");
}

export const createFile = async (formData) => {

  const file = formData.get('file');

  if (!file) {
    throw new Error("NO file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 为上传的文件生成唯一的文件名
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  // Extracting the file extension
  const fileExtension = file.name.split('.').pop();

  const path = `./public/uploads/${uniqueSuffix}.${fileExtension}`
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`)

  const fileSizeInBytes = file.size;
  const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2); // 保留两位小数 1 KB = 1024 Bytes


  const url = `/uploads/${uniqueSuffix}.${fileExtension}`
  const { name, type } =
    Object.fromEntries(formData);
    try {
      connectToDB();
  
      const newFile = new File({
        name: name || file.name,
        originalName: file.name,
        type,
        size: fileSizeInKB,
        url: url
      });
  
      await newFile.save();
    } catch (err) {
      console.log(err);
      throw new Error("Failed to create file!");
    }
  
    revalidatePath("/dashboard/files");
    redirect("/dashboard/files");
}


export const deleteFile = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await File.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete file!");
  }
  revalidatePath("/dashboard/files");
}


export const updateFile = async(formData) => {
  const { id, name, type } =
    Object.fromEntries(formData);
    try {
      connectToDB();
  
      const updateFields = {
        name,
        type
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
  
      await File.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update file!");
    }
    revalidatePath("/dashboard/files");
    redirect("/dashboard/files");
}


export const deleteTransaction = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Transaction.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete transaction!");
  }

  revalidatePath("/dashboard/transactions");
};


export const updateTransaction = async (formData) => {

  console.log(formData);

  const { id, name, amount, status } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      name, amount, status
    };

    // 如果某个字段为空字符串或者未定义 那么就删除这个字段 这样我们就不会更新这个字段
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Transaction.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update transaction!");
  }

  revalidatePath("/dashboard/transactions");
  redirect("/dashboard/transactions");
}

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};
