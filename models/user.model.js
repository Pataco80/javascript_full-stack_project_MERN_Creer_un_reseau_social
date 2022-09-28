const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchma = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 50,
      trim: true,
    },
  },
  {
    password: {
      type: String,
      required: true,
      minLenght: 6,
      max: 1100,
      trim: true,
    },
  },
  {
    email: {
      type: String,
      required: true,
      minLenght: 6,
      maxLenght: 20,
      validator: [isEmail],
      lowercase: true,
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
    following: {
      type: [String],
    },
    followers: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
)

userSchma.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const UserModel = mongoose.model('user', userSchma)

module.exports = UserModel
