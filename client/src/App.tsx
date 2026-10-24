import { useEffect, useState } from 'react';
import { api } from './api';
import TeacherPanel from './components/TeacherPanel';
import type { Student, Teacher } from './types';
import './App.css';
import StudentPanel from './components/StudentPanel';

export default function App() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');

  // Загружаем оба списка параллельно
  async function loadAll() {
    try {
      const [t, s] = await Promise.all([api.getTeachers(), api.getStudents()]);
      setTeachers(t);
      setStudents(s);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Выполнить действие на сервере, затем обновить данные
  async function run(action: () => Promise<unknown>) {
    try {
      await action();
      await loadAll();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <main className="app">
      <h1>Учебный центр</h1>
      {error && <p className="error">{error}</p>}

      <div className="grid">
        <TeacherPanel
          teachers={teachers}
          students={students}
          onAdd={(teacher) => run(() => api.addTeacher(teacher))}
          onDelete={(id) => run(() => api.deleteTeacher(id))}
        />
        <StudentPanel
        teachers={teachers}
         students={students}
         onAdd={(student) => run(() => api.addStudent(student))}
         onAssign={(id, teacherId) => run(() => api.updateStudent(id, { teacherId }))}
         onDelete={(id) => run(() => api.deleteStudent(id))}
        />

      </div>
    </main>
  );
}