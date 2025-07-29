export default function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-muted-foreground">Loading registration...</span>
      </div>
    </div>
  );
}
