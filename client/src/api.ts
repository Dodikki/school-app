import type { NewStudent, NewTeacher, Student, Teacher } from './types';

// Общая функция запроса: добавляет /api, JSON-заголовок и обработку ошибок
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch('/api' + url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Ошибка ${res.status}`);
  }
  if (res.status === 204) return undefined as T; // у DELETE нет тела ответа
  return res.json();
}

export const api = {
  getTeachers: () => request<Teacher[]>('/teachers'),
  addTeacher: (teacher: NewTeacher) =>
    request<Teacher>('/teachers', { method: 'POST', body: JSON.stringify(teacher) }),
  deleteTeacher: (id: number) => request<void>(`/teachers/${id}`, { method: 'DELETE' }),

  getStudents: () => request<Student[]>('/students'),
  addStudent: (student: NewStudent) =>
    request<Student>('/students', { method: 'POST', body: JSON.stringify(student) }),
  updateStudent: (id: number, changes: Partial<NewStudent>) =>
    request<Student>(`/students/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  deleteStudent: (id: number) => request<void>(`/students/${id}`, { method: 'DELETE' }),
};