import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Idea,
  Blog,
  Internship,
  Event,
  Login,
  AdminLogin,
  AdminProfile,
  AddEvent,
  AddInternship,
  ResetAdminPassword,
  Signup,
  Error,
  StudyMaterialPage,
  SeparateTopic,
  ContactForm,
  FeedbackPage,
  IdeaReview,
  AddSM,
  IdeaFeedback,
  Messages,
} from "./pages/index.js";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SeparateUnit from "./pages/SeparateUnit.jsx";
import MainContent from "./components/study_material/separate_material/separate_unit/MainContent.jsx";
import {
  Topics,
  BlogEditor,
  IndividualBlog,
  AllBlogs,
  AllEvents,
  UpcomingEvent,
  PastEvent,
} from "./components/index.js";
import RecommendedTopics from "./components/study_material/Topics.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import MyBlogs from "./components/blogs/MyBlogs.jsx";
import SavedBlogs from "./components/blogs/SavedBlogs.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import EditUserProfile from "./pages/EditUserProfile.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="idea" element={<Idea />} />
          <Route path="internship" element={<Internship />} />
          <Route path="blog" element={<Blog />}>
            <Route index element={<AllBlogs />} />
            <Route path="my-blogs" element={<MyBlogs />} />
            <Route path="saved-blogs" element={<SavedBlogs />} />
          </Route>
          <Route path="blog/editor" element={<BlogEditor />} />
          <Route path="blog/:blogs" element={<IndividualBlog />} />
          <Route path="study-material" element={<StudyMaterialPage />}>
            <Route index element={<RecommendedTopics />} />
            <Route path=":topic" element={<Topics />} />
          </Route>
          <Route
            path="study-material/:topic/:separateTopic"
            element={<SeparateTopic />}
          />
          <Route
            path="study-material/:topic/:separateTopic/:separateUnit"
            element={<SeparateUnit />}
          >
            <Route index element={<MainContent />} />
            <Route path=":eachUnit" element={<MainContent />} />
          </Route>
          <Route exact path="/events" element={<Event />}>
            <Route index element={<AllEvents />} />
            <Route
              path="upcoming-event/:upcomingEvent"
              element={<UpcomingEvent />}
            />
            <Route path="past-event/:pastEvent" element={<PastEvent />} />
          </Route>
          <Route exact path="/contact" element={<ContactForm />} />
          <Route exact path="/feedback" element={<FeedbackPage />} />
        </Route>
        <Route exact path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProfile />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="idea-review" element={<IdeaReview />} />
          <Route path="add-internship" element={<AddInternship />} />
          <Route path="add-study-material" element={<AddSM />} />
          <Route path="idea-feedback" element={<IdeaFeedback />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route exact path="/user-signup" element={<Signup />} />
        <Route exact path="/user-login" element={<Login />} />
        <Route exact path="/user/profile" element={<UserProfile />} />
        <Route exact path="/user/edit-profile" element={<EditUserProfile />} />
        <Route exact path="/admin-login" element={<AdminLogin />} />
        <Route
          exact
          path="/reset-admin-password"
          element={<ResetAdminPassword />}
        />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
