import { useEffect, useState } from "react";
import Api from "../services/Api";
import ImageSlider from "../components/ImageSlider";
import CourseSlider from "../components/CourseSlider";
import WhySmartAi from "../components/whySmartAi";

function Home() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    Api.get("/me")
      .then(res => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
      <div>
            <ImageSlider/>
            <WhySmartAi />
            <CourseSlider />
      </div>
  )             
}
export default Home;  










