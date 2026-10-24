import { useState } from 'react';
import type { NewStudent, Student, Teacher } from '../types';

interface Props {
  teachers: Teacher[];
  students: Student[];
  onAdd: (student: NewStudent) => void;
  onAssign: (studentId: number, teacherId: number | null) => void;
  onDelete: (id: number) => void;
}

// value у <select> — всегда строка; '' означает «не назначен»
const toTeacherId = (value: string) => (value ? Number(value) : null);

export default function StudentPanel({ teachers, students, onAdd, onAssign, onDelete }: Props) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const visible = students.filter(
    (s) => s.name.toLowerCase().includes(query) || s.group.toLowerCase().includes(query),
  );

  const teacherOptions = teachers.map((t) => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ));

  return (
    <section className="panel">
      <h2>Студенты ({students.length})</h2>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !group.trim()) return;
          onAdd({ name, group, teacherId: toTeacherId(teacherId) });
          setName('');
          setGroup('');
          setTeacherId('');
        }}
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ФИО" />
        <input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Группа" />
        <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          <option value="">Без преподавателя</option>
          {teacherOptions}
        </select>
        <button type="submit">Добавить</button>
      </form>

      <input
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по ФИО или группе"
      />

      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Группа</th>
            <th>Преподаватель</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.group}</td>
              <td>
                <select
                  value={s.teacherId ?? ''}
                  onChange={(e) => onAssign(s.id, toTeacherId(e.target.value))}
                >
                  <option value="">— не назначен —</option>
                  {teacherOptions}
                </select>
              </td>
              <td>
                <button className="danger" onClick={() => onDelete(s.id)}>
                  ✕
                </button>
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td colSpan={4} className="muted">
                Никого не найдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}