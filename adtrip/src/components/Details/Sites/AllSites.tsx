import React, { useEffect, useState } from "react";
import { fetchSites, SiteData } from "../../../api/Sites"; // Adjust the import path
import { fetchDepartments, DepartmentData } from "../../../api/Departements"; // Adjust the import path
import ViewCard from "./viewCard"; // Import the new ViewCard component
import NavBar from "../../../components/NavBar/NavBar"; // Import the NavBar component

const ViewAllSites: React.FC = () => {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sites and departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all sites
        const sitesResponse = await fetchSites();
        if (sitesResponse.error) {
          throw new Error(sitesResponse.error);
        }
        setSites(sitesResponse.data || []);

        // Fetch all departments
        const departmentsResponse = await fetchDepartments();
        if (departmentsResponse.error) {
          throw new Error(departmentsResponse.error);
        }
        setDepartments(departmentsResponse.data || []);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group sites by department
  const groupSitesByDepartment = () => {
    const groupedSites: { [key: string]: SiteData[] } = {};

    sites.forEach((site) => {
      const departmentName = site.department?.name || "Uncategorized";
      if (!groupedSites[departmentName]) {
        groupedSites[departmentName] = [];
      }
      groupedSites[departmentName].push(site);
    });

    return groupedSites;
  };

  const groupedSites = groupSitesByDepartment();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative w-full h-auto bg-slate-100">
      {/* NavBar */}
      <NavBar />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">All Sites by Department</h1>

        {Object.entries(groupedSites).map(([departmentName, sites]) => (
          <div key={departmentName} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{departmentName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <ViewCard
                  key={site.id}
                  id={site.id}
                  name={site.name}
                  imageUrl={site.image}
                  description={site.description}
                  ticketPrice={site.ticket_price}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllSites;