import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "employee";
  permissions: string[];
  mfaEnabled: boolean;
  otpSecret?: number;
  otp_expiry?: Date;
  phoneNumber?: string;
}
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "manager" | "employee";
  public permissions!: string[];
  public mfaEnabled!: boolean;
  public otpSecret?: number;
  public otp_expiry?: Date;
  public phoneNumber?: string;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "employee"),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSONB, // Use JSONB for an array of permissions
      allowNull: false,
    },
    mfaEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    otpSecret: {
      type: DataTypes.INTEGER,
    },
    otp_expiry: {
      type: DataTypes.DATE,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
