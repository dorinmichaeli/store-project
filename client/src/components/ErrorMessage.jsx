// Shows the user a basic error message when something goes wrong.
export function ErrorMessage({error}) {
  return (
    <div className="text-danger text-bg-warning p-3 text-center">
      <div className="fw-bold">ERROR</div>
      <div>{error.message}</div>
    </div>
  );
}
