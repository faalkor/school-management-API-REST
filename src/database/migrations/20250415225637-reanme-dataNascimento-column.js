/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.renameColumn('alunos', 'dataNascimento', 'data_nascimento');
  },

  async down(queryInterface) {
    return queryInterface.renameColumn('alunos', 'data_nascimento', 'dataNascimento');
  },
};
