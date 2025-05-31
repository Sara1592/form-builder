export default function FieldBuilder({ field, updateField }: any) {
  return (
    <div className="border p-4 rounded mb-3 bg-white shadow">
      <input
        value={field.label}
        onChange={(e) => updateField({ ...field, label: e.target.value })}
        placeholder="Label"
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        value={field.type}
        onChange={(e) => updateField({ ...field, type: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => updateField({ ...field, required: e.target.checked })}
        /> Required
      </label>
    </div>
  );
}


