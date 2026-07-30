import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useState, useEffect, useRef } from 'react';
import { BootSequence } from '@/components/BootSequence';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import BlogDetail from '@/pages/BlogDetail';
import { useTrackEvent } from '@workspace/api-client-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function PageTracker() {
  const [location] = useLocation();
  const trackEvent = useTrackEvent();
  const prevLocation = useRef(location);

  useEffect(() => {
    if (location !== prevLocation.current) {
      trackEvent.mutate({
        data: {
          event: "page_view",
          page: location,
          metadata: { timestamp: new Date().toISOString() }
        }
      });
      prevLocation.current = location;
    }
  }, [location, trackEvent]);

  return null;
}

function AppRouter() {
  return (
    <div className="min-h-[100dvh] flex flex-col relative w-full overflow-hidden bg-particles">
      <Navbar />
      <PageTracker />
      <main className="flex-1 w-full relative z-10 pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!booted ? (
          <BootSequence onComplete={() => setBooted(true)} />
        ) : (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRouter />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;