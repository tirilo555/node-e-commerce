import { ormConfigDefault } from '../config/ormconfig';
import { DataSource } from 'typeorm';

export default new DataSource(ormConfigDefault);
