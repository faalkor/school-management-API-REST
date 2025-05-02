import bcrypt from 'bcryptjs';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'John Doe',
        email: 'jhon@email.com',
        tipo: 'aluno',
        password_hash: await bcrypt.hash('123465', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Mary Hill',
        email: 'mary@email.com',
        tipo: 'aluno',
        password_hash: await bcrypt.hash('123465', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Carl Dann',
        email: 'carl@email.com',
        tipo: 'admin',
        password_hash: await bcrypt.hash('123465', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}
