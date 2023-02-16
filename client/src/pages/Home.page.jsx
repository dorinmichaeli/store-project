import {useApp} from '../providers/App.provider.jsx';

// Shows the user some basic information, such as their role and name.
export function HomePage() {
  const {user, role} = useApp();

  return (
    <div className="text-center">
      <h1 className="p-4">Home</h1>
      <p>Role: {role.role}</p>
      <p>
        You are logged in as
      </p>
      <h3 className="display-6">
        {user.displayName}
      </h3>
    </div>
  );
}
