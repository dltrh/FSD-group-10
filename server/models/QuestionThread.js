module.exports = (sequelize, DataTypes) => {
    const QuestionThread = sequelize.define("QuestionThread", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        discussId: DataTypes.INTEGER,
        questionContent: DataTypes.TEXT
    }, { tableName: 'QuestionThread', timestamps: false });

    return QuestionThread;
};
