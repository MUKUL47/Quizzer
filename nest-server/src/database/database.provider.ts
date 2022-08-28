import { DataSource } from 'typeorm';
import { entities } from './entities';
const DATA_SOURCE = 'DATA_SOURCE';
export default [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'quizzer',
        entities, // [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
export { DATA_SOURCE };
