import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  auth_token : process.env.ACCESS_TOKEN,
  auth_token_expire : process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token : process.env.REFRESH_TOKEN,
  refresh_token_expire : process.env.REFRESH_TOKEN_EXPIRES_IN,
}
