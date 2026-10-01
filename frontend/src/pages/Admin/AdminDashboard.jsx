import { useEffect, useState } from "react";
import { Building2, Network, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Header from "../../templates/Header.jsx";
import Footer from "../../templates/Footer.jsx";
import "./AdminDashboard.css";

const initialMetrics = {
  users: null,
  branches: null,
  departments: null,
};

const adminActions = [
  {
    icon: UsersRound,
    title: "Manage users",
    description: "Review accounts and update team member information.",
    to: "/userManagement",
    label: "Open user management",
  },
  {
    icon: Network,
    title: "Create a department",
    description: "Add a department, assign its branch and head of the department.",
    to: "/createDepartment",
    label: "Create department",
  },
];

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [loading, setLoading] = useState(true);
  const [hasPartialData, setHasPartialData] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadOverview = async () => {
      const results = await Promise.allSettled([
        api.get("/api/getUsers"),
        api.get("/api/branches"),
        api.get("/api/departments"),
      ]);

      if (!isActive) return;

      const [users, branches, departments] = results;
      setMetrics({
        users: users.status === "fulfilled" && Array.isArray(users.value.data)
          ? users.value.data.length
          : null,
        branches: branches.status === "fulfilled" && Array.isArray(branches.value.data)
          ? branches.value.data.length
          : null,
        departments: departments.status === "fulfilled" && Array.isArray(departments.value.data)
          ? departments.value.data.length
          : null,
      });
      setHasPartialData(results.some((result) => result.status === "rejected"));
      setLoading(false);
    };

    loadOverview();

    return () => {
      isActive = false;
    };
  }, []);

  const metricsList = [
    { label: "Staff members", value: metrics.users, icon: UsersRound },
    { label: "Branches", value: metrics.branches, icon: Building2 },
    { label: "Departments", value: metrics.departments, icon: Network },
  ];

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard">
        <section className="admin-dashboard__intro" aria-labelledby="admin-dashboard-title">
          <div>
            <h1 id="admin-dashboard-title">Organization overview</h1>
            <p className="admin-dashboard__summary">
              A clear view of your people and organization, with essential
              administration tools close at hand.
            </p>
          </div>
          <Link className="admin-dashboard__workspace-link" to="/dashboard">
            Personal workspace <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="admin-dashboard__metrics" aria-label="Organization totals">
          {metricsList.map((metric) => {
            const Icon = metric.icon;

            return (
              <article className="admin-metric" key={metric.label}>
                <span className="admin-metric__icon">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <p>{metric.label}</p>
                  <strong aria-live="polite">
                    {loading ? "..." : metric.value ?? "—"}
                  </strong>
                </div>
              </article>
            );
          })}
        </section> 

        {hasPartialData && (
          <p className="admin-dashboard__notice" role="status">
            Some organization totals could not be loaded. You can still use the
            administration tools below.
          </p>
        )}

        <section className="admin-dashboard__tools" aria-labelledby="admin-tools-title">
          <div className="admin-dashboard__section-heading">
            <h2 id="admin-tools-title">Administration actions</h2>
          </div>

          <div className="admin-dashboard__actions">
            {adminActions.map((action) => {
              const Icon = action.icon;

              return (
                <article className="admin-action" key={action.to}>
                  <span className="admin-action__icon">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3>{action.title}</h3>
                  <p className="admin-action__description">{action.description}</p>
                  <Link to={action.to}>{action.label}<span aria-hidden="true"> →</span></Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}