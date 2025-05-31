import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlegth: 6,
  },
  profileImage: {
    type: String,
    default: "",
  },

}, {timestamps: true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ✅ nếu KHÔNG thay đổi thì bỏ qua

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // tiếp tục
  } catch (err) {
    console.error("Error hashing password:", err);
    next(err); // ⚠️ phải gọi next(err) nếu có lỗi để tránh treo
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (err) {
    console.error("Error comparing password:", err);
    throw err; // ⚠️ ném lỗi nếu có vấn đề
  }
};

const User = mongoose.model("User", userSchema);

export default User;
