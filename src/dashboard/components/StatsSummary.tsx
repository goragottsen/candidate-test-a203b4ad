export const StatsSummary = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-3">Open Contracts</h3>
        <div className="text-2xl font-semibold">3</div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-3">Pending Invoices</h3>
        <div className="text-2xl font-semibold">2</div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-3">Job Matches</h3>
        <div className="text-2xl font-semibold">12</div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-3">Available Balance</h3>
        <div className="text-2xl font-semibold">$4,250</div>
      </div>
    </div>
  );
};
