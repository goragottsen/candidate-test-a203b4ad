export const RecentJobs = ({ className = "" }: { className?: string }) => {
  const recentJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      rate: "$75/hr",
      postedDate: "2 days ago",
      match: "95%",
    },
    {
      id: 2,
      title: "Frontend Engineer",
      company: "DesignStudio",
      rate: "$65/hr",
      postedDate: "3 days ago",
      match: "87%",
    },
    {
      id: 3,
      title: "UI/UX Developer",
      company: "CreativeAgency",
      rate: "$70/hr",
      postedDate: "1 week ago",
      match: "82%",
    },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">
        Recent Job Matches
      </h3>
      <div className="py-2">
        <ul className="list-none">
          {recentJobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between py-4 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <h4 className="text-base font-medium mb-2">{job.title}</h4>
                <p className="text-gray-500 text-sm mb-2">{job.company}</p>
                <p className="flex text-sm">
                  <span className="text-green-600 font-medium mr-4">
                    {job.rate}
                  </span>
                  <span className="text-gray-500">{job.postedDate}</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500 mb-1">Match</span>
                <span className="text-sm font-semibold text-blue-600">
                  {job.match}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none py-3 rounded mt-4 text-sm cursor-pointer transition-colors">
          View All Jobs
        </button>
      </div>
    </div>
  );
};
