const navlinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "idea",
    title: "Submit Idea",
  },
  {
    id: "internship",
    title: "Internship",
  },
  {
    id: "blog",
    title: "Blog",
    menu: [
      {
        id: "all_blogs",
        title: "All Blogs",
      },
      {
        id: "my_blogs",
        title: "My Blogs",
      },
      {
        id: "saved_blogs",
        title: "Saved Blogs",
      },
    ],
  },
  {
    id: "study-material",
    title: "Study Material",
  },
  {
    id: "events",
    title: "Event",
  },
];

const admin_navlinks = [
  {
    id: "idea-feedback",
    title: "Feedbacks",
  },
  {
    id: "idea-review",
    title: "Ideas Review",
  },
  {
    id: "add-internship",
    title: "Add Internship",
  },
  {
    id: "add-event",
    title: "Add Event",
  },
  {
    id: "add-study-material",
    title: "Add Study Material",
  },
  {
    id: "messages",
    title: "Messages",
  },
];

const footerLinks = [
  {
    id: "company",
    title: "Company",
    list: [
      {
        id: "features",
        title: "Features",
      },
      {
        id: "pricing",
        title: "Pricing",
      },
      {
        id: "affiliate-programme",
        title: "Affiliate Programme",
      },
      {
        id: "press-kit",
        title: "Press Kit",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    list: [
      {
        id: "account",
        title: "Account",
      },
      {
        id: "help",
        title: "Help",
      },
      {
        id: "contact",
        title: "Contact Us",
      },
      {
        id: "customer-support",
        title: "Customer Support",
      },
    ],
  },
  {
    id: "legals",
    title: "Legals",
    list: [
      {
        id: "terms",
        title: "Terms & Conditions",
      },
      {
        id: "privacypolicy",
        title: "Privacy Policy",
      },
      {
        id: "licence",
        title: "Licencing",
      },
    ],
  },
];

const sliderinfo = [
  {
    imgLink: "src/assets/images/image_hero.jpg",
    element: {
      heading: "Empower your startup voyage.",
      highlight: "startup",
      highlight_color: "text-highlight",
      subHeading: "write, share, elevate",
      footerText: "Join us in crafting tomorrow",
      inputBtn: true,
    },
  },
  {
    bg: true,
    imgLink: "src/assets/images/image_hero2.jpg",
    element: {
      heading: "Let's solve some real world problems",
      highlight: "solve",
      highlight_color: "text-newHighlight",
      para: "Welcome to our innovation hub, where ideas thrive and connections flourish. Share your stories, spark conversations, and watch your ideas come to life. Get feedback from our expert admins and unlock exciting internship opportunities. Join us and unleash your creativity today",
      footerText: "from ideas to internships - your journey starts here",
    },
  },
  {
    center: true,
    imgLink: "src/assets/images/image_hero3.png",
    element: {
      heading: "B-Plan",
      highlight: "Plan",
      highlight_color: "text-btnColor",
      para: "Here's your golden opportunity to exhibit your entrepreneurial flair and pitch your revolutionary business concept to a panel of esteemed judges",
      btn: true,
      center: true,
    },
  },
];

const helps = [
  {
    id: 1,
    title: "submit your idea",
    description:
      "Submit your innovative startup idea and get a chance to bring it to life with expert guidance and resources. Let's turn your vision into reality!",
    image: "src/assets/images/help_image1.jpg",
    svg: "src/assets/vectors/artboard2.png",
  },
  {
    id: 2,
    title: "does your idea have potential ?",
    description:
      "Wondering if your idea has potential? Share it with us for expert evaluation and feedback, and discover how far your concept can go",
    image: "src/assets/images/help_image2.jpg",
    svg: "src/assets/vectors/artboard1.svg",
  },
  {
    id: 3,
    title: "feedback for your help",
    description:
      "Your feedback matters! Share your thoughts with us so we can improve and offer even better support for your entrepreneurial journey.",
    image: "src/assets/images/help_image3.jpg",
    svg: "src/assets/vectors/artboard2.png",
  },
  {
    id: 4,
    title: "provide help to find invester",
    description:
      "We connect you with potential investors to help fund and grow your startup. Let us support you in turning your idea into a successful venture.",
    image: "src/assets/images/help_image4.jpg",
    svg: "src/assets/vectors/artboard1.svg",
  },
  {
    id: 5,
    title: "help to find inter and internship",
    description:
      "We assist in finding internships and industry connections to help you gain experience and build a strong network for your startup journey.",
    image: "src/assets/images/help_image5.jpg",
  },
];

const blogs = [
  {
    id: 1,
    title:
      "How are AgriTech Startups Revolutionising Farming Practices in India",
    date: "29 Feb, 2024 Thursday",
    author: "Dr. Anu Kadyan",
    imgLink: "src/assets/images/blog1.png",
  },
  {
    id: 2,
    title:
      "How are AgriTech Startups Revolutionising Farming Practices in India",
    date: "29 Feb, 2024 Thursday",
    author: "Dr. Anu Kadyan",
    imgLink: "src/assets/images/blog2.png",
  },
  {
    id: 3,
    title:
      "How are AgriTech Startups Revolutionising Farming Practices in India",
    date: "29 Feb, 2024 Thursday",
    author: "Dr. Anu Kadyan",
    imgLink: "src/assets/images/blog3.png",
  },
];

const homeAbout_features = [
  {
    iconLink: "src/assets/icons/rocket_icon.svg",
    title: "Project management",
    description:
      "Efficiently manage your projects with our expert guidance. From planning to execution, we help you stay on track, meet deadlines, and achieve your startup goals.",
  },
  {
    iconLink: "src/assets/icons/planning_icon.svg",
    title: "Planning",
    description:
      "Planning is key to startup success. We guide you through strategic development, market analysis, and actionable steps to ensure your idea is well-prepared for execution and growth.",
  },
  {
    iconLink: "src/assets/icons/idea_icon.svg",
    title: "Implementation",
    description:
      "Implement your startup vision with our comprehensive support. From idea validation to mentorship and funding, we provide the tools and connections needed for successful execution.",
  },
];

const events = [
  {
    name: "hack ur way",
    imgLink: "src/assets/images/event1.png",
  },
  {
    name: "b-plan",
    imgLink: "src/assets/images/event1.png",
  },
];

const profile_options = [
  { value: "webdevelopment", label: "Web Development" },
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend Development" },
  { value: "angulardevelopment", label: "Angular Development" },
  { value: ".netdevelopment", label: ".NET Development" },
  { value: "contentwriting", label: "Content Writing" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "fullstack", label: "Fullstack Development" },
  { value: "appdevelopment", label: "App Development" },
];

const location_options = [
  { value: "kolkata", label: "Kolkata" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gujrat", label: "Gujrat" },
];

const duration_options = [
  { value: "1", label: "1 month" },
  { value: "2", label: "2 months" },
  { value: "3", label: "3 months" },
  { value: "4", label: "4 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "24", label: "24 month" },
  { value: "36", label: "36 month" },
];

const blog_tags_options = [
  { value: "startup", label: "Startup" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gujrat", label: "Gujrat" },
];

export {
  navlinks,
  admin_navlinks,
  footerLinks,
  sliderinfo,
  helps,
  blogs,
  homeAbout_features,
  events,
  profile_options,
  location_options,
  duration_options,
  blog_tags_options,
};
