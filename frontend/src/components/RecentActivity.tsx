import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: 'note' | 'flashcard' | 'study';
  title: string;
  subject: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'note',
    title: 'Binary Search Trees',
    subject: 'Data Structures',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'study',
    title: 'Algorithm Complexity',
    subject: 'Algorithms',
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    type: 'flashcard',
    title: 'SQL Joins',
    subject: 'Database Systems',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    type: 'note',
    title: 'React Hooks',
    subject: 'Web Development',
    timestamp: '2 days ago'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'note':
      return <FileText className="h-4 w-4" />;
    case 'flashcard':
      return <CreditCard className="h-4 w-4" />;
    case 'study':
      return <Clock className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'note':
      return 'bg-primary/10 text-primary';
    case 'flashcard':
      return 'bg-study/10 text-study';
    case 'study':
      return 'bg-success/10 text-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {activity.subject}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;