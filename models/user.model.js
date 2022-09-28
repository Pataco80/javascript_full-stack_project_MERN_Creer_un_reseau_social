const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLenght: 50,
      trim: true,
    },
  },
  {
    password: {
      type: String,
      required: true,
      minLength: 6,
      max: 1100,
    },
  },
  {
    email: {
      type: String,
      required: true,
      validator: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      max: 1100,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
