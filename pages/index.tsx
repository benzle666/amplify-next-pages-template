import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Model";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  const { user, signOut } = useAuthenticator();

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main className="bg-pink-500">
      <h1>{user?.signInDetails?.loginId} todos</h1>
      <ul>
        <li>
          <Button asChild>
            <Link href="/practice">Practice</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </li>
        <li>
          <Button asChild>
            <Link href="/setting">Setting</Link>
          </Button>
        </li>
      </ul>
      <h1>My todos</h1>
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
          >{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
          Review next steps of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
