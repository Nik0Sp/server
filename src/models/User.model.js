import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgUrl: { type: String, default: "" },
  role:{
    type:String,
    default:"user"
  },
  gastKonto:[]
},
  {
    timestamps: true,
  }
);

// vor dem speichern eines neuen benutzers die passwortverschlüsselung durchführen
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
});

//guckt ob ein eingegebenes passwort mit dem verschlüsselten passwort des benutzers übereinstimmt
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

export default mongoose.model("User", UserSchema);
