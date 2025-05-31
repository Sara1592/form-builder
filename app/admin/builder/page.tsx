
// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation"; 

// export default function FormBuilderPage() {
//   const [fields, setFields] = useState<any[]>([]);
//   const [field, setField] = useState({ label: "", type: "text", required: false });
//   const router = useRouter();

//   const addField = () => {
//     if (!field.label) return alert("Label is required");
//     setFields([...fields, field]);
//     setField({ label: "", type: "text", required: false });
//   };

//   const saveSchema = () => {
//     localStorage.setItem("form_schema", JSON.stringify(fields));
//     alert("Form schema saved!");
//   };

//    const goToDynamicForm = () => {
//     router.push("/"); 
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Form Builder</h2>

//       <div className="space-y-3 mb-6">
//         <input
//           type="text"
//           placeholder="Field Label"
//           className="border px-4 py-2 w-full rounded"
//           value={field.label}
//           onChange={(e) => setField({ ...field, label: e.target.value })}
//         />

//         <select
//           className="border px-4 py-2 w-full rounded"
//           value={field.type}
//           onChange={(e) => setField({ ...field, type: e.target.value })}
//         >
//           <option value="text">Text</option>
//           <option value="email">Email</option>
//           <option value="number">Number</option>
//           <option value="date">Date</option>
//         </select>

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={field.required}
//             onChange={(e) => setField({ ...field, required: e.target.checked })}
//           />
//           <span>Required</span>
//         </label>

//         <button
//           onClick={addField}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Field
//         </button>
//       </div>

//       {fields.length > 0 && (
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-2">Current Fields:</h3>
//           <ul className="space-y-1">
//             {fields.map((f, i) => (
//               <li key={i} className="border p-2 rounded">
//                 {f.label} ({f.type}) {f.required && "*"}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
// {/* 
//       <button
//         onClick={saveSchema}
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         Save Form Schema
//       </button> */}
//        <div className="flex gap-4">
//         <button
//           onClick={saveSchema}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Save Form Schema
//         </button>
//         <button
//           onClick={goToDynamicForm}
//           className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//         >
//           Go to Form
//         </button>
//       </div>
//     </div>
//   );
// }

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

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Field Label"
          className="border px-4 py-2 w-full rounded"
          value={field.label}
          onChange={(e) => setField({ ...field, label: e.target.value })}
        />

        <select
          className="border px-4 py-2 w-full rounded"
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
          <span>Required</span>
        </label>

        <button
          onClick={addField}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Field
        </button>
      </div>

      {fields.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Current Fields:</h3>
          <ul className="space-y-1">
            {fields.map((f, i) => (
              <li key={i} className="border p-2 rounded">
                {f.label} ({f.type}) {f.required && "*"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={saveSchema}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Form Schema
        </button>
        <button
          onClick={goToDynamicForm}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Go to Form
        </button>
      </div>
    </div>
  );
}
