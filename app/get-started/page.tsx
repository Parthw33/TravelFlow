"use client";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-300 dark:to-purple-400">
          Coming Soon
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          We&apos;re working hard to bring something awesome to you!
        </p>
      </div>
    </div>
  );
}
