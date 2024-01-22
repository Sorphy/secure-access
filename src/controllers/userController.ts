import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { GenerateOtp, emailHtml, sendEmail } from "../utils/mfaUtils";
import { FROM_ADMIN_MAIL, USER_SUBJECT } from "../config";


export const signUp = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const {
      name,
      email,
      password,
      confirm_password,
      role,
      enableMFA,
      phoneNumber,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    // set default role and permissions for new users
    let defaultRole: "admin" | "manager" | "employee" = "employee";
    let permissions: string[] = [
      "VIEW_PRODUCTS",
      "VIEW_SALES_REPORTS",
      "PROCESS_ORDERS",
    ];

    if (role) {
      defaultRole = role;
      // Adjust permissions based on the specified role, similar to what you had before
      if (role === "admin") {
        permissions = [
          "MANAGE_PRODUCTS",
          "MANAGE_EMPLOYEES",
          "VIEW_SALES_REPORTS",
        ];
      } else if (role === "manager") {
        permissions = [
          "VIEW_PRODUCTS",
          "MANAGE_EMPLOYEES",
          "VIEW_SALES_REPORTS",
        ];
      } else if (role === "employee") {
        permissions = ["VIEW_PRODUCTS", "VIEW_SALES_REPORTS", "PROCESS_ORDERS"];
      }
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP
    const { otp, expiry } = GenerateOtp();
    let mfaEnabled = false;
    let otpSecret;
    if (enableMFA) {
      // Generate OTP secret
      console.log("mfa enabled");
      // otpSecret = generateSecret();
      mfaEnabled = true;

      // Send OTP via SMS
      // if (phoneNumber) {
      //   sendSMS(phoneNumber, `Your OTP: ${otpSecret}`);
      // }
    }
    // Create a new user
    const newUser = await User.create({
      id,
      name,
      email,
      password: hashedPassword,
      role: defaultRole,
      permissions,
      mfaEnabled,
      otpSecret: otp,
      otp_expiry: expiry,
      phoneNumber,
    });

    // send email
    const html = emailHtml(otp);
    await sendEmail(FROM_ADMIN_MAIL, email, USER_SUBJECT, html);

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    // Check Password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    // Generate Token
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User successfully signed in",
      token: token,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

