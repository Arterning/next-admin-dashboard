import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);


const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    // pid 表示这个图片和哪个对象相关联
    pid: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    date: {
      type: String,
      required: false
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    isImportant: {
      type: Boolean,
      default: false
    },
    userID: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)


export const User = 
  mongoose.models.User || mongoose.model("User", userSchema);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export const File = mongoose.models.File || mongoose.model("File", fileSchema)

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)