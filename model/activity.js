module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activities", {
    tanggal: {
      type: Sequelize.DATEONLY,
    },
    jenis_kegiatan: {
      type: Sequelize.STRING,
    },
    durasi: {
      type: Sequelize.INTEGER,
    },
    keterangan: {
      type: Sequelize.STRING,
    },
    berat_badan: {
      type: Sequelize.INTEGER,
    },
  });
  return Activity;
};
