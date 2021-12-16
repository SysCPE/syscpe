import { Model, Sequelize, DataTypes } from "sequelize";
import AdminMember from "./AdminMember";
import WorkGroup from "./WorkGroup";

interface AdminWorkGroupAttributes {
    workGroupId: number;
    adminMemberId: number;   
}

interface AdminWorkGroupCreationAttributes extends AdminWorkGroupAttributes {}

class AdminWorkGroup
    extends Model<AdminWorkGroupAttributes, AdminWorkGroupCreationAttributes>
    implements AdminWorkGroupAttributes
{
    workGroupId!: number;
    adminMemberId!: number;
    
    static initialize(sequelize: Sequelize) {
        this.init({
            workGroupId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: WorkGroup,
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            adminMemberId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: AdminMember,
                    key: 'memberId',
                },
                onDelete: 'CASCADE',
            },
        },
        {
            sequelize,
            timestamps: false,
        });
    }
}

export default AdminWorkGroup;