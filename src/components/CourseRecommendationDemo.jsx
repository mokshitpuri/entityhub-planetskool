import React from 'react';
import Icon from './AppIcon';
import Button from './ui/Button';

const CourseRecommendationDemo = () => {
  const featuredCourse = {
    id: 'course_demo',
    title: 'React Complete Developer Course',
    instructor: 'John Mitchell',
    duration: '42 hours',
    level: 'Intermediate',
    rating: 4.8,
    enrollments: 85400,
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
    matchReason: 'Based on your interest in Web Development',
    isVerified: true
  };

  return (
    <div className="bg-card rounded-lg border p-6 max-w-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          🎓 Course Recommendation Feature
        </h3>
        <p className="text-sm text-muted-foreground">
          Personalized course suggestions based on your interests and entity memberships
        </p>
      </div>

      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-3">
          <img 
            src={featuredCourse.image} 
            alt={featuredCourse.title}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-foreground text-sm">{featuredCourse.title}</h4>
              {featuredCourse.isVerified && (
                <Icon name="CheckCircle" size={12} className="text-blue-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">by {featuredCourse.instructor}</p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-2">
              <span>{featuredCourse.duration}</span>
              <span>•</span>
              <span>{featuredCourse.level}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={10} className="text-yellow-500" />
                <span>{featuredCourse.rating}</span>
              </div>
            </div>
            <div className="mb-2">
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {featuredCourse.matchReason}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">${featuredCourse.price}</span>
              <Button variant="default" size="sm">
                Enroll
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-foreground text-sm">✨ Key Features:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Smart recommendations based on entity memberships</li>
          <li>• Progress tracking for enrolled courses</li>
          <li>• Skill-based filtering and matching</li>
          <li>• Integration with community interests</li>
          <li>• Certificate and achievement system</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseRecommendationDemo;
