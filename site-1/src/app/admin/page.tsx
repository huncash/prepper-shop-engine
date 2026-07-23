export default function AdminDashboardPage() {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
        Irányítópult
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Ügyvezetői adminisztráció
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Bejelentkezés sikeres. A partner / ügyfél fiókok (`/partner/*`) külön
        cookie-t használnak, és ide nem léphetnek be.
      </p>
    </div>
  );
}
