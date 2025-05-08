"use client";

const CreateCampDialog = ({ open, onOpenChange, onCreateCamp }) => {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCamp = {
      title: e.target.campName.value,
      location: e.target.location.value,
      description: e.target.description.value,
    };
    onCreateCamp(newCamp);
    onOpenChange(false); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Create New Camps</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Camp Name</label>
            <input
              name="campName"
              type="text"
              placeholder="Camp name"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              name="location"
              type="text"
              placeholder="Location"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              rows={4}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="pt-4 space-y-2">
            <button type="submit" className="w-full py-3 bg-[#4F7CFF] text-white rounded-md hover:bg-[#3A66E5]">
              Create
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateCampDialog };
