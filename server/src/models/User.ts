import { mongoose } from "../config/db";
import {v4 as uuidv4} from "uuid"; 

/**
 * user_id -> uuid -> required and unique
 * user_name -> string -> required and unique
 * user_email -> string -> required and unique
 * user_passwd -> string -> required
 */

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4(),
    unique: true,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_passwd: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

export default User;