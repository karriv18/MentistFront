import { combineReducers } from "redux"
import auth from "./auth"
import message from "./message"
import member from "./member"
import deposit from "./uploading"
import preliminary from "./uploading"
import mdchecklist from "./checklist"
import ticket from "./ticket"
import followup from "./followup"
import booking from "./booking"
import announcement from "./announcement"
import promo from "./ads"
import support from "./support"
export default combineReducers({
  auth,
  message,
  member,
  deposit,
  preliminary,
  mdchecklist,
  ticket,
  followup,
  booking,
  announcement,
  promo,
  support,
})