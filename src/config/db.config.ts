import mongoose from 'mongoose'

import config from './index'

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url! as string)
    console.log('✅ Database Connected')
  } catch (err) {
    console.log('Failed Mongodb Connect', err)
  }
}

export default connectDB
