import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddFieldToTasks1604340155365
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tasks',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'TaskUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tasks', 'TaskUser');

    await queryRunner.dropColumn('tasks', 'user_id');
  }
}
