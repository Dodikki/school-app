import type { Student, Teacher } from './types';

export const teachers: Teacher[] = [
  { id: 1, name: 'Анна Петрова', subject: 'JavaScript' },
  { id: 2, name: 'Игорь Смирнов', subject: 'Базы данных' },
];

export const students: Student[] = [
  { id: 3, name: 'Мария Кузнецова', group: 'ИТ-21', teacherId: 1 },
  { id: 4, name: 'Дмитрий Орлов', group: 'ИТ-21', teacherId: 2 },
  { id: 5, name: 'Елена Соколова', group: 'ИТ-22', teacherId: null },
];

let lastId = 5;
export const nextId = (): number => ++lastId;