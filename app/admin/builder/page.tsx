
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; 

type FormField = {
  label: string;
  type: "text" | "email" | "number" | "date";
  required: boolean;
};

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [field, setField] = useState<FormField>({ label: "", type: "text", required: false });
  const router = useRouter();

  const addField = () => {
    if (!field.label) return alert("Label is required");
    setFields([...fields, field]);
    setField({ label: "", type: "text", required: false });
  };

  const saveSchema = () => {
    localStorage.setItem("form_schema", JSON.stringify(fields));
    alert("Form schema saved!");
  };

  const goToDynamicForm = () => {
    router.push("/"); 
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Form Builder</h2>

      <div className="space-y-3 mb-6 bg-[#fdf4f4] rounded-2xl px-5 py-7">
        <input
          type="text"
          placeholder="Field Label"
          className="border px-4 py-2 w-full rounded block font-semibold text-[18px] mb-4 text-[#4F4C4C]"
          value={field.label}
          onChange={(e) => setField({ ...field, label: e.target.value })}
        />

        <select
          className="border px-4 py-2 w-full rounded block font-semibold text-[18px] mb-4 text-[#4F4C4C]"
          value={field.type}
          onChange={(e) => setField({ ...field, type: e.target.value as FormField["type"] })}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => setField({ ...field, required: e.target.checked })}
          />
          <span className="text-[18px] text-[#4F4C4C]">Required</span>
        </label>

        <button
          onClick={addField}
          className="bg-[#0e2766] text-amber-50 hover:bg-[#f8c418]   hover:text-[#0e2766] text-[18px] font-bold py-2 px-6 rounded-md mb-6 cursor-pointer"
        >
          Add Field
        </button>
      </div>

      {fields.length > 0 && (
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-4 text-center">Current Fields</h3>
          <ul className="space-y-1">
            {fields.map((f, i) => (
              <li key={i} className="border p-2 mb-5 rounded">
                {f.label} ({f.type}) {f.required && "*"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={saveSchema}
          className="bg-[#f8c418] font-semibold text-[20px] text-[#0e2766] px-4 py-2 rounded-[10px] hover:bg-white hover:text-[#0e2766] cursor-pointer"
        >
          Save Form Schema
        </button>
        <button
          onClick={goToDynamicForm}
        //   className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                  className="bg-[#f8c418] font-semibold text-[20px] text-[#0e2766] px-4 py-2 rounded-[10px] hover:bg-white hover:text-[#0e2766] cursor-pointer"

        >
          User Form
        </button>
      </div>
    </div>
  );
}
