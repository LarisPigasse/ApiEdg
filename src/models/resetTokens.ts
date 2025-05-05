import { Model, DataTypes, Sequelize } from "sequelize";

export interface ResetTokensAttributes {
  id: number;
  token: string;
  idOperatore: number;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

export interface ResetTokensCreationAttributes
  extends Omit<ResetTokensAttributes, "id" | "createdAt"> {}

export class ResetTokens
  extends Model<ResetTokensAttributes, ResetTokensCreationAttributes>
  implements ResetTokensAttributes
{
  public id!: number;
  public token!: string;
  public idOperatore!: number;
  public expiresAt!: Date;
  public used!: boolean;
  public createdAt!: Date;

  static initModel(sequelize: Sequelize): typeof ResetTokens {
    ResetTokens.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        token: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        idOperatore: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Operatori",
            key: "idOperatore",
          },
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        used: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "ResetTokens",
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ["token"],
          },
          {
            fields: ["idOperatore"],
          },
        ],
      }
    );

    return ResetTokens;
  }
}

export default ResetTokens;
