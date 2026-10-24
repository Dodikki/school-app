export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

export interface Student {
  id: number;
  name: string;
  group: string;
  teacherId: number | null;
}

// Данные для создания: всё, кроме id (его выдаёт сервер)
export type NewTeacher = Omit<Teacher, 'id'>;
export type NewStudent = Omit<Student, 'id'>;