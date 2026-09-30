import { Activity, Building2, ClipboardList, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../templates/Header.jsx";
import "./Dashboard.css";

const roleWorkspaces = {
  manager: {
    label: "Manager",
    description: "Plan and coordinate activities across your organization.",
    actions: [
      {
        icon: Activity,
        title: "Create an activity",
        description: "Start an activity and set its schedule, priority, and team.",
        to: "/createActivity",
        label: "Create activity",
      },
    ],
  },
  hod: {
    label: "Head of Department",
    description: "Review assigned activities and keep department work moving.",
    actions: [
      {
        icon: ClipboardList,
        title: "Assigned activities",
        description: "Review activities assigned to your department.",
        to: "/assignedActivity",
        label: "View activities",
      },
      {
        icon: Activity,
        title: "Monitor task progress",
        description: "Track assigned work and review completed tasks.",
        to: "/monitorTask",
        label: "Monitor tasks",
      },
    ],
  },
  staff: {
    label: "Team member",
    description: "See your assigned work and keep your task status up to date.",
    actions: [
      {
        icon: ClipboardList,
        title: "My assigned tasks",
        description: "Review your tasks and update their progress.",
        to: "/assignedTask",
        label: "View assigned tasks",
      },
    ],
  },
};

function getWorkspace(user) {
  const role = user?.role?.toLowerCase();
  const title = user?.title?.toLowerCase();

  if (role === "admin") {
    return {
      label: "Administrator",
      description: "Oversee users, departments, and organization setup.",
      actions: [
        {
          icon: ShieldCheck,
          title: "Admin overview",
          description: "Review organization totals and administrative tools.",
          to: "/adminDashboard",
          label: "Open admin dashboard",
        },
      ],
    };
  }

  if (title === "manager" || title === "head_manager") {
    return roleWorkspaces.manager;
  }

  if (title === "hod") {
    return roleWorkspaces.hod;
  }

  return roleWorkspaces.staff;
}

export default function Dashboard() {
  const { user } = useAuth();
  const workspace = getWorkspace(user);

  return (
    <div className="workspace-page">
      <Header />
      <main className="workspace-dashboard">
        <section className="workspace-dashboard__welcome" aria-labelledby="workspace-title">
          <div>
            <p className="workspace-dashboard__eyebrow">{workspace.label} workspace</p>
            <h1 id="workspace-title">Welcome, {user?.f_name || "there"}.</h1>
            <p className="workspace-dashboard__intro">{workspace.description}</p>
          </div>
          <div className="workspace-dashboard__profile">
            <span className="workspace-dashboard__profile-mark">
              <Building2 size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>{user?.branch || "Your branch"}</strong>
              <span>{user?.department || user?.email || "Workspace account"}</span>
            </div>
          </div>
        </section>

        <section className="workspace-dashboard__section" aria-labelledby="workspace-actions-title">
          <div className="workspace-dashboard__section-heading">
            <p className="workspace-dashboard__eyebrow">Your workspace</p>
            <h2 id="workspace-actions-title">What would you like to do?</h2>
          </div>

          <div className="workspace-dashboard__actions">
            {workspace.actions.map((action) => {
              const Icon = action.icon;

              return (
                <article className="workspace-action" key={action.to}>
                  <span className="workspace-action__icon">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <Link to={action.to}>{action.label}<span aria-hidden="true"> →</span></Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
