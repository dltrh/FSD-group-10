module.exports = (sequelize, DataTypes) => {
    const AttendList = sequelize.define("AttendList", {
        userId: { type: DataTypes.INTEGER, primaryKey: true },
        eventId: { type: DataTypes.INTEGER, primaryKey: true }
    }, { tableName: 'AttendList', timestamps: false });

    return AttendList;
};
