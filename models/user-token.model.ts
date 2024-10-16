import { DataTypes, Sequelize } from "sequelize";
import { PrimaryModel } from "./primary.model";
// import { sequelize } from "../src/database/sequelize-source";
import { User } from "./user.model";

export class Token extends PrimaryModel {
  refreshToken!: string;
  expireAt!: Date;
  public static initialize(sequelize: Sequelize) {
    Token.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: "id",
          },
        },
        refreshToken: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        expireAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tokens",
        timestamps: true,
        paranoid: true,
      }
    );
  }
  public static associate() {
    Token.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}
