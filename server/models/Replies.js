module.exports = (sequelize, DataTypes) => {
    const Replies = sequelize.define("Replies", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        questionId: DataTypes.INTEGER,
        repContent: DataTypes.TEXT,
        createdAt: DataTypes.DATE
    }, { tableName: 'Replies', timestamps: false });

    return Replies;
};
