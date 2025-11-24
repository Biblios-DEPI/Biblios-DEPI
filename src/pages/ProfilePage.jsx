import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const ProfilePage = () => {
  const { user, readBooks } = useAuth();
  const [books, setBooks] = useState([]);

  // Load all books
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to load books:", err));
  }, []);

  // Filter only read books
  const readBooksList = books.filter((book) =>
    readBooks.some((rb) => rb.bookId === book.id.toString())
  );

  if (!user) {
    return (
      <p className="p-4 text-center text-red-500">
        You must be logged in to view your profile.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="mb-8 border-b pb-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Books Read:</strong> {readBooksList.length}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Read Books</h2>
      {readBooksList.length === 0 ? (
        <p className="text-gray-600">
          You haven't marked any books as read yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readBooksList.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p className="text-sm">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
