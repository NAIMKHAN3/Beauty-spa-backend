import jwt from 'jsonwebtoken'
import config from '../config'
const createToken = (type: "ACCESS" | "REFRESH", payload: any) => {
    if (type === "ACCESS") {
        return jwt.sign(payload, config.auth_token!,
            { expiresIn: config.auth_token_expire || "2m" })
    } else if (type === "REFRESH") {
        return jwt.sign(payload, config.refresh_token!,
            { expiresIn: config.refresh_token_expire || "10d" })
    }
    return null
}

export default createToken;