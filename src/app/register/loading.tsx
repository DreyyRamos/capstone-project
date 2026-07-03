export default function RegisterLoading() {
  return (
    <div id="loading-flex-1" data-testId="loading-flex-1" className="min-h-screen flex items-center justify-center">
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex items-center space-x-2">
        <div id="loading-div-3" data-testId="loading-div-3" className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-muted-foreground">Loading registration...</span>
      </div>
    </div>
  );
}
