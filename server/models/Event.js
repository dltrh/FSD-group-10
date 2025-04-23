module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        eventId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        organizerId: { type: DataTypes.INTEGER },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        timeStart: DataTypes.DATE,
        timeEnd: DataTypes.DATE,
        eventType: DataTypes.STRING,
        eventTheme: DataTypes.STRING,
        budget: DataTypes.DECIMAL(10, 2),
        location: DataTypes.STRING,
        maxPpl: DataTypes.INTEGER,
        attendeesList: DataTypes.TEXT,
        canBring: DataTypes.BOOLEAN,
        gifts: DataTypes.TEXT
    }, { tableName: 'Event', timestamps: false });

    Event.associate = models => {
        Event.belongsTo(models.User, { foreignKey: 'organizerId' });
    };

    return Event;
};
