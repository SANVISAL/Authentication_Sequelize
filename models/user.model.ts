import { DataTypes, Sequelize } from "sequelize";
// import { sequelize } from "../src/database/sequelize-source";
import { PrimaryModel } from "./primary.model";
import { Token } from "./user-token.model";
import { Role } from "./role.model";

export class User extends PrimaryModel {
  public userName!: string;
  public gender!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "roles", // Reference to Roles table
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
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
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "Users",
      }
    );
  }
  public static associate() {
    // User.hasMany(Token, {
    //   foreignKey: "tokenId",
    //   as: "tokens",
    //   onDelete: "CASCADE",
    // });
    User.belongsTo(Role, {
      foreignKey: "roleId",
      as: "role",
      onDelete: "CASCADE",
    });
  }
}
