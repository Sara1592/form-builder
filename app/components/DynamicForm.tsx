
'use client';
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

type FormField = {
  label: string;
  type: "text" | "email" | "number" | "date";
  required: boolean;
};

type FormData = {
  [key: string]: string;
};

export default function DynamicForm() {
  const [schema, setSchema] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedSchema = localStorage.getItem("form_schema");
    if (savedSchema) {
      setSchema(JSON.parse(savedSchema));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...submissions];
      updated[editIndex] = formData;
      setSubmissions(updated);
      setEditIndex(null);
    } else {
      setSubmissions([...submissions, formData]);
    }
    setFormData({});
  };

  const handleEdit = (index: number) => {
    setFormData(submissions[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
    if (editIndex === index) {
      setFormData({});
      setEditIndex(null);
    }
  };

  if (!schema || schema.length === 0) {
    return (
    //   <div className="text-center p-10 text-lg">
    //     No form schema found. Please create one in <code>/admin/builder</code>
    //   </div>
    <div className="text-center p-10 text-[34px] font-semibold">
  No form schema found. Please create one in{" "}
  <Link href="/admin/builder">
    <code className="text-blue-600 underline hover:text-blue-800">/admin/builder</code>
  </Link>
</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Dynamic Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto ">
        {schema.map((field, index) => (
          <div key={index}>
            <label className="block font-semibold mb-1 text-[#4F4C4C] text-[18px] ">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            <input
              type={field.type}
              name={field.label}
              required={field.required}
              value={formData[field.label] || ""}
              onChange={handleChange}
              className="w-full border border-gray-600 px-3 py-2 rounded  text-[#4F4C4C] "
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#f8c418] text-[#172C67] font-semibold px-6 py-2 rounded hover:bg-[#172C67] hover:text-[#f8c418] cursor-pointer"
        >
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-3 text-center">Submitted Data</h3>
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left font-semibold">
                <tr>
                  <th className="px-4 py-2 text-[#4F4C4C] text-[18px]">#</th>
                  {schema.map((field, idx) => (
                    <th key={idx} className="px-4 py-2 text-[#4F4C4C] text-[18px]">
                      {field.label}
                    </th>
                  ))}
                  <th className="px-4 py-2 text-[#4F4C4C] text-[18px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((entry, index) => (
                  <tr key={index} className="border-t text-left text-[18px]">
                    <td className="px-4 py-2">{index + 1}</td>
                    {schema.map((field, i) => (
                      <td key={i} className="px-4 py-2">
                        {entry[field.label]}
                      </td>
                    ))}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-1 bg-green-100 hover:bg-green-200 rounded"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-green-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-1 bg-red-100 hover:bg-red-200 rounded"
                        title="Delete"
                      >
                        <XMarkIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
