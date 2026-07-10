import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-gray-800">
            Notice Board
          </h1>

          <Link href="/add">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Notice
            </button>
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col gap-3"
            >
              {notice.image && (
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold">
                  {notice.title}
                </h2>

                {notice.priority === "Urgent" && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Urgent
                  </span>
                )}

              </div>

              <p>{notice.body}</p>

              <div className="mt-2">
                <span className="font-medium">
                  Category:
                </span>{" "}
                {notice.category}
              </div>

              <div>
                <span className="font-medium">
                  Priority:
                </span>{" "}
                {notice.priority}
              </div>

              <div>
                <span className="font-medium">
                  Publish Date:
                </span>{" "}
                {new Date(notice.publishDate).toLocaleDateString()}
              </div>
              <div className="mt-4 flex gap-3">

                <Link href={`/edit/${notice.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}