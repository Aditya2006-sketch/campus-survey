import { useAuth } from "@/hooks/use-auth";
import { useIssues } from "@/hooks/use-issues";
import { IssueCard } from "@/components/ui/issue-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Plus, Loader2, CheckCircle2, AlertTriangle, LayoutList } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: issues, isLoading } = useIssues();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate stats
  const totalIssues = issues?.length || 0;
  const pendingIssues = issues?.filter(i => i.status === "Pending").length || 0;
  const solvedIssues = issues?.filter(i => i.status === "Solved").length || 0;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.fullName}. Here's what's happening on campus.
          </p>
        </div>
        <Link href="/report-issue">
          <Button size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40">
            <Plus className="mr-2 h-5 w-5" />
            Report New Issue
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-2xl border shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <LayoutList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
              <h3 className="text-2xl font-bold">{totalIssues}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-2xl border shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Issues</p>
              <h3 className="text-2xl font-bold">{pendingIssues}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card p-6 rounded-2xl border shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Solved Issues</p>
              <h3 className="text-2xl font-bold">{solvedIssues}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Issues Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display">Recent Reports</h2>
        
        {issues?.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
            <p className="text-muted-foreground">No issues reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues?.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
