import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoleAdaptiveHeader from '../../components/ui/RoleAdaptiveHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import EntityBanner from './components/EntityBanner';
import EntityAbout from './components/EntityAbout';
import ContentSection from './components/ContentSection';
import MembershipSidebar from './components/MembershipSidebar';
import ImageGallery from './components/ImageGallery';
import LocationMap from './components/LocationMap';
import MobileJoinButton from './components/MobileJoinButton';
import Icon from '../../components/AppIcon';

const EntityDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('entityhub_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  // Mock entity data - in real app, this would be fetched based on ID
  const entityId = searchParams?.get('id') || '1';
  
  // Comprehensive entity data for each entity
  const entityDatabase = {
    '1': {
      id: '1',
      name: "Harvard University",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200",
      bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
      category: "Education",
      type: "Institution",
      status: "active",
      memberCount: 45000,
      location: "Cambridge, MA",
      establishedYear: 1636,
      email: "info@harvard.edu",
      phone: "+1 (617) 495-1000",
      website: "https://harvard.edu",
      address: "Massachusetts Hall, Cambridge, MA 02138",
      coordinates: { lat: 42.3770, lng: -71.1167 },
      nearbyLandmarks: "Harvard Square, Charles River",
      publicTransport: "Harvard Square Station (Red Line)",
      admin: {
        name: "Dr. Elizabeth Warren",
        title: "Dean of Academic Affairs",
        email: "e.warren@harvard.edu",
        phone: "+1 (617) 495-1001",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        joinedDate: "2018-01-15",
        bio: "Dr. Warren has been leading academic initiatives at Harvard for over 6 years, focusing on curriculum development and student success."
      },
      description: `Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636 as Harvard College and named for its first benefactor, the Puritan clergyman John Harvard.\n\nAs one of the world's most prestigious universities, Harvard offers undergraduate and graduate programs across multiple schools and faculties. The university is renowned for its rigorous academic programs, distinguished faculty, and influential alumni.\n\nHarvard's mission is to educate the citizens and citizen-leaders for our society through the pursuit of excellence in teaching, learning, and research at the highest international levels.`,
      mission: "To educate the citizens and citizen-leaders for our society. We do this through our commitment to the transformative power of a liberal arts and sciences education.",
      tags: ["Education", "Research", "Liberal Arts", "Graduate Studies", "Law", "Medicine", "Business", "Academia"]
    },
    '2': {
      id: '2',
      name: "Google Inc",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200",
      bannerImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200",
      category: "Technology",
      type: "Company",
      status: "active",
      memberCount: 156000,
      location: "Mountain View, CA",
      establishedYear: 1998,
      email: "press@google.com",
      phone: "+1 (650) 253-0000",
      website: "https://google.com",
      address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
      coordinates: { lat: 37.4220, lng: -122.0841 },
      nearbyLandmarks: "Googleplex, Shoreline Amphitheatre",
      publicTransport: "Mountain View Caltrain Station",
      admin: {
        name: "Dr. Gregory Mankiw",
        title: "Director of Engineering Relations",
        email: "g.mankiw@google.com",
        phone: "+1 (650) 253-0001",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        joinedDate: "2019-03-10",
        bio: "Dr. Mankiw leads engineering community initiatives and external partnerships at Google, fostering innovation and collaboration."
      },
      description: `Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.\n\nGoogle's mission is to organize the world's information and make it universally accessible and useful. The company has grown from a search engine to a global technology leader offering products like Android, YouTube, Google Cloud, and more.\n\nWith a focus on innovation and user experience, Google continues to shape how people access and interact with information worldwide.`,
      mission: "To organize the world's information and make it universally accessible and useful.",
      tags: ["Technology", "Search", "Advertising", "Cloud Computing", "Android", "AI", "Machine Learning", "Innovation"]
    },
    '3': {
      id: '3',
      name: "Red Cross International",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200",
      bannerImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
      category: "Nonprofit",
      type: "Organization",
      status: "active",
      memberCount: 12500,
      location: "Geneva, Switzerland",
      establishedYear: 1863,
      email: "info@icrc.org",
      phone: "+41 22 734 6001",
      website: "https://icrc.org",
      address: "19 Avenue de la Paix, 1202 Geneva, Switzerland",
      coordinates: { lat: 46.2276, lng: 6.1520 },
      nearbyLandmarks: "United Nations Office, Lake Geneva",
      publicTransport: "Geneva Central Station",
      admin: {
        name: "Maria Rodriguez",
        title: "Regional Coordinator",
        email: "m.rodriguez@icrc.org",
        phone: "+41 22 734 6002",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        joinedDate: "2020-06-22",
        bio: "Maria coordinates humanitarian efforts across multiple regions and leads emergency response initiatives for the Red Cross."
      },
      description: `The International Committee of the Red Cross (ICRC) is an impartial, neutral and independent organization whose exclusively humanitarian mission is to protect the lives and dignity of victims of armed conflict and other situations of violence.\n\nEstablished in 1863, the ICRC operates worldwide to provide humanitarian help for people affected by conflict and armed violence and to promote the laws that protect victims of war.\n\nThe organization works to ensure humane treatment of all persons in custody, reunite families separated by conflict, and provide emergency aid including medical care, clean water, and food.`,
      mission: "To protect the lives and dignity of victims of war and internal violence and to provide them with assistance.",
      tags: ["Humanitarian", "Emergency Aid", "Conflict Resolution", "Medical Care", "International Law", "Disaster Relief", "Human Rights"]
    },
    '4': {
      id: '4',
      name: "Local Community Center",
      logo: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200",
      bannerImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200",
      category: "Community",
      type: "Group",
      status: "active",
      memberCount: 850,
      location: "Springfield, IL",
      establishedYear: 2005,
      email: "info@springfieldcc.org",
      phone: "+1 (217) 555-0123",
      website: "https://springfieldcommunitycenter.org",
      address: "456 Community Drive, Springfield, IL 62701",
      coordinates: { lat: 39.7817, lng: -89.6501 },
      nearbyLandmarks: "Springfield Park, Downtown Springfield",
      publicTransport: "Springfield Bus Route 15",
      admin: {
        name: "Sarah Johnson",
        title: "Community Director",
        email: "s.johnson@springfieldcc.org",
        phone: "+1 (217) 555-0124",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        joinedDate: "2021-09-15",
        bio: "Sarah has been dedicated to strengthening community bonds and organizing local events that bring neighbors together."
      },
      description: `The Springfield Community Center serves as the heart of our local neighborhood, bringing people together through programs, events, and shared spaces that strengthen community bonds.\n\nSince 2005, we've been dedicated to creating an inclusive environment where residents of all ages can connect, learn, and grow together. Our facility offers meeting spaces, recreational activities, educational programs, and community events.\n\nWe believe in the power of community and work to ensure everyone feels welcome and has opportunities to participate in activities that enrich their lives and strengthen neighborhood connections.`,
      mission: "To strengthen community bonds by providing inclusive programs, services, and spaces that bring neighbors together.",
      tags: ["Community", "Local Events", "Recreation", "Education", "Neighborhood", "Family Programs", "Youth Activities"]
    },
    '5': {
      id: '5',
      name: "Tech Startup Hub",
      logo: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200",
      bannerImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
      category: "Business",
      type: "Organization",
      status: "active",
      memberCount: 2300,
      location: "Austin, TX",
      establishedYear: 2015,
      email: "hello@techstartuphub.com",
      phone: "+1 (512) 555-0456",
      website: "https://techstartuphub.com",
      address: "789 Innovation Boulevard, Austin, TX 78701",
      coordinates: { lat: 30.2672, lng: -97.7431 },
      nearbyLandmarks: "Austin Convention Center, Lady Bird Lake",
      publicTransport: "MetroRail Downtown Station",
      admin: {
        name: "Michael Chen",
        title: "Innovation Director",
        email: "m.chen@techstartuphub.com",
        phone: "+1 (512) 555-0457",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        joinedDate: "2017-11-08",
        bio: "Michael leads startup acceleration programs and mentorship initiatives, helping entrepreneurs turn their ideas into successful businesses."
      },
      description: `Tech Startup Hub is Austin's premier innovation ecosystem, designed to accelerate the growth of technology startups through mentorship, funding connections, and collaborative workspace.\n\nFounded in 2015, we've supported over 500 startups in their journey from idea to market. Our comprehensive program includes incubation, acceleration, co-working spaces, and access to a network of investors and industry experts.\n\nWe foster a culture of innovation, collaboration, and entrepreneurship, helping founders turn their visions into successful businesses that drive economic growth and technological advancement.`,
      mission: "To accelerate technology startups by providing resources, mentorship, and a collaborative ecosystem for innovation.",
      tags: ["Startups", "Innovation", "Entrepreneurship", "Funding", "Mentorship", "Technology", "Business Development", "Incubator"]
    },
    '6': {
      id: '6',
      name: "Healthcare Alliance",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200",
      bannerImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
      category: "Healthcare",
      type: "Association",
      status: "active",
      memberCount: 8900,
      location: "Chicago, IL",
      establishedYear: 1998,
      email: "contact@healthcarealliance.org",
      phone: "+1 (312) 555-0789",
      website: "https://healthcarealliance.org",
      address: "321 Medical Center Drive, Chicago, IL 60611",
      coordinates: { lat: 41.8781, lng: -87.6298 },
      nearbyLandmarks: "Northwestern Memorial Hospital, Magnificent Mile",
      publicTransport: "Chicago-Franklin Purple Line",
      admin: {
        name: "Dr. Amanda Foster",
        title: "Chief Medical Officer",
        email: "a.foster@healthcarealliance.org",
        phone: "+1 (312) 555-0790",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
        joinedDate: "2016-04-12",
        bio: "Dr. Foster leads healthcare policy initiatives and professional development programs for alliance members nationwide."
      },
      description: `Healthcare Alliance is a professional association dedicated to advancing the healthcare industry through education, advocacy, and collaboration among healthcare professionals.\n\nEstablished in 1998, we serve as a unified voice for healthcare workers, promoting best practices, continuing education, and policy advocacy that improves patient care and working conditions.\n\nOur members include doctors, nurses, administrators, technicians, and other healthcare professionals who share our commitment to excellence in healthcare delivery and professional development.`,
      mission: "To advance healthcare excellence through professional development, advocacy, and collaborative initiatives.",
      tags: ["Healthcare", "Medical Professionals", "Continuing Education", "Patient Care", "Healthcare Policy", "Professional Development", "Medical Research"]
    },
    '7': {
      id: '7',
      name: "Environmental Action Group",
      logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
      bannerImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      category: "Nonprofit",
      type: "Group",
      status: "active",
      memberCount: 1200,
      location: "Portland, OR",
      establishedYear: 2010,
      email: "info@enviroactionpdx.org",
      phone: "+1 (503) 555-0321",
      website: "https://environmentalactiongroup.org",
      address: "654 Green Street, Portland, OR 97205",
      coordinates: { lat: 45.5152, lng: -122.6784 },
      nearbyLandmarks: "Forest Park, Pearl District",
      publicTransport: "MAX Light Rail Blue Line",
      admin: {
        name: "Emily Rodriguez",
        title: "Environmental Coordinator",
        email: "e.rodriguez@enviroactionpdx.org",
        phone: "+1 (503) 555-0322",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        joinedDate: "2022-01-20",
        bio: "Emily coordinates environmental initiatives and educational programs, leading the fight for sustainable practices in the Portland community."
      },
      description: `Environmental Action Group is a grassroots organization committed to protecting our environment through community action, education, and advocacy for sustainable practices.\n\nSince 2010, we've organized cleanup events, educational workshops, and advocacy campaigns that address local and global environmental challenges. Our volunteers work on projects ranging from habitat restoration to climate change awareness.\n\nWe believe that environmental protection requires collective action and work to empower individuals and communities to make positive environmental changes in their daily lives.`,
      mission: "To protect and restore our environment through grassroots action, education, and sustainable community initiatives.",
      tags: ["Environment", "Sustainability", "Climate Change", "Conservation", "Community Action", "Education", "Green Living", "Advocacy"]
    },
    '8': {
      id: '8',
      name: "City Sports Club",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200",
      bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
      category: "Sports",
      type: "Club",
      status: "active",
      memberCount: 450,
      location: "Denver, CO",
      establishedYear: 2012,
      email: "info@citysportsdenver.com",
      phone: "+1 (303) 555-0654",
      website: "https://citysportsclub.com",
      address: "987 Athletic Way, Denver, CO 80202",
      coordinates: { lat: 39.7392, lng: -104.9903 },
      nearbyLandmarks: "Coors Field, Downtown Denver",
      publicTransport: "Denver Union Station",
      admin: {
        name: "David Kim",
        title: "Athletic Director",
        email: "d.kim@citysportsdenver.com",
        phone: "+1 (303) 555-0655",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        joinedDate: "2019-07-03",
        bio: "David oversees all sports programs and leagues, ensuring a welcoming and competitive environment for athletes of all skill levels."
      },
      description: `City Sports Club is Denver's premier recreational sports organization, offering leagues, tournaments, and social events for athletes of all skill levels and ages.\n\nFounded in 2012, we've created a welcoming community where sports enthusiasts can stay active, meet new people, and enjoy friendly competition across multiple sports including basketball, volleyball, soccer, and softball.\n\nOur club emphasizes fun, fitness, and friendship, providing opportunities for both casual recreation and competitive play in a supportive and inclusive environment.`,
      mission: "To promote health, fitness, and community through recreational sports and active lifestyle programs.",
      tags: ["Sports", "Recreation", "Fitness", "Community", "Leagues", "Tournaments", "Social Events", "Active Lifestyle"]
    }
  };

  // Get unique gallery for each entity
  const getEntityGallery = (entityId) => {
    const galleries = {
      '1': [
        { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", caption: "Harvard Yard", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1567168539593-59673ababaae?w=800", caption: "Widener Library", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800", caption: "Graduation Ceremony", date: "2024-05-30" },
        { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", caption: "Student Life", date: "2024-01-10" }
      ],
      '2': [
        { url: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800", caption: "Google Campus", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800", caption: "Innovation Lab", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800", caption: "Team Collaboration", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800", caption: "Tech Talks", date: "2024-01-05" }
      ],
      '3': [
        { url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", caption: "Emergency Response", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", caption: "Medical Aid", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800", caption: "Volunteer Training", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1594736797933-d0bd2dd93e4e?w=800", caption: "Community Outreach", date: "2024-01-05" }
      ],
      '4': [
        { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800", caption: "Community Events", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800", caption: "Family Activities", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800", caption: "Youth Programs", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=800", caption: "Senior Center", date: "2024-01-05" }
      ],
      '5': [
        { url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800", caption: "Startup Pitch Day", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800", caption: "Coworking Space", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", caption: "Mentorship Sessions", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Demo Day", date: "2024-01-05" }
      ],
      '6': [
        { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800", caption: "Medical Conference", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800", caption: "Healthcare Training", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", caption: "Patient Care Workshop", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1559757184-c843a2fcd87c?w=800", caption: "Medical Research", date: "2024-01-05" }
      ],
      '7': [
        { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", caption: "Beach Cleanup", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800", caption: "Tree Planting", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", caption: "Earth Day Event", date: "2024-04-22" },
        { url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800", caption: "Environmental Education", date: "2024-01-05" }
      ],
      '8': [
        { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", caption: "Basketball League", date: "2024-03-15" },
        { url: "https://images.unsplash.com/photo-1593786481097-21d26eb768c4?w=800", caption: "Soccer Tournament", date: "2024-02-20" },
        { url: "https://images.unsplash.com/photo-1568427344984-c9c2cdde8d8a?w=800", caption: "Volleyball Championship", date: "2024-01-10" },
        { url: "https://images.unsplash.com/photo-1616803140803-5b1bd4197bcf?w=800", caption: "Fitness Classes", date: "2024-01-05" }
      ]
    };
    return galleries[entityId] || galleries['1'];
  };

  // Get unique content for each entity
  const getEntityContent = (entityId) => {
    const contentByType = {
      '1': { // Harvard University
        lectures: [
          {
            id: 1,
            title: "Constitutional Law Fundamentals",
            description: "Explore the foundations of constitutional law and its applications in modern legal practice.",
            instructor: "Prof. Elizabeth Warren",
            date: "2024-08-20",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Advanced Economics Theory",
            description: "Deep dive into macroeconomic theory and policy analysis.",
            instructor: "Dr. Gregory Mankiw",
            date: "2024-08-18",
            time: "16:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Computer Science Foundations",
            description: "Introduction to programming, algorithms, and data structures.",
            instructor: "Harvard CS Department",
            date: "2024-09-01",
            duration: "16 weeks",
            thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
            requiresMembership: true,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Harvard-Yale Debate",
            description: "Annual debate competition between Harvard and Yale students.",
            date: "2024-10-15",
            time: "19:00",
            duration: "3 hours",
            thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '2': { // Google Inc
        lectures: [
          {
            id: 1,
            title: "Introduction to Machine Learning",
            description: "A comprehensive overview of ML fundamentals and Google's AI initiatives.",
            instructor: "Dr. Jeff Dean",
            date: "2024-08-20",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Cloud Architecture at Scale",
            description: "Learn how Google Cloud handles massive scale infrastructure.",
            instructor: "Diane Greene",
            date: "2024-08-18",
            time: "16:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Google Developer Certification",
            description: "Complete certification program for Google Cloud Platform development.",
            instructor: "Google Cloud Team",
            date: "2024-09-01",
            duration: "12 weeks",
            thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
            requiresMembership: true,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Google I/O Extended",
            description: "Local viewing party and discussion of Google I/O announcements.",
            date: "2024-05-15",
            time: "10:00",
            duration: "8 hours",
            thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '3': { // Red Cross International
        lectures: [
          {
            id: 1,
            title: "Humanitarian Law Principles",
            description: "Understanding international humanitarian law and its application in crisis situations.",
            instructor: "Dr. Peter Maurer",
            date: "2024-08-20",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Emergency Response Coordination",
            description: "Best practices for coordinating emergency response in disaster situations.",
            instructor: "Francesco Rocca",
            date: "2024-08-18",
            time: "16:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "First Aid Certification",
            description: "Complete first aid and CPR certification program.",
            instructor: "Red Cross Training Team",
            date: "2024-09-01",
            duration: "2 days",
            thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
            requiresMembership: false,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "World Red Cross Day",
            description: "Annual celebration and awareness event for humanitarian work.",
            date: "2024-05-08",
            time: "09:00",
            duration: "6 hours",
            thumbnail: "https://images.unsplash.com/photo-1594736797933-d0bd2dd93e4e?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '4': { // Local Community Center
        lectures: [
          {
            id: 1,
            title: "Community Building Strategies",
            description: "Learn effective approaches to strengthen neighborhood connections.",
            instructor: "Sarah Johnson",
            date: "2024-08-20",
            time: "19:00",
            duration: "1 hour",
            thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400",
            requiresMembership: false,
            isNew: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Senior Computer Classes",
            description: "Basic computer and internet skills for senior citizens.",
            instructor: "Tech Volunteers",
            date: "2024-09-01",
            duration: "6 weeks",
            thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400",
            requiresMembership: false,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Community Potluck Dinner",
            description: "Monthly neighborhood gathering with shared meals and activities.",
            date: "2024-08-25",
            time: "18:00",
            duration: "3 hours",
            thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '5': { // Tech Startup Hub
        lectures: [
          {
            id: 1,
            title: "Startup Fundraising Strategies",
            description: "Master the art of raising capital for your startup from angels to VCs.",
            instructor: "Mark Cuban",
            date: "2024-08-20",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Product-Market Fit",
            description: "How to validate your product and find the right market fit.",
            instructor: "Reid Hoffman",
            date: "2024-08-18",
            time: "16:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Startup Accelerator Program",
            description: "12-week intensive program to accelerate your startup growth.",
            instructor: "Hub Mentors",
            date: "2024-09-01",
            duration: "12 weeks",
            thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400",
            requiresMembership: true,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Pitch Night",
            description: "Monthly startup pitch competition with investor panel.",
            date: "2024-08-30",
            time: "18:00",
            duration: "3 hours",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '6': { // Healthcare Alliance
        lectures: [
          {
            id: 1,
            title: "Patient Care Excellence",
            description: "Best practices for delivering exceptional patient care and outcomes.",
            instructor: "Dr. Atul Gawande",
            date: "2024-08-20",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Healthcare Technology Integration",
            description: "Implementing new technologies to improve healthcare delivery.",
            instructor: "Dr. Eric Topol",
            date: "2024-08-18",
            time: "16:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1559757184-c843a2fcd87c?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Continuing Medical Education",
            description: "Required CME credits for healthcare professionals.",
            instructor: "Healthcare Alliance Faculty",
            date: "2024-09-01",
            duration: "Ongoing",
            thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
            requiresMembership: true,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Annual Medical Conference",
            description: "Leading healthcare conference with latest research and innovations.",
            date: "2024-10-15",
            time: "08:00",
            duration: "3 days",
            thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
            requiresMembership: true,
            isNew: true
          }
        ]
      },
      '7': { // Environmental Action Group
        lectures: [
          {
            id: 1,
            title: "Climate Change Solutions",
            description: "Practical approaches to addressing climate change at local and global levels.",
            instructor: "Dr. Michael Mann",
            date: "2024-08-20",
            time: "19:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Sustainable Living Workshop",
            description: "Learn how to reduce your environmental footprint in daily life.",
            instructor: "Jane Goodall",
            date: "2024-08-18",
            time: "14:00",
            duration: "2 hours",
            thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
            requiresMembership: false
          }
        ],
        courses: [
          {
            id: 1,
            title: "Environmental Education Program",
            description: "Comprehensive course on environmental science and conservation.",
            instructor: "Environmental Educators",
            date: "2024-09-01",
            duration: "8 weeks",
            thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
            requiresMembership: false,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Community Cleanup Day",
            description: "Monthly environmental cleanup event in local parks and waterways.",
            date: "2024-08-25",
            time: "09:00",
            duration: "4 hours",
            thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
            requiresMembership: false,
            isNew: true
          }
        ]
      },
      '8': { // City Sports Club
        lectures: [
          {
            id: 1,
            title: "Sports Psychology for Athletes",
            description: "Mental training techniques to improve athletic performance.",
            instructor: "Dr. Jim Taylor",
            date: "2024-08-20",
            time: "18:00",
            duration: "1.5 hours",
            thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
            requiresMembership: false,
            isNew: true
          },
          {
            id: 2,
            title: "Injury Prevention in Sports",
            description: "Learn how to prevent common sports injuries and maintain peak performance.",
            instructor: "Dr. James Andrews",
            date: "2024-08-18",
            time: "19:00",
            duration: "1 hour",
            thumbnail: "https://images.unsplash.com/photo-1593786481097-21d26eb768c4?w=400",
            requiresMembership: true
          }
        ],
        courses: [
          {
            id: 1,
            title: "Youth Coaching Certification",
            description: "Become a certified youth sports coach with our comprehensive program.",
            instructor: "Certified Coaches",
            date: "2024-09-01",
            duration: "4 weeks",
            thumbnail: "https://images.unsplash.com/photo-1568427344984-c9c2cdde8d8a?w=400",
            requiresMembership: true,
            isNew: true
          }
        ],
        events: [
          {
            id: 1,
            title: "Summer Sports Festival",
            description: "Annual multi-sport tournament and celebration for all ages.",
            date: "2024-08-30",
            time: "10:00",
            duration: "8 hours",
            thumbnail: "https://images.unsplash.com/photo-1616803140803-5b1bd4197bcf?w=800",
            requiresMembership: false,
            isNew: true
          }
        ]
      }
    };
    return contentByType[entityId] || contentByType['1'];
  };
  
  const mockEntity = {
    ...(entityDatabase[entityId] || entityDatabase['1']),
    gallery: getEntityGallery(entityId),
    content: getEntityContent(entityId)
  };

  // Check if user is a member based on their role and permissions
  const checkMembership = () => {
    if (!user) return false;
    
    // Super admin cannot be a member of any entity
    if (user.role === 'super-admin') {
      return false;
    }
    
    // Entity admin is always a "member" of their own entities
    if (user.role === 'entity-admin' && user.ownedEntities?.includes(entityId)) {
      return true;
    }
    
    // Check user's memberships for normal users and entity admins
    // Ensure both entityId and membership array elements are strings for comparison
    const entityIdStr = entityId.toString();
    const userMemberships = user.memberships || [];
    const isMemberResult = userMemberships.includes(entityIdStr);
    
    return isMemberResult;
  };

  const [isMember, setIsMember] = useState(false);
  
  // Update membership status when user data changes
  useEffect(() => {
    setIsMember(checkMembership());
  }, [user, entityId]);

  const handleRequestJoin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Join request submitted successfully! You will be notified once approved.');
    }, 2000);
  };

  const handleAccessContent = () => {
    // Navigate to member content or show member dashboard
    alert('Redirecting to member content...');
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Breadcrumb navigation
  const breadcrumbs = [
    { label: 'Home', path: '/entity-list-hub' },
    { label: mockEntity?.category, path: `/entity-list-hub?category=${mockEntity?.category}` },
    { label: mockEntity?.name, path: '', active: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <RoleAdaptiveHeader
        user={user}
        onSearch={handleSearch}
        onNavigate={handleNavigation}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-6">
        {/* Breadcrumbs */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs?.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  )}
                  {crumb?.active ? (
                    <span className="text-foreground font-medium">{crumb?.label}</span>
                  ) : (
                    <button
                      onClick={() => navigate(crumb?.path)}
                      className="text-muted-foreground hover:text-primary transition-micro"
                    >
                      {crumb?.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Entity Banner */}
        <EntityBanner
          entity={mockEntity}
          onRequestJoin={handleRequestJoin}
          isMember={isMember}
          isLoading={isLoading}
        />

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <EntityAbout entity={mockEntity} />
              <ContentSection entity={mockEntity} isMember={isMember} user={user} />
              <ImageGallery images={mockEntity?.gallery} entityName={mockEntity?.name} />
              <LocationMap entity={mockEntity} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <MembershipSidebar
                  entity={mockEntity}
                  isMember={isMember}
                  onRequestJoin={handleRequestJoin}
                  onAccessContent={handleAccessContent}
                  isLoading={isLoading}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Join Button */}
      <MobileJoinButton
        isMember={isMember}
        onRequestJoin={handleRequestJoin}
        onAccessContent={handleAccessContent}
        isLoading={isLoading}
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation
        user={user}
        onNavigate={handleNavigation}
      />
    </div>
  );
};

export default EntityDetailPage;