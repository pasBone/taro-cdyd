import { Todo } from 'MyModels';

export function loadSnapshot(todos): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (todos.length == 8) {
        reject('哈哈报错了');
      } else {
        resolve(todos);
      }
    }, 1000);
  });
}

export function saveSnapshot(data: Todo[]): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

export function switchTodo(data: Todo & { index: number }): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log(data, 'api');
      resolve(data);
    }, 2000)
  })
}