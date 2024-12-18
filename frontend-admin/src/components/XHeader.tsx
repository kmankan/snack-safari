import Link from "next/link";
import React from "react";

const XHeader = ({ title }: { title: string }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-500">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default XHeader;
