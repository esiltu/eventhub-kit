import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  email: string;
  fullName: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
