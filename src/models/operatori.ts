import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";

export interface OperatoriAttributes {
  idOperatore: number;
  uuid: string;
  operatore: string;
  email: string | null;
  password: string | null;
  stato: "attivo" | "inattivo" | "eliminato";
  profilo: "root" | "admin" | "operator" | "guest";
  livello: number;
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
  public uuid!: string;
  public operatore!: string;
  public email!: string | null;
  public password!: string | null;
  public stato!: "attivo" | "inattivo" | "eliminato";
  public profilo!: "root" | "admin" | "operator" | "guest";
  public livello!: number;
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
        uuid: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          unique: true,
        },
        operatore: {
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
        profilo: {
          type: DataTypes.ENUM("root", "admin", "operator", "guest"),
          allowNull: false,
          defaultValue: "operator",
        },
        livello: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 8,
          validate: {
            min: 8,
            max: 64,
          },
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
