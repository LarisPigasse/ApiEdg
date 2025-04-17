import { Model, DataTypes, Sequelize } from "sequelize";

export interface OperatoriAttributes {
  idOperatore: number;
  Operatore: string;
  email: string | null;
  password: string | null;
  stato: "attivo" | "inattivo" | "eliminato";
  note: string;
  ultimaLogin: Date | null;
  dataCreazione: Date;
  ultimaModifica: Date;
}

export interface OperatoriCreationAttributes
  extends Omit<
    OperatoriAttributes,
    "idOperatore" | "dataCreazione" | "ultimaModifica"
  > {}

export class Operatori
  extends Model<OperatoriAttributes, OperatoriCreationAttributes>
  implements OperatoriAttributes
{
  public idOperatore!: number;
  public Operatore!: string;
  public email!: string | null;
  public password!: string | null;
  public stato!: "attivo" | "inattivo" | "eliminato";
  public note!: string;
  public ultimaLogin!: Date | null;
  public dataCreazione!: Date;
  public ultimaModifica!: Date;

  static initModel(sequelize: Sequelize): typeof Operatori {
    Operatori.init(
      {
        idOperatore: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Operatore: {
          type: DataTypes.STRING(64),
          allowNull: false,
          defaultValue: "",
        },
        email: {
          type: DataTypes.STRING(64),
          allowNull: true,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(256),
          allowNull: true,
        },
        stato: {
          type: DataTypes.ENUM("attivo", "inattivo", "eliminato"),
          allowNull: false,
          defaultValue: "attivo",
        },
        note: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ultimaLogin: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        dataCreazione: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        ultimaModifica: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "Operatori",
        timestamps: false, // Gestiamo manualmente dataCreazione e ultimaModifica
        hooks: {
          beforeCreate: (operatore) => {
            operatore.dataCreazione = new Date();
            operatore.ultimaModifica = new Date();
          },
          beforeUpdate: (operatore) => {
            operatore.ultimaModifica = new Date();
          },
        },
      }
    );

    return Operatori;
  }
}

export default Operatori;
