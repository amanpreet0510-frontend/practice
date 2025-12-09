import React from 'react';

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    date: "July 10, 2025",
    author: "John Doe",
    excerpt: "React Hooks simplify state management and lifecycle methods in functional components...",
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    date: "July 5, 2025",
    author: "Jane Smith",
    excerpt: "Next.js is a powerful framework built on top of React for server-side rendering and more...",
  },
  {
    id: 3,
    title: "Styling in React with Tailwind CSS",
    date: "July 1, 2025",
    author: "Alex Johnson",
    excerpt: "Tailwind CSS provides utility-first classes that make styling fast and efficient in React...",
  },
];

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {post.date} &bull; {post.author}
          </p>
          <p className="mt-2 text-gray-700">{post.excerpt}</p>
          <button className="mt-3 text-blue-600 hover:underline">
            Read more →
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
