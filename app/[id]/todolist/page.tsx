'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import Todo from '@/app/totoform/page';
import toast, { Toaster } from "react-hot-toast";

type Todo = {
  id: string;
  email: string;
  title: string;
  date: string;
  time: string;
  status: boolean; // Added status field
};

const fetchTodos = async (email: string | null) => {
  if (!email) return [];
  const { data } = await axios.get<Todo[]>('http://localhost:1000/todos');
  return data.filter(todo => todo.email === email);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:1000/todos/${id}`);
};

const updateTodoStatus = async ({ id, status }: { id: string; status: boolean }) => {
  await axios.patch(`http://localhost:1000/todos/${id}`, { status });
};

const TodoList = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail);
  }, []);

  const { data: todos, isLoading, isError, refetch } = useQuery({
    queryKey: ['todos', userEmail],
    queryFn: () => fetchTodos(userEmail),
    enabled: !!userEmail,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success('Task deleted successfully!',{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
    });
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete the task. Please try again.',{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateTodoStatus,
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      alert('Failed to update status. Please try again.');
    },
  });

  const handleDelete = (id: string) => {
   {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusToggle = (id: string, status: boolean) => {
    const newStatus: boolean = !status;
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <div className="text-center">Loading tasks...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load tasks.</div>;

  return (
    <div className="p-4 md:p-10 min-h-screen md:h-auto bg-white text-white">
      <Toaster />
      <div className="p-6 mt-5 rounded-lg shadow-xl w-full max-w-xxl text-center bg-gradient-to-br from-indigo-500 to-green-500">
        <h2 className="text-lg md:text-4xl font-bold text-center text-white mb-6 mt-2">
          My Tasks
        </h2>
        <h2 className="text-md md:text-md text-center text-gray-100">Email - {userEmail}</h2>
        <button
          className="mt-4 px-2 md:px-6 py-2 bg-white hover:bg-gray-200 text-indigo-500 rounded-md"
          onClick={() => setModalOpen(true)}
        >
          <AddIcon /> Add Task
        </button>
      </div>
      {todos && todos.length > 0 ? (
  <div className="overflow-x-auto mt-10 shadow-lg rounded-lg">
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-indigo-600 text-white">
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            #
          </th>
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            Title
          </th>
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            Date
          </th>
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            Time
          </th>
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            Status
          </th>
          <th className="px-4 py-2 text-left text-xs md:text-base font-semibold border-b border-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr
            key={todo.id}
            className={`${
              index % 2 === 0 ? 'bg-green-300' : 'bg-indigo-300'
            } hover:bg-white text-blue-700`}
          >
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              {index + 1}
            </td>
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              {todo.title}
            </td>
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              {todo.date}
            </td>
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              {todo.time}
            </td>
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              {todo.status ? (
                <CheckCircleIcon
                  className="cursor-pointer text-green-600"
                  onClick={() => handleStatusToggle(todo.id, todo.status)}
                />
              ) : (
                <HighlightOffIcon
                  className="cursor-pointer text-red-600"
                  onClick={() => handleStatusToggle(todo.id, todo.status)}
                />
              )}
            </td>
            <td className="px-4 py-2 text-xs md:text-base border-b border-gray-300">
              <DeleteIcon
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(todo.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-center text-gray-500 mt-10">No tasks found.</p>
)}

      {/* Add Task Modal */}
      {isModalOpen && (
        <Todo
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          userEmail={userEmail || ''}
        />
      )}
    </div>
  );
};

export default TodoList;