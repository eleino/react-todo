export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  category: string;
  dueAt?: string;
  completedAt?: string;
}