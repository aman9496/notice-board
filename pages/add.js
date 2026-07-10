import { useState } from "react";
import { useRouter } from "next/router";

export default function AddNotice() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        body: "",
        category: "",
        priority: "",
        publishDate: "",
        image: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("/api/notices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        router.push("/");
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Add Notice</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="body"
                    placeholder="Body"
                    value={form.body}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Exam">Exam</option>
                    <option value="Event">Event</option>
                    <option value="General">General</option>
                </select>

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="">Select Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                </select>

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (Optional)"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="date"
                    name="publishDate"
                    value={form.publishDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    Save Notice
                </button>

            </form>
        </div>
    );
}