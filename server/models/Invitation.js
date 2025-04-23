module.exports = (sequelize, DataTypes) => {
    const Invitation = sequelize.define("Invitation", {
        inviteId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        organizerId: DataTypes.INTEGER,
        receiverId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        sentAt: DataTypes.DATE
    }, { tableName: 'Invitation', timestamps: false });

    return Invitation;
};
