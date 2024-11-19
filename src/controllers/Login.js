import errorM from '../utils/errorM'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const signIn = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(404).json(errorM('User or password not informed'))
  }
  await Users.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(401).json(errorM('User or password incorrect'))
      }
      // Verify password using bcrypt
      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
          return res.status(500).json(errorM(err))
        }
        if (!result) {
          return res.status(401).json(errorM('User or password incorrect'))
        }
        const { id, email } = user
        const token = jwt.sign({ id, email }, 'process.env.SECRET', {
          expiresIn: '1d'
        })
        return res.json({ token })
      })
    })
    .catch(err => {
      return res.status(500).json(errorM(err))
    })
}

const signUp = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(404).json(errorM('User or password not informed'))
  } else if (password.length < 6) {
    return res.status(404).json(errorM('Password must be at least 6 characters'))
  }

  await Users.findOne({ where: { email } })
    .then(user => {
      if (user) {
        return res.status(409).json(errorM('User already exists'))
      }
      // Create password using bcrypt
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json(errorM(err))
        }
        Users.create({ email, password_hash: hash })
          .then(user => {
            return res.json(user)
          })
          .catch(err => {
            return res.status(400).json(errorM((err.message.split('Validation error: '))[1]))
          })
      })
    })
    .catch(err => {
      return res.status(500).json(errorM(err))
    })
}

const sendEmail = async (req, res) => {
  try {
    const emailForms = req.body.email || null
    if (!emailForms) return res.status(404).send(errorM('Email not sent'))

    // Check if user exists
    const user = await Users.findOne({ where: { email: emailForms } })
    if (!user) {
      return res.status(404).send(errorM('User not found'))
    }

    let code = Math.floor(100000 + Math.random() * 900000)
    const remetente = await nodemailer.createTransport({
      host: "smtp.gmail.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 465, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: 'sende3331@gmail.com',
        pass: 'cvan tced hgyr abvb'
      }
    })

    const email = {
      from: 'sende3331@gmail.com',
      to: emailForms,
      subject: 'Your Code',
      text: `Your code is ${code}`,
    }

    //Encrypt the email and code usign bcrypt
    bcrypt.hash(String(code), 10, async (err, hash) => {
      if (err) {
        return res.status(500).json(errorM(err))
      }

      await remetente.sendMail(email, function (error) {
        if (error) {
          console.log(error)
          return res.status(500).send(errorM('Error sending email'))
        }
      })

      const token = jwt.sign({ emailForms, code: hash }, 'SendCodeToken', { expiresIn: '1h' }) // Consider using dotenv for the secret key
      res.status(200).json({ token })
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(errorM('Internal server error'))
  }
}

const checkCode = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json(errorM('User did not request the email'));
  }

  const [, token] = authorization.split(' ');


  try {
    const { emailForms, code } = jwt.verify(token, "SendCodeToken") //TODO: replace with dotenv
    if (!code) return res.status(404).json(errorM('User did not request the email'))

    const userCode = req.body.code
    if (!userCode) return res.status(404).json(errorM('Code not sent'))

    // Unhash the code and compare with the user's code
    const result = await bcrypt.compare(code, userCode)
    if (!result) {
      return res.status(401).json(errorM('Invalid Code!'))
    }
    const user = await Users.findOne({ where: { email: emailForms } })
    if (user !== null) {
      const token = jwt.sign({ email: emailForms, id: user.id }, 'ResetPasswordToken', { expiresIn: '1h' }) //TODO: replace with dotenv
      return res.status(200).json({ token })
    }

    return res.status(404).json(errorM('User does not exist!'))

  } catch (e) {
    return res.status(401).json(errorM('Expired or invalid token.'));
  }
}

const resetPassword = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json(errorM('User did not validate the email'));
  }

  const [, token] = authorization.split(' ');

  try {
    const { email, id } = jwt.verify(token, "ResetPasswordToken") //TODO: replace with dotenv
    if (!email || !id) return res.status(404).json(errorM('User did not request the email'))

    const user = await Users.findOne({ where: { email } })
    if (user === null) return res.status(404).json(errorM('User does not exist!'))

    const newPassword = req.body.password
    if (!newPassword) return res.status(404).json(errorM('Password not sent!'))

    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        return res.status(500).json(errorM(err))
      }
      user.password_hash = hash
      user.save()
      return res.status(200).json({ message: 'Password changed successfully!' })
    })
  } catch (e) {
    return res.status(401).json(errorM('Expired or invalid token.'));
  }
}

export {
  signIn,
  signUp,
  sendEmail,
  checkCode,
  resetPassword,
}