import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, CreditCard, BookOpen, Zap } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: FileText,
      label: "Create Note",
      description: "Start a new study note",
      variant: "default" as const,
    },
    {
      icon: CreditCard,
      label: "Generate Flashcards",
      description: "Create flashcards from notes",
      variant: "study" as const,
    },
    {
      icon: BookOpen,
      label: "New Subject",
      description: "Add a new subject area",
      variant: "outline" as const,
    },
    {
      icon: Zap,
      label: "Quick Study",
      description: "Start a study session",
      variant: "gradient" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
          >
            <action.icon className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium text-sm">{action.label}</div>
              <div className="text-xs opacity-80">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;