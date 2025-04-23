module.exports = (sequelize, DataTypes) => {
    const Discussion = sequelize.define("Discussion", {
        discussId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        createdAt: DataTypes.DATE
    }, { tableName: 'Discussion', timestamps: false });

    return Discussion;
};
