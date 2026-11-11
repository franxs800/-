import { lesson1 } from './lesson1'
import { lesson2 } from './lesson2'
import { lesson3 } from './lesson3'
import { lesson4 } from './lesson4'
import { lesson5 } from './lesson5'
import { lesson6 } from './lesson6'
import { lesson7 } from './lesson7'
import { lesson8 } from './lesson8'

export const MODULES = [
  {
    id: 1,
    title: 'Модуль 1: Арифметика и числа с нуля',
    description: 'Натуральные числа, порядок действий, отрицательные числа, дроби и проценты.',
    badge: 'С нуля',
    color: '#4f46e5',
    lessonIds: [1, 2, 3, 4]
  },
  {
    id: 2,
    title: 'Модуль 2: Алгебра и уравнения',
    description: 'Степени, корни, формулы сокращенного умножения (ФСУ), линейные и квадратные уравнения.',
    badge: 'Алгебра',
    color: '#0891b2',
    lessonIds: [5, 6]
  },
  {
    id: 3,
    title: 'Модуль 3: Геометрия и планиметрия',
    description: 'Углы, треугольники, теорема Пифагора, свойства прямоугольных фигур и площади.',
    badge: 'Геометрия',
    color: '#059669',
    lessonIds: [7]
  },
  {
    id: 4,
    title: 'Модуль 4: Тригонометрия и функции',
    description: 'Синус, косинус, тангенс, единичный круг, радианы и ключевые тригонометрические формулы.',
    badge: 'Тригонометрия',
    color: '#d97706',
    lessonIds: [8]
  }
]

export const ALL_LESSONS = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8
]

export const getLessonById = (id) => {
  return ALL_LESSONS.find(l => l.id === Number(id)) || ALL_LESSONS[0]
}
