module.exports = (sequelize, DataTypes) => {
    const OrganizeList = sequelize.define("OrganizeList", {
        userId: { type: DataTypes.INTEGER, primaryKey: true },
        eventId: { type: DataTypes.INTEGER, primaryKey: true },
        role: DataTypes.STRING
    }, { tableName: 'OrganizeList', timestamps: false });

    return OrganizeList;
};
