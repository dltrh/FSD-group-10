module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'User', timestamps: false });

    User.associate = models => {
        User.hasMany(models.Event, { foreignKey: 'organizerId' });
    };

    return User;
};
