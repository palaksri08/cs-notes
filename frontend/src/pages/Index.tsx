import { useEffect, useState } from "react";
import { FileText, CreditCard, BookOpen, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import SubjectCard from "@/components/SubjectCard";
import RecentActivity from "@/components/RecentActivity";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notes`);
        const data = await res.json();
        setSubjects(data); // adapt this based on your backend response structure
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back to CS Notes
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey with personalized study materials
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Notes"
            value={subjects.reduce((sum, s) => sum + (s.noteCount || 0), 0)}
            description="Across all subjects"
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Flashcards"
            value={subjects.reduce((sum, s) => sum + (s.flashcardCount || 0), 0)}
            description="Ready for study"
            icon={CreditCard}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Subjects"
            value={subjects.length}
            description="Active learning paths"
            icon={BookOpen}
          />
          <StatsCard
            title="Study Streak"
            value="7 days"
            description="Keep it up!"
            icon={TrendingUp}
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard key={subject._id || subject.id} subject={subject} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
